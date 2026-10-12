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

  options.onProgress?.('Renderizando documento...');

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // Resolução Retina de alta nitidez
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#090d16',
      logging: false,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          // Garante dimensões ideais de A4 mesmo se o preview estiver em tela pequena ou oculto
          clonedElement.style.display = 'block';
          clonedElement.style.visibility = 'visible';
          clonedElement.style.opacity = '1';
          clonedElement.style.position = 'relative';
          clonedElement.style.left = '0';
          clonedElement.style.top = '0';
          clonedElement.style.width = '780px';
          clonedElement.style.maxWidth = '780px';
          clonedElement.style.margin = '0 auto';
        }
      },
    });

    options.onProgress?.('Formatando PDF...');

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const margin = 12; // 12mm de margem elegante
    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (imgHeight <= pageHeight - margin * 2) {
      // Cabe perfeitamente centralizado em 1 página
      const topMargin = (pageHeight - imgHeight) / 2;
      pdf.addImage(imgData, 'PNG', margin, topMargin, imgWidth, imgHeight);
    } else {
      // Suporte para documentos com mais páginas
      let heightLeft = imgHeight;
      let position = margin;

      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
    }

    const sanitizedName = (options.consultantName || 'Consultor')
      .trim()
      .replace(/[^a-zA-Z0-9À-ž]/g, '_');

    pdf.save(`Credenciais_Onboarding_${sanitizedName}.pdf`);

    // Feedback festivo de sucesso
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
      scale: 2,
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
          clonedElement.style.width = '780px';
          clonedElement.style.maxWidth = '780px';
          clonedElement.style.margin = '0 auto';
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
