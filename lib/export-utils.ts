import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';

interface ExportOptions {
  consultantName: string;
  onProgress?: (status: string) => void;
}

export async function exportElementToPDF(
  elementId: string,
  options: ExportOptions
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Elemento de visualização não encontrado.');
  }

  options.onProgress?.('Renderizando documento sem cortes...');

  try {
    const canvas = await html2canvas(element, {
      scale: 2.2, // Resolução de alta fidelidade
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#090d16',
      logging: false,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          // Garante dimensões ideais de A4 com fundo escuro contínuo
          clonedElement.style.display = 'block';
          clonedElement.style.visibility = 'visible';
          clonedElement.style.opacity = '1';
          clonedElement.style.position = 'relative';
          clonedElement.style.left = '0';
          clonedElement.style.top = '0';
          clonedElement.style.width = '840px';
          clonedElement.style.maxWidth = '840px';
          clonedElement.style.minHeight = '1120px';
          clonedElement.style.margin = '0';
          clonedElement.style.borderRadius = '0px';
          clonedElement.style.border = 'none';

          // Previne 100% de cortes verticais em fontes no html2canvas
          const allTextNodes = clonedElement.querySelectorAll(
            'h1, h2, h3, h4, h5, h6, span, p, div, a'
          );
          allTextNodes.forEach((node) => {
            const htmlNode = node as HTMLElement;
            if (htmlNode.style) {
              htmlNode.style.overflow = 'visible';
              htmlNode.style.textOverflow = 'clip';
              htmlNode.style.lineHeight = '1.45';
              htmlNode.style.paddingBottom = '3px';
            }
          });
        }
      },
    });

    options.onProgress?.('Gerando PDF página inteira...');

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

    // 1. Pinta a folha A4 inteira com o fundo escuro corporativo (#090d16)
    // Isso ELIMINA qualquer margem ou borda branca ao redor do documento!
    pdf.setFillColor(9, 13, 22);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // 2. Preenche 100% da largura da página (Full Bleed)
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (imgHeight <= pageHeight) {
      // Se couber em 1 página, preenche de ponta a ponta
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    } else {
      // Suporte para documentos que ultrapassam 1 página
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.setFillColor(9, 13, 22);
        pdf.rect(0, 0, pageWidth, pageHeight, 'F');
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
    }

    const sanitizedName = (options.consultantName || 'Consultor')
      .trim()
      .replace(/[^a-zA-Z0-9À-ž]/g, '_');

    pdf.save(`Credenciais_Onboarding_${sanitizedName}.pdf`);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#3b82f6', '#a855f7', '#06b6d4', '#ffffff'],
    });
  } catch (err) {
    console.error('Falha detalhada ao gerar PDF:', err);
    throw err;
  }
}

export async function exportElementToImage(
  elementId: string,
  options: ExportOptions
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Elemento de visualização não encontrado.');
  }

  options.onProgress?.('Gerando imagem...');

  try {
    const canvas = await html2canvas(element, {
      scale: 2.2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#090d16',
      logging: false,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          clonedElement.style.display = 'block';
          clonedElement.style.visibility = 'visible';
          clonedElement.style.opacity = '1';
          clonedElement.style.position = 'relative';
          clonedElement.style.left = '0';
          clonedElement.style.top = '0';
          clonedElement.style.width = '840px';
          clonedElement.style.maxWidth = '840px';
          clonedElement.style.margin = '0 auto';

          const allTextNodes = clonedElement.querySelectorAll(
            'h1, h2, h3, h4, h5, h6, span, p, div, a'
          );
          allTextNodes.forEach((node) => {
            const htmlNode = node as HTMLElement;
            if (htmlNode.style) {
              htmlNode.style.overflow = 'visible';
              htmlNode.style.textOverflow = 'clip';
              htmlNode.style.lineHeight = '1.45';
              htmlNode.style.paddingBottom = '3px';
            }
          });
        }
      },
    });

    const image = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    const sanitizedName = (options.consultantName || 'Consultor')
      .trim()
      .replace(/[^a-zA-Z0-9À-ž]/g, '_');

    link.download = `Credenciais_Onboarding_${sanitizedName}.png`;
    link.href = image;
    link.click();

    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 },
    });
  } catch (err) {
    console.error('Falha detalhada ao gerar imagem:', err);
    throw err;
  }
}
