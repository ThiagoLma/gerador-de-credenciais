'use client';

import React from 'react';
import {
  FileDown,
  Image as ImageIcon,
  Shield,
  RotateCcw,
  Sparkles,
  Loader2,
  PanelRightClose,
  PanelRightOpen,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  onExportPDF: () => void;
  onExportImage: () => void;
  onReset: () => void;
  onLoadDemo: () => void;
  isExporting: boolean;
  exportStatus: string;
  systemsCount: number;
  showLivePreview: boolean;
  onToggleLivePreview: () => void;
}

export function Header({
  onExportPDF,
  onExportImage,
  onReset,
  onLoadDemo,
  isExporting,
  exportStatus,
  systemsCount,
  showLivePreview,
  onToggleLivePreview,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-background/80 backdrop-blur-md px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo e Título */}
        <div className="flex items-center gap-3.5 w-full md:w-auto justify-between md:justify-start">
          <BrandLogo size="md" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                Onboarding Pass
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Enterprise
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Gerador seguro de credenciais e boas-vindas para consultores
            </p>
          </div>

          <div className="md:hidden flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            {systemsCount} {systemsCount === 1 ? 'sistema' : 'sistemas'}
          </div>
        </div>

        {/* Ações e Controles */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
          {/* Botão de Alternar Live Preview (Ocultar / Exibir) */}
          <button
            type="button"
            onClick={onToggleLivePreview}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition shadow-sm ${
              showLivePreview
                ? 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border-slate-700'
                : 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border-blue-500/40 ring-1 ring-blue-500/30'
            }`}
            title={
              showLivePreview
                ? 'Ocultar Live Preview para expandir a área de formulário'
                : 'Exibir Live Preview em tempo real'
            }
          >
            {showLivePreview ? (
              <>
                <PanelRightClose className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Ocultar Preview</span>
              </>
            ) : (
              <>
                <PanelRightOpen className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Exibir Preview</span>
              </>
            )}
          </button>

          <button
            onClick={onLoadDemo}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-800 rounded-lg border border-slate-700/80 transition shadow-sm disabled:opacity-50"
            title="Preencher com dados de exemplo"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Demo</span>
          </button>

          <button
            onClick={onReset}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900/50 hover:bg-slate-800/60 rounded-lg border border-slate-800 transition disabled:opacity-50"
            title="Limpar formulário"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Limpar</span>
          </button>

          <button
            onClick={onExportImage}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition shadow-sm disabled:opacity-50"
            title="Exportar Live Preview como imagem PNG"
          >
            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>PNG</span>
          </button>

          <button
            onClick={onExportPDF}
            disabled={isExporting}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 active:scale-95 rounded-lg shadow-glow-blue transition disabled:opacity-50"
            title="Exportar Live Preview como PDF"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{exportStatus || 'Gerando...'}</span>
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4" />
                <span>PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
