import React from 'react';

interface DownloadCardProps {
    fileUrl: string;
    originalFileName: string;
    onCreateNew: () => void;
    onResetTemplate: () => void;
}

const DownloadCard: React.FC<DownloadCardProps> = ({ fileUrl, originalFileName, onCreateNew, onResetTemplate }) => {
    const downloadFileName = `editado-${originalFileName}`;
    return (
        <div className="text-center p-8 bg-green-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-green-300 dark:border-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">Seu PDF está Pronto!</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Seu documento foi gerado com sucesso.</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                    href={fileUrl}
                    download={downloadFileName}
                    className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Baixar PDF
                </a>
                <button
                    onClick={onCreateNew}
                    className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-3 border border-gray-300 dark:border-gray-500 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Criar Outro Documento
                </button>
            </div>
            <div className="mt-6">
                 <button
                    onClick={onResetTemplate}
                    className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 focus:outline-none focus:underline"
                 >
                    Usar um template diferente
                </button>
            </div>
        </div>
    );
};

export default DownloadCard;