"use client";

import React, { useRef, ChangeEvent } from "react";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axiosInstance";
import { useAnalysis } from "@/context/AnalysisContext";

interface UploadButtonProps {
    onFileSelected?: (file: File, responseOrError?: any) => void;
    onUploadSuccess?: () => void;
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

    const { setAnalysisData, setLoading } = useAnalysis(); // GLOBAL LOADING

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const isCsvFile = (file: File) => {
        const name = file.name.toLowerCase();
        return name.endsWith(".csv");
    };

    const uploadSingleFile = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true); // ⬅ SHOW FULL-SCREEN LOADER

            const response = await axiosInstance.post(uploadUrl, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            // Save the full API+AI response globally
            setAnalysisData(response.data);

            onFileSelected?.(file, response);
            onUploadSuccess?.();
        } catch (err) {
            console.error("Upload failed", err);
            onFileSelected?.(file, err);
        } finally {
            setLoading(false); // ⬅ HIDE LOADER
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
            e.target.value = ""; // reset input
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

            {/* Hidden Input */}
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
