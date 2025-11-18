"use client";

import React, { useRef, ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axiosInstance";
import { useAnalysis } from "@/context/AnalysisContext";

interface UploadButtonProps {
    onFileSelected?: (file: File, responseOrError?: any) => void;
    onUploadSuccess?: () => void;       // NEW
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

    const { setAnalysisData } = useAnalysis();

    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const isCsvFile = (file: File) => {
        const name = file.name.toLowerCase();
        if (!name.endsWith(".csv")) return false;
        const type = file.type;
        return type === "text/csv" || type === "application/vnd.ms-excel";
    };

    const uploadSingleFile = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            setUploading(true);
            setProgress(10);

            const response = await axiosInstance.post(uploadUrl, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (e) => {
                    const percent = Math.round((e.loaded / e.total!) * 100);
                    setProgress(percent);
                },
            });

            // store analysis globally
            setAnalysisData(response.data);

            // optional callback
            onFileSelected?.(file, response);
            onUploadSuccess?.(); // 🚀 TRIGGER UI CHANGE

            setUploading(false);
            setProgress(100);

            console.log("Upload Response:", response);
        } catch (err) {
            console.log("Upload Failed:", err);
            onFileSelected?.(file, err);
            setUploading(false);
        }
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files?.length) return;

        const file = files[0];

        if (!isCsvFile(file)) {
            alert("Only CSV files allowed");
            e.target.value = "";
            return;
        }

        try {
            await uploadSingleFile(file);
        } finally {
            e.target.value = "";
        }
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

            {uploading && (
                <div className="w-full mt-4 bg-gray-200 rounded-full h-2">
                    <div
                        className="primarybg h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}
        </div>
    );
};

export default UploadButton;
