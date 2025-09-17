import React from 'react';
import { PDFField, BicicletariaData } from '../types';

interface FormFieldProps {
    field: PDFField;
    value: string;
    onChange: (fieldName: keyof BicicletariaData, value: string) => void;
}

const FormField: React.FC<FormFieldProps> = ({ field, value, onChange }) => {
    return (
        <div>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {field.label}
            </label>
            <input
                type={field.type === 'date' ? 'date' : 'text'}
                id={field.name}
                name={field.name}
                value={value}
                onChange={(e) => onChange(field.name, e.target.value)}
                className="block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                aria-label={`Input for ${field.label}`}
                placeholder={field.type === 'date' ? 'dd/mm/aaaa' : `Digite ${field.label.toLowerCase()}`}
            />
        </div>
    );
};

export default FormField;