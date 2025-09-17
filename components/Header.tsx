import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 py-4 md:px-8 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm1.5 2.5a.5.5 0 000 1h5a.5.5 0 000-1h-5zM5 8a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9A.5.5 0 015 8zm0 2a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9A.5.5 0 015 10zm0 2a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4A.5.5 0 015 12z" clipRule="evenodd" />
                    </svg>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Editor de PDF por Template</h1>
                </div>
            </div>
        </header>
    );
};

export default Header;