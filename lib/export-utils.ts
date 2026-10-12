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

  options.onProgress?.('Renderizando documento em alta resolução...');

  // Adiciona classe temporária para otimizar renderização de exportação se necessário
  const originalScrollTop = window.scrollY;

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // Resolução Retina nítida
      useCORS: true,
      logging: false,
      backgroundColor: '#090d16',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    options.onProgress?.('Gerando arquivo PDF...');

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth - 20; // margem de 10mm em cada lado
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (imgHeight <= pageHeight - 20) {
      // Cabe perfeitamente em 1 página
      const topMargin = (pageHeight - imgHeight) / 2;
      pdf.addImage(imgData, 'JPEG', 10, topMargin, imgWidth, imgHeight);
    } else {
      // Suporte para páginas longas
      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
    }

    const sanitizedName = (options.consultantName || 'Consultor')
      .trim()
      .replace(/[^a-zA-Z0-9À-ž]/g, '_');

    pdf.save(`Credenciais_Onboarding_${sanitizedName}.pdf`);

    // Efeito de celebração
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#3b82f6', '#a855f7', '#06b6d4', '#ffffff'],
    });
  } finally {
    window.scrollTo(0, originalScrollTop);
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

  options.onProgress?.('Gerando imagem de alta fidelidade...');

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#090d16',
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
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
}
