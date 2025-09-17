import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 py-4 md:px-8 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">F.A BICICLETARIA</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Sistema de Documentos</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;