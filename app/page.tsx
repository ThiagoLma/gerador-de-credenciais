'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { QuickTemplatesBar } from '@/components/QuickTemplatesBar';
import { ConsultantForm } from '@/components/ConsultantForm';
import { SystemCardForm } from '@/components/SystemCardForm';
import { LivePreview } from '@/components/LivePreview';
import { TemplateManagerModal } from '@/components/TemplateManagerModal';
import {
  ConsultantData,
  QuickTemplate,
  SystemCredential,
} from '@/lib/types';
import {
  INITIAL_CONSULTANT_DATA,
  INITIAL_SYSTEMS,
  QUICK_TEMPLATES,
  generateSecurePassword,
} from '@/lib/templates';
import { exportElementToImage, exportElementToPDF } from '@/lib/export-utils';
import { Eye, Edit3, Sparkles, PanelRightOpen } from 'lucide-react';

export default function HomePage() {
  const [consultant, setConsultant] = useState<ConsultantData>(
    INITIAL_CONSULTANT_DATA
  );
  const [systems, setSystems] = useState<SystemCredential[]>(INITIAL_SYSTEMS);
  const [templates, setTemplates] = useState<QuickTemplate[]>(QUICK_TEMPLATES);
  const [isTemplateManagerOpen, setIsTemplateManagerOpen] = useState<boolean>(false);
  const [showLivePreview, setShowLivePreview] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportStatus, setExportStatus] = useState<string>('');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  // Carrega templates definitivos do servidor (compartilhados entre todas as máquinas)
  useEffect(() => {
    fetch('/api/templates')
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao obter templates');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTemplates(data);
        }
      })
      .catch((err) => {
        console.warn('Usando templates locais em memória:', err);
      });
  }, []);

  const handleSaveTemplates = (updated: QuickTemplate[]) => {
    setTemplates(updated);
  };

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
    } catch (error: any) {
      console.error('Erro na exportação de PDF:', error);
      alert(`Falha ao gerar o PDF: ${error?.message || 'Verifique o console'}`);
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
    } catch (error: any) {
      console.error('Erro na exportação de imagem:', error);
      alert(`Falha ao gerar a imagem: ${error?.message || 'Verifique o console'}`);
    } finally {
      setIsExporting(false);
      setExportStatus('');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header Fixo com Controles */}
      <Header
        onExportPDF={handleExportPDF}
        onExportImage={handleExportImage}
        onReset={handleReset}
        onLoadDemo={handleLoadDemo}
        isExporting={isExporting}
        exportStatus={exportStatus}
        systemsCount={systems.length}
        showLivePreview={showLivePreview}
        onToggleLivePreview={() => setShowLivePreview((prev) => !prev)}
      />

      {/* Modal de Gerenciamento e Edição de Templates */}
      <TemplateManagerModal
        isOpen={isTemplateManagerOpen}
        onClose={() => setIsTemplateManagerOpen(false)}
        templates={templates}
        onSaveTemplates={handleSaveTemplates}
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

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* Aviso de Modo Foco quando Preview estiver ocultado */}
        {!showLivePreview && (
          <div className="mb-6 p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-between text-xs text-blue-200">
            <div className="flex items-center gap-2">
              <PanelRightOpen className="w-4 h-4 text-blue-400" />
              <span>
                <strong>Modo Foco Ativo:</strong> O Live Preview está oculto para maximizar o espaço de configuração do documento. A exportação para PDF continua funcionando normalmente.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowLivePreview(true)}
              className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition shrink-0"
            >
              Restaurar Preview
            </button>
          </div>
        )}

        <div
          className={`grid grid-cols-1 ${
            showLivePreview ? 'lg:grid-cols-12 gap-8' : 'gap-6'
          } items-start`}
        >
          {/* Coluna de Edição: 6 colunas quando com preview, 12 colunas maximizada quando oculto */}
          <div
            className={`space-y-6 ${
              showLivePreview
                ? 'lg:col-span-6'
                : 'lg:col-span-12 max-w-4xl mx-auto w-full'
            } ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}
          >
            <QuickTemplatesBar
              templates={templates}
              onSelectTemplate={handleSelectTemplate}
              onOpenManager={() => setIsTemplateManagerOpen(true)}
            />
            <ConsultantForm data={consultant} onChange={setConsultant} />
            <SystemCardForm
              systems={systems}
              onChange={setSystems}
              onAddBlankSystem={handleAddBlankSystem}
            />
          </div>

          {/* Coluna de Live Preview:
              - Se showLivePreview === true: exibe na coluna direita (sticky)
              - Se showLivePreview === false: posiciona off-screen para manter a capacidade de exportação para PDF/PNG funcionando sem falhas
          */}
          <div
            className={`${
              showLivePreview
                ? 'lg:col-span-6 sticky top-20 space-y-4'
                : 'fixed -left-[9999px] top-0 w-[850px] pointer-events-none opacity-0'
            } ${mobileView === 'editor' && showLivePreview ? 'hidden lg:block' : 'block'}`}
          >
            {showLivePreview && (
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  Live Preview em Tempo Real (Dark Mode)
                </span>
                <span className="text-[11px] text-slate-500">
                  Visual exato da exportação PDF
                </span>
              </div>
            )}

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
