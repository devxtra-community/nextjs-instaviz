"use client";

import React, { useRef, ChangeEvent } from "react";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axiosInstance";
import { useAnalysis } from "@/context/AnalysisContext";
import { createSession } from "@/lib/sessionApi";

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

    /** MAIN UPLOAD LOGIC */
    const uploadFileAndCreateSession = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);

            /** STEP 1 → UPLOAD FILE */
            const uploadRes = await axiosInstance.post(uploadUrl, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const uploaded = uploadRes.data;

            const dataId = uploaded.datasetId;
            const metrics = uploaded.data.metrics;
            const charts = uploaded.data.charts;
            const summary = uploaded.data.summary;


            /** STEP 2 → CREATE SESSION */
            const sessionRes = await createSession({
                title: file.name.replace(".csv", ""),
                data_id: dataId,
                charts,
                messages: [],
                metrics,
            });

            const { session, session_token } = sessionRes;

            /** STEP 3 → SAVE SESSION IDs/TOKENS */
            localStorage.setItem("currentSessionId", session._id);
            localStorage.setItem("sessionId", session._id);
            setActiveSessionId(session._id);

            if (session_token) {
                localStorage.setItem("session_token", session_token);
            }

            /** STEP 4 → UPDATE UI / GLOBAL STATE */
            setAnalysisData({
                data: { charts, metrics, summary },
            });

            onFileSelected?.(file, uploaded);
            onUploadSuccess?.(session._id);
        } catch (err) {
            console.error("UPLOAD FAILED:", err);
            onFileSelected?.(file, err);
        } finally {
            setLoading(false);
        }
    };

    /** When a file is chosen */
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!isCsvFile(file)) {
            alert("Only CSV files allowed");
            return;
        }

        await uploadFileAndCreateSession(file);

        e.target.value = "";
    };

    return (
        <div className="w-full">
            <motion.button
                onClick={handleButtonClick}
                className="px-7 py-3 primarybg text-white rounded-xl font-semibold hover:brightness-105"
            >
                Upload File
            </motion.button>

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
