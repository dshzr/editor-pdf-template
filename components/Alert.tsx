
import React from 'react';

interface AlertProps {
    message: string;
    type: 'error' | 'info';
    onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
    const baseClasses = 'p-4 mb-4 rounded-lg flex items-center justify-between';
    const typeClasses = {
        error: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200',
        info: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200',
    };

    return (
        <div className={`${baseClasses} ${typeClasses[type]}`} role="alert">
            <p className="font-medium">{message}</p>
            {onClose && (
                <button
                    onClick={onClose}
                    className="ml-4 -mr-1 p-1 rounded-full hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Close"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default Alert;
