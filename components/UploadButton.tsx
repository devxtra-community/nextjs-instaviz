// components/UploadButton.tsx

import React, { useRef, ChangeEvent } from "react";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axiosInstance";

interface UploadButtonProps {
    onFileSelected?: (file: File, responseOrError?: any) => void;
    accept?: string;
    uploadUrl?: string;
}

const UploadButton: React.FC<UploadButtonProps> = ({
    onFileSelected,
    accept = ".csv,text/csv",
    uploadUrl = "/upload/fileupload",
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    // Helper to validate CSV
    const isCsvFile = (file: File) => {
        const name = file.name.toLowerCase();
        if (!name.endsWith(".csv")) {
            return false;
        }
        const type = file.type;
        if (type && !(type === "text/csv" || type === "application/vnd.ms-excel")) {
            return false;
        }
        return true;
    };

    const uploadSingleFile = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await axiosInstance.post(uploadUrl, formData);
            onFileSelected?.(file, response);
            console.log(response);
        } catch (err: any) {
            console.error("Upload failed:", err?.message ?? err);
            if (err.response) {
                console.error("Status:", err.response.status);
                console.error("Response data:", err.response.data);
            } else if (err.request) {
                console.error("No response received, request:", err.request);
            } else {
                console.error("Axios error/config:", err);
            }
            onFileSelected?.(file, err);
            throw err;
        }
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];

        // validation for csv
        if (!isCsvFile(file)) {
            alert("Only CSV files are allowed.");
            e.target.value = "";
            return;
        }

        try {
            await uploadSingleFile(file);
        } catch (_) {
        } finally {
            e.target.value = "";
        }
    };

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.01, backgroundColor: "#a78bfa" }}
                onClick={handleButtonClick}
                className="px-7 py-3 bg-violet-700 text-white rounded-xl font-semibold shadow hover:bg-violet-600 transition"
            >
                Upload File
            </motion.button>

            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept={accept}
                onChange={handleFileChange}
            />
        </>
    );
};

export default UploadButton;
