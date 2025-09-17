import { PDFField } from '../types';

export const BICICLETARIA_FIELDS: PDFField[] = [
    {
        name: 'nome',
        type: 'text',
        label: 'Nome do Cliente'
    },
    {
        name: 'quantia',
        type: 'text',
        label: 'Quantia/Valor'
    },
    {
        name: 'produto',
        type: 'text',
        label: 'Produto/Serviço'
    },
    {
        name: 'cor',
        type: 'text',
        label: 'Cor'
    },
    {
        name: 'numeracao',
        type: 'text',
        label: 'Numeração/Tamanho'
    },
    {
        name: 'dia',
        type: 'text',
        label: 'Dia'
    },
    {
        name: 'mes',
        type: 'text',
        label: 'Mês'
    },
    {
        name: 'ano',
        type: 'text',
        label: 'Ano'
    },
    {
        name: 'revisao1',
        type: 'date',
        label: 'Data da 1ª Revisão'
    },
    {
        name: 'revisao2',
        type: 'date',
        label: 'Data da 2ª Revisão'
    }
];

// Função para obter a data atual
const getCurrentDate = () => {
    const today = new Date();
    return {
        dia: today.getDate().toString().padStart(2, '0'),
        mes: (today.getMonth() + 1).toString().padStart(2, '0'),
        ano: today.getFullYear().toString()
    };
};

export const INITIAL_BICICLETARIA_DATA = {
    nome: '',
    quantia: '',
    produto: '',
    cor: '',
    numeracao: '',
    ...getCurrentDate(),
    revisao1: '',
    revisao2: ''
};
