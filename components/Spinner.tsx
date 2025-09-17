
import React from 'react';

interface SpinnerProps {
    message?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ message = 'Loading...' }) => {
    return (
        <div className="absolute inset-0 bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 flex flex-col items-center justify-center z-50 rounded-2xl">
            <div className="w-16 h-16 border-4 border-indigo-400 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-200">{message}</p>
        </div>
    );
};

export default Spinner;
