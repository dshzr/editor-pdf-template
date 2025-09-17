import React from 'react';
import { PDFField } from '../types';
import FormField from './FormField';
import ActionButtons from './ActionButtons';

interface PdfFormProps {
    fields: PDFField[];
    formData: Record<string, string>;
    onFormChange: (fieldName: string, value: string) => void;
    onGeneratePdf: () => void;
    isProcessing: boolean;
    onResetTemplate: () => void;
}

const PdfForm: React.FC<PdfFormProps> = ({
    fields,
    formData,
    onFormChange,
    onGeneratePdf,
    isProcessing,
    onResetTemplate,
}) => {
    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Preencha os Campos do Template</h2>
                    <p className="text-gray-500 dark:text-gray-400">Insira os dados para cada campo abaixo. Eles substituirão os textos correspondentes no seu PDF.</p>
                </div>
                <button
                    onClick={onResetTemplate}
                    className="w-full sm:w-auto flex-shrink-0 inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-500 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Trocar Template
                </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); onGeneratePdf(); }}>
                <div className="space-y-6">
                    {fields.filter(field => field.type === 'text').map(field => (
                        <FormField
                            key={field.name}
                            field={field}
                            value={formData[field.name]}
                            onChange={onFormChange}
                        />
                    ))}
                </div>
                <ActionButtons
                    onGenerate={onGeneratePdf}
                    isProcessing={isProcessing}
                />
            </form>
        </div>
    );
};

export default PdfForm;