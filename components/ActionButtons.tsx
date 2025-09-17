import React from 'react';

interface ActionButtonsProps {
    onGenerate: () => void;
    isProcessing: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onGenerate, isProcessing }) => {
    return (
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row-reverse sm:justify-start gap-3">
            <button
                type="button"
                onClick={onGenerate}
                disabled={isProcessing}
                className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
            >
                Gerar PDF
            </button>
        </div>
    );
};

export default ActionButtons;