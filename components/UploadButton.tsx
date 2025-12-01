"use client";

import React, { useRef, ChangeEvent } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useAnalysis } from "@/context/AnalysisContext";

interface UploadButtonProps {
  onFileSelected?: (file: File, responseOrError?: any) => void;
  onUploadSuccess?: (sessionId: string) => void;
  accept?: string;
  uploadUrl?: string;
}

const UploadButton: React.FC<UploadButtonProps> = ({
  onFileSelected,
  onUploadSuccess,
  accept = ".csv,text/csv",
  uploadUrl = "/upload/fileupload",
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { setAnalysisData, setLoading, setActiveSessionId } = useAnalysis();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const isCsvFile = (file: File) => file.name.toLowerCase().endsWith(".csv");

  const uploadFileAndCreateSession = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const uploadRes = await axiosInstance.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploaded = uploadRes.data;

      const dataId = uploaded.datasetId;
      const sessionId = uploaded.sessionId;
      const metrics = uploaded.data.metrics;
      const charts = uploaded.data.charts;
      const summary = uploaded.data.summary;
      const messages = uploaded.data.messages;

      localStorage.setItem("currentSessionId", sessionId);
      setActiveSessionId(sessionId);

      if (uploaded.session_token) {
        localStorage.setItem("session_token", uploaded.session_token);
      }

      setAnalysisData({
        data: { charts, metrics, summary, messages },
      });

      onFileSelected?.(file, uploaded);
      onUploadSuccess?.(sessionId);
    } catch (err) {
      console.error("UPLOAD FAILED:", err);
      onFileSelected?.(file, err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isCsvFile(file)) {
      alert("Only CSV files allowed");
      return;
    }

        await uploadFileAndCreateSession(file);
        window.dispatchEvent(new Event("token-updated"));

    e.target.value = "";
  };

  return (
    <div className="w-full">
      <button
        onClick={handleButtonClick}
        className="px-7 py-2 bg-primary text-white rounded-lg font-semibold hover:brightness-105 hover:cursor-pointer"
      >
        Upload File
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default UploadButton;
