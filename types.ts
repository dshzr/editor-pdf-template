// FIX: Added missing AISuggestions type to fix import error.
export type AISuggestions = Record<string, string>;

export interface PDFField {
    name: string;
    type: string;
}

// Extend the global Window interface for pdf-lib
declare global {
    interface Window {
        PDFLib: any;
        pdfjsLib: any;
        process: {
            env: {
                NODE_ENV: 'development' | 'production' | 'test';
            };
        };
    }
}