// FIX: Added missing AISuggestions type to fix import error.
export type AISuggestions = Record<string, string>;

// Tipos específicos para F.A BICICLETARIA
export interface BicicletariaData {
    nome: string;
    quantia: string;
    produto: string;
    cor: string;
    numeracao: string;
    dia: string;
    mes: string;
    ano: string;
    revisao1: string;
    revisao2: string;
}

export interface PDFField {
    name: keyof BicicletariaData;
    type: string;
    label: string;
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