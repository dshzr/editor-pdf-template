import React, { useState, useCallback } from 'react';

interface FileUploadProps {
    onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onFileSelect(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    }, [onFileSelect]);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileSelect(e.target.files[0]);
        }
    };

    return (
        <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Envie o Template da F.A BICICLETARIA</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Envie o template PDF da bicicletaria com os campos: <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">{'{{nome}}'}</code>, <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">{'{{produto}}'}</code>, <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">{'{{quantia}}'}</code>, etc.</p>
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`relative border-4 border-dashed rounded-lg p-12 transition-colors duration-300 ${isDragging ? 'border-indigo-500 bg-indigo-50 dark:bg-gray-700' : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'}`}
            >
                <input
                    type="file"
                    id="file-upload"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    accept="application/pdf"
                />
                <div className="flex flex-col items-center justify-center space-y-4 text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="font-semibold">Arraste e solte seu PDF aqui</p>
                    <p>ou</p>
                    <label htmlFor="file-upload" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        clique para procurar
                    </label>
                </div>
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Seu arquivo será processado localmente em seu navegador.</p>
        </div>
    );
};

export default FileUpload;