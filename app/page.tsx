'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { QuickTemplatesBar } from '@/components/QuickTemplatesBar';
import { ConsultantForm } from '@/components/ConsultantForm';
import { SystemCardForm } from '@/components/SystemCardForm';
import { LivePreview } from '@/components/LivePreview';
import {
  ConsultantData,
  QuickTemplate,
  SystemCredential,
} from '@/lib/types';
import {
  INITIAL_CONSULTANT_DATA,
  INITIAL_SYSTEMS,
  generateSecurePassword,
} from '@/lib/templates';
import { exportElementToImage, exportElementToPDF } from '@/lib/export-utils';
import { Eye, Edit3, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [consultant, setConsultant] = useState<ConsultantData>(
    INITIAL_CONSULTANT_DATA
  );
  const [systems, setSystems] = useState<SystemCredential[]>(INITIAL_SYSTEMS);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportStatus, setExportStatus] = useState<string>('');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  const handleSelectTemplate = (tmpl: QuickTemplate) => {
    const newSystem: SystemCredential = {
      id: `sys-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: tmpl.name,
      category: tmpl.category,
      url: tmpl.defaultUrl,
      username: tmpl.placeholderUser,
      password: generateSecurePassword(12),
      notes: tmpl.defaultNotes,
      iconName: tmpl.iconName,
    };
    setSystems((prev) => [...prev, newSystem]);
  };

  const handleAddBlankSystem = () => {
    const newSystem: SystemCredential = {
      id: `sys-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: '',
      category: 'Geral',
      url: '',
      username: '',
      password: generateSecurePassword(12),
      notes: '',
      iconName: 'Globe',
    };
    setSystems((prev) => [...prev, newSystem]);
  };

  const handleReset = () => {
    if (
      window.confirm(
        'Deseja limpar todos os campos e começar um documento do zero?'
      )
    ) {
      setConsultant({
        name: '',
        role: '',
        department: '',
        companyName: '',
        startDate: new Date().toLocaleDateString('pt-BR'),
        welcomeMessage: '',
        contactSupport: '',
        confidentialityNotice: true,
        accentColor: 'blue',
        hidePasswordsInPreview: false,
      });
      setSystems([]);
    }
  };

  const handleLoadDemo = () => {
    setConsultant(INITIAL_CONSULTANT_DATA);
    setSystems(INITIAL_SYSTEMS);
  };

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      await exportElementToPDF('onboarding-live-preview-card', {
        consultantName: consultant.name,
        onProgress: (status) => setExportStatus(status),
      });
    } catch (error) {
      console.error('Erro na exportação de PDF:', error);
      alert('Houve uma falha ao gerar o PDF. Verifique o console.');
    } finally {
      setIsExporting(false);
      setExportStatus('');
    }
  };

  const handleExportImage = async () => {
    try {
      setIsExporting(true);
      await exportElementToImage('onboarding-live-preview-card', {
        consultantName: consultant.name,
        onProgress: (status) => setExportStatus(status),
      });
    } catch (error) {
      console.error('Erro na exportação de imagem:', error);
      alert('Houve uma falha ao gerar a imagem. Verifique o console.');
    } finally {
      setIsExporting(false);
      setExportStatus('');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header Fixo / Sticky */}
      <Header
        onExportPDF={handleExportPDF}
        onExportImage={handleExportImage}
        onReset={handleReset}
        onLoadDemo={handleLoadDemo}
        isExporting={isExporting}
        exportStatus={exportStatus}
        systemsCount={systems.length}
      />

      {/* Seletor Mobile de Abas (Editar vs Preview) */}
      <div className="lg:hidden flex items-center justify-center p-2 bg-slate-900 border-b border-slate-800 sticky top-[57px] z-30">
        <div className="grid grid-cols-2 w-full max-w-sm bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setMobileView('editor')}
            className={`flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-md transition ${
              mobileView === 'editor'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editar Formulário</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileView('preview')}
            className={`flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-md transition ${
              mobileView === 'preview'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview ({systems.length})</span>
          </button>
        </div>
      </div>

      {/* Conteúdo Principal - Layout 2 Colunas */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Coluna Esquerda: Edição (5 cols no desktop) */}
          <div
            className={`lg:col-span-6 space-y-6 ${
              mobileView === 'preview' ? 'hidden lg:block' : 'block'
            }`}
          >
            <QuickTemplatesBar onSelectTemplate={handleSelectTemplate} />
            <ConsultantForm data={consultant} onChange={setConsultant} />
            <SystemCardForm
              systems={systems}
              onChange={setSystems}
              onAddBlankSystem={handleAddBlankSystem}
            />
          </div>

          {/* Coluna Direita: Live Preview Fixo/Sticky (6 cols no desktop) */}
          <div
            className={`lg:col-span-6 sticky top-20 space-y-4 ${
              mobileView === 'editor' ? 'hidden lg:block' : 'block'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Live Preview em Tempo Real (Dark Mode)
              </span>
              <span className="text-[11px] text-slate-500">
                Visual exato da exportação PDF
              </span>
            </div>

            <LivePreview consultant={consultant} systems={systems} />
          </div>
        </div>
      </main>

      {/* Rodapé institucional */}
      <footer className="border-t border-slate-900 py-6 mt-12 text-center text-xs text-slate-500">
        <p>
          Sistema de Onboarding e Gerador de Credenciais de Acesso • 100% Client-Side
          • Dados seguros no seu dispositivo
        </p>
      </footer>
    </div>
  );
}
