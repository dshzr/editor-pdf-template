import { PDFField } from '../types';

const { PDFDocument, rgb, StandardFonts } = window.PDFLib;
const { pdfjsLib } = window;

// Regex aprimorado para ser mais flexível com os nomes dos placeholders (permite espaços, hífens, etc.)
const PLACEHOLDER_REGEX = /{{\s*([^}]+?)\s*}}/g;

// Extrai nomes de placeholders únicos de um arquivo PDF, inspecionando os itens de texto.
export const extractPlaceholders = async (file: File): Promise<PDFField[]> => {
    const fileBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: fileBuffer }).promise;
    const placeholders = new Set<string>();

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        // Usa combineTextItems para agrupar textos fragmentados, melhorando a detecção.
        const textContent = await page.getTextContent({ combineTextItems: true });
        
        for (const item of textContent.items) {
            const localRegex = new RegExp(PLACEHOLDER_REGEX);
            let match;
            while ((match = localRegex.exec(item.str)) !== null) {
                // Usa trim() para limpar espaços em branco ao redor do nome do campo.
                placeholders.add(match[1].trim());
            }
        }
    }

    return Array.from(placeholders).map(name => ({ name, type: 'text' }));
};

// Substitui placeholders em um PDF com os dados fornecidos pelo usuário.
export const replacePlaceholdersAndGeneratePdf = async (file: File, formData: Record<string, string>): Promise<Uint8Array> => {
    const fileBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileBuffer);
    const pdfJsDoc = await pdfjsLib.getDocument({ data: new Uint8Array(fileBuffer) }).promise;

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();

    for (let i = 0; i < pages.length; i++) {
        const pdfLibPage = pages[i];
        const pdfJsPage = await pdfJsDoc.getPage(i + 1);
        // Usa combineTextItems para consistência com a extração.
        const textContent = await pdfJsPage.getTextContent({ combineTextItems: true });

        for (const item of textContent.items) {
            if (!item.str.includes('{{')) continue;

            const localRegex = new RegExp(PLACEHOLDER_REGEX);
            let match;
            
            while ((match = localRegex.exec(item.str)) !== null) {
                const placeholder = match[0]; // ex: '{{ nome }}'
                const placeholderKey = match[1].trim(); // ex: 'nome'
                const replacementValue = formData[placeholderKey];

                if (replacementValue === undefined) continue;
                
                const { transform, height, width: itemWidth } = item;
                const itemX = transform[4];
                const itemY = transform[5];
                const fontSize = height;

                // **NOVO: Cálculo de largura proporcional para precisão entre fontes**
                // Mede a largura total do item de texto usando Helvetica para obter uma linha de base.
                const helveticaTotalWidth = helveticaFont.widthOfTextAtSize(item.str, fontSize);
                if (helveticaTotalWidth === 0) continue; // Evita divisão por zero

                // Calcula a posição X do placeholder de forma proporcional.
                const prefix = item.str.substring(0, match.index);
                const helveticaPrefixWidth = helveticaFont.widthOfTextAtSize(prefix, fontSize);
                const estimatedPrefixWidth = (helveticaPrefixWidth / helveticaTotalWidth) * itemWidth;
                const placeholderX = itemX + estimatedPrefixWidth;

                // Calcula a largura do placeholder de forma proporcional para garantir que ele seja totalmente coberto.
                const helveticaPlaceholderWidth = helveticaFont.widthOfTextAtSize(placeholder, fontSize);
                const estimatedPlaceholderWidth = (helveticaPlaceholderWidth / helveticaTotalWidth) * itemWidth;

                // Cobre o texto antigo com um retângulo branco com margens de segurança.
                // Isso resolve problemas de fontes e garante que nenhum caractere antigo fique visível.
                pdfLibPage.drawRectangle({
                    x: placeholderX - 1, // Pequena margem horizontal
                    y: itemY - (fontSize * 0.25), // Margem vertical para cobrir a base da fonte
                    width: estimatedPlaceholderWidth + 2, // Usa a largura estimada proporcional + margem
                    height: fontSize * 1.5, // Altura generosa para cobrir toda a fonte
                    color: rgb(1, 1, 1),
                });
                
                // Desenha o novo texto
                pdfLibPage.drawText(replacementValue, {
                    x: placeholderX,
                    y: itemY,
                    font: helveticaFont,
                    size: fontSize,
                    color: rgb(0, 0, 0),
                });
            }
        }
    }

    return await pdfDoc.save();
};