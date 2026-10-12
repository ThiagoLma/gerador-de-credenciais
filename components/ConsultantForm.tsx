'use client';

import React from 'react';
import {
  User,
  Briefcase,
  Building2,
  Calendar,
  MessageSquareQuote,
  Headphones,
  Eye,
  EyeOff,
  Palette,
  ShieldAlert,
} from 'lucide-react';
import { AccentColor, ConsultantData } from '@/lib/types';

interface ConsultantFormProps {
  data: ConsultantData;
  onChange: (data: ConsultantData) => void;
}

const ACCENT_OPTIONS: { id: AccentColor; label: string; bgClass: string; borderClass: string }[] = [
  { id: 'blue', label: 'Azul Elétrico', bgClass: 'bg-blue-500', borderClass: 'border-blue-500' },
  { id: 'purple', label: 'Roxo Cibernético', bgClass: 'bg-purple-500', borderClass: 'border-purple-500' },
  { id: 'cyan', label: 'Ciano Futurista', bgClass: 'bg-cyan-500', borderClass: 'border-cyan-500' },
  { id: 'emerald', label: 'Esmeralda Neon', bgClass: 'bg-emerald-500', borderClass: 'border-emerald-500' },
];

export function ConsultantForm({ data, onChange }: ConsultantFormProps) {
  const updateField = <K extends keyof ConsultantData>(
    field: K,
    value: ConsultantData[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-blue-400" />
          <h2 className="text-sm font-semibold text-white tracking-wide uppercase">
            Dados do Consultor & Onboarding
          </h2>
        </div>
        <span className="text-[11px] text-slate-400">
          Personalização do Cartão
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Nome do Consultor */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Nome Completo do Consultor <span className="text-blue-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={data.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Ex: Alexandre Silveira"
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Cargo */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-medium text-slate-300">
              Cargo / Especialidade
            </label>
            {data.role !== 'Consultor de vendas' && (
              <button
                type="button"
                onClick={() => updateField('role', 'Consultor de vendas')}
                className="text-[10px] text-blue-400 hover:text-blue-300 underline underline-offset-2 transition"
                title="Definir para o padrão"
              >
                Padrão: Consultor de vendas
              </button>
            )}
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Briefcase className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={data.role}
              onChange={(e) => updateField('role', e.target.value)}
              placeholder="Consultor de vendas"
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Departamento */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Departamento / Área
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Building2 className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={data.department}
              onChange={(e) => updateField('department', e.target.value)}
              placeholder="Ex: Comercial & Vendas"
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Empresa */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-medium text-slate-300">
              Nome da Empresa
            </label>
            {data.companyName !== 'Riograndense Distribuidora' && (
              <button
                type="button"
                onClick={() => updateField('companyName', 'Riograndense Distribuidora')}
                className="text-[10px] text-blue-400 hover:text-blue-300 underline underline-offset-2 transition"
                title="Definir para o padrão"
              >
                Padrão: Riograndense Distribuidora
              </button>
            )}
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Building2 className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={data.companyName}
              onChange={(e) => updateField('companyName', e.target.value)}
              placeholder="Riograndense Distribuidora"
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Data de Início */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Data de Início
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={data.startDate}
              onChange={(e) => updateField('startDate', e.target.value)}
              placeholder="Ex: 12/10/2026"
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Mensagem de Boas-Vindas */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Mensagem de Boas-Vindas
          </label>
          <div className="relative">
            <div className="absolute top-2.5 left-3 pointer-events-none text-slate-500">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
            <textarea
              rows={2}
              value={data.welcomeMessage}
              onChange={(e) => updateField('welcomeMessage', e.target.value)}
              placeholder="Mensagem exibida no topo do documento..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none"
            />
          </div>
        </div>

        {/* Contato de Suporte TI */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Contato do Suporte de TI / Helpdesk
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Headphones className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={data.contactSupport}
              onChange={(e) => updateField('contactSupport', e.target.value)}
              placeholder="Ex: suporte.ti@empresa.com.br | Ramal 4022"
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Controles de Estilo e Segurança */}
      <div className="border-t border-slate-800 pt-3 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Cor de Destaque */}
          <div>
            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5 mb-1.5">
              <Palette className="w-3.5 h-3.5 text-blue-400" />
              Tom de Acento Visual:
            </span>
            <div className="flex items-center gap-2">
              {ACCENT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => updateField('accentColor', opt.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs border transition ${
                    data.accentColor === opt.id
                      ? `${opt.borderClass} bg-slate-800 text-white font-medium`
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-300'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${opt.bgClass}`}></span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles Rápidos */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                updateField('hidePasswordsInPreview', !data.hidePasswordsInPreview)
              }
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition ${
                data.hidePasswordsInPreview
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                  : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-300'
              }`}
            >
              {data.hidePasswordsInPreview ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Senhas Ocultas (••••)</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Senhas Visíveis</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() =>
                updateField('confidentialityNotice', !data.confidentialityNotice)
              }
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition ${
                data.confidentialityNotice
                  ? 'border-blue-500/40 bg-blue-500/10 text-blue-300'
                  : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-300'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Aviso de Sigilo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
