import React from 'react';
import { PDFField, BicicletariaData } from '../types';
import FormField from './FormField';
import ActionButtons from './ActionButtons';

interface PdfFormProps {
    fields: PDFField[];
    formData: BicicletariaData;
    onFormChange: (fieldName: keyof BicicletariaData, value: string) => void;
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
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">F.A BICICLETARIA - Formulário</h2>
                    <p className="text-gray-500 dark:text-gray-400">Preencha os dados do cliente e do produto/serviço da bicicletaria.</p>
                </div>
                <button
                    onClick={onResetTemplate}
                    className="w-full sm:w-auto flex-shrink-0 inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-500 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Trocar Template
                </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); onGeneratePdf(); }}>
                <div className="space-y-8">
                    {/* Dados do Cliente */}
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Dados do Cliente</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {fields.filter(field => field.name === 'nome').map(field => (
                                <FormField
                                    key={field.name}
                                    field={field}
                                    value={formData[field.name]}
                                    onChange={onFormChange}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Dados do Produto/Serviço */}
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Produto/Serviço</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {fields.filter(field => ['produto', 'cor', 'numeracao', 'quantia'].includes(field.name)).map(field => (
                                <FormField
                                    key={field.name}
                                    field={field}
                                    value={formData[field.name]}
                                    onChange={onFormChange}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Data */}
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Data</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {fields.filter(field => ['dia', 'mes', 'ano'].includes(field.name)).map(field => (
                                <FormField
                                    key={field.name}
                                    field={field}
                                    value={formData[field.name]}
                                    onChange={onFormChange}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Revisões */}
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Datas de Revisão</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {fields.filter(field => ['revisao1', 'revisao2'].includes(field.name)).map(field => (
                                <FormField
                                    key={field.name}
                                    field={field}
                                    value={formData[field.name]}
                                    onChange={onFormChange}
                                />
                            ))}
                        </div>
                    </div>
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