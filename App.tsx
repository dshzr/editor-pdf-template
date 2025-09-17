import React, { useState, useCallback, useEffect } from 'react';
import { PDFField } from './types';
import { extractPlaceholders, replacePlaceholdersAndGeneratePdf } from './services/pdfService';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import PdfForm from './components/PdfForm';
import Spinner from './components/Spinner';
import Alert from './components/Alert';
import DownloadCard from './components/DownloadCard';

const App: React.FC = () => {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [pdfFields, setPdfFields] = useState<PDFField[]>([]);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);

    useEffect(() => {
        const loadSavedTemplate = async () => {
            const savedPdfBase64 = localStorage.getItem('savedPdfTemplate');
            const savedPdfFileName = localStorage.getItem('savedPdfFileName');

            if (savedPdfBase64 && savedPdfFileName) {
                setIsLoading(true);
                setLoadingMessage('Carregando template salvo...');
                try {
                    const response = await fetch(savedPdfBase64);
                    const blob = await response.blob();
                    const savedFile = new File([blob], savedPdfFileName, { type: 'application/pdf' });
                    
                    setPdfFile(savedFile);
                    const fields = await extractPlaceholders(savedFile);

                    if (fields.length === 0) {
                        setError('O template salvo não contém placeholders. Por favor, envie um novo.');
                        resetState(); // Limpa o template inválido do storage
                    } else {
                        setPdfFields(fields);
                        const initialFormData = fields.reduce((acc, field) => {
                            acc[field.name] = '';
                            return acc;
                        }, {} as Record<string, string>);
                        setFormData(initialFormData);
                    }
                } catch (err) {
                    console.error('Failed to load saved PDF from localStorage:', err);
                    setError('Não foi possível carregar o template salvo. Ele pode estar corrompido.');
                    resetState(); // Limpa dados corrompidos
                } finally {
                    setIsLoading(false);
                    setLoadingMessage('');
                }
            }
        };
        loadSavedTemplate();
    }, []);

    const resetState = () => {
        setPdfFile(null);
        setPdfFields([]);
        setFormData({});
        setGeneratedPdfUrl(null);
        setError(null);
        localStorage.removeItem('savedPdfTemplate');
        localStorage.removeItem('savedPdfFileName');
    };

    const resetForm = () => {
        const initialFormData = pdfFields.reduce((acc, field) => {
            acc[field.name] = '';
            return acc;
        }, {} as Record<string, string>);
        setFormData(initialFormData);
        setGeneratedPdfUrl(null);
        setError(null);
    };

    const handleFileChange = useCallback(async (file: File) => {
        resetState();
        if (!file) return;

        if (file.type !== 'application/pdf') {
            setError('Por favor, envie um arquivo PDF válido.');
            return;
        }

        setIsLoading(true);
        setLoadingMessage('Analisando o PDF...');
        
        try {
            const fields = await extractPlaceholders(file);
            if (fields.length === 0) {
                setError('Nenhum placeholder como {{exemplo}} foi encontrado. Verifique se o seu PDF contém textos no formato correto para substituição.');
                setPdfFile(null);
            } else {
                setPdfFile(file);
                setPdfFields(fields);
                const initialFormData = fields.reduce((acc, field) => {
                    acc[field.name] = '';
                    return acc;
                }, {} as Record<string, string>);
                setFormData(initialFormData);

                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    try {
                        localStorage.setItem('savedPdfTemplate', reader.result as string);
                        localStorage.setItem('savedPdfFileName', file.name);
                    } catch (e) {
                        console.error("Error saving to localStorage:", e);
                        setError("Não foi possível salvar o template. O armazenamento do navegador pode estar cheio.");
                    }
                };
                reader.onerror = (error) => {
                    console.error("Could not convert file to base64:", error);
                };
            }
        } catch (err) {
            console.error(err);
            setError('Não foi possível processar o arquivo PDF. Ele pode estar corrompido ou protegido.');
            setPdfFile(null);
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    }, []);
    
    const handleFormChange = (fieldName: string, value: string) => {
        setFormData(prev => ({ ...prev, [fieldName]: value }));
    };
    
    const handleGeneratePdf = async () => {
        if (!pdfFile) return;

        setIsLoading(true);
        setLoadingMessage('Gerando seu novo PDF...');
        setError(null);
        setGeneratedPdfUrl(null);

        try {
            const pdfBytes = await replacePlaceholdersAndGeneratePdf(pdfFile, formData);
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setGeneratedPdfUrl(url);
        } catch (err) {
            console.error(err);
            setError('Falha ao gerar o PDF. Por favor, tente novamente.');
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden relative">
                    <div className="p-6 md:p-10">
                        {isLoading && <Spinner message={loadingMessage} />}
                        {error && <Alert message={error} type="error" onClose={() => setError(null)} />}
                        
                        {!pdfFile && !isLoading && <FileUpload onFileSelect={handleFileChange} />}
                        
                        {pdfFile && pdfFields.length > 0 && (
                            <>
                                {!generatedPdfUrl ? (
                                    <PdfForm
                                        fields={pdfFields}
                                        formData={formData}
                                        onFormChange={handleFormChange}
                                        onGeneratePdf={handleGeneratePdf}
                                        isProcessing={isLoading}
                                        onResetTemplate={resetState}
                                    />
                                ) : (
                                    <DownloadCard 
                                      fileUrl={generatedPdfUrl}
                                      originalFileName={pdfFile.name}
                                      onCreateNew={resetForm}
                                      onResetTemplate={resetState}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
                <footer className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
                    <p>Desenvolvido com React e Tailwind CSS</p>
                </footer>
            </main>
        </div>
    );
};

export default App;