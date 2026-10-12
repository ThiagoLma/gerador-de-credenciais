'use client';

import React from 'react';
import {
  Plus,
  Trash2,
  Copy,
  Dices,
  ExternalLink,
  Layers,
  KeyRound,
  User,
  Link as LinkIcon,
  FileText,
  Tag,
} from 'lucide-react';
import { SystemCredential } from '@/lib/types';
import { generateSecurePassword } from '@/lib/templates';
import { SystemIcon } from './SystemIcon';

interface SystemCardFormProps {
  systems: SystemCredential[];
  onChange: (systems: SystemCredential[]) => void;
  onAddBlankSystem: () => void;
}

export function SystemCardForm({
  systems,
  onChange,
  onAddBlankSystem,
}: SystemCardFormProps) {
  const updateSystem = (id: string, updates: Partial<SystemCredential>) => {
    onChange(
      systems.map((sys) => (sys.id === id ? { ...sys, ...updates } : sys))
    );
  };

  const removeSystem = (id: string) => {
    onChange(systems.filter((sys) => sys.id !== id));
  };

  const duplicateSystem = (sys: SystemCredential) => {
    const newSystem: SystemCredential = {
      ...sys,
      id: `sys-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: `${sys.name} (Cópia)`,
      password: generateSecurePassword(12),
    };
    onChange([...systems, newSystem]);
  };

  const handleRegeneratePassword = (id: string) => {
    updateSystem(id, { password: generateSecurePassword(12) });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-400" />
          <h2 className="text-sm font-semibold text-white tracking-wide uppercase">
            Sistemas e Credenciais ({systems.length})
          </h2>
        </div>
        <button
          type="button"
          onClick={onAddBlankSystem}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 rounded-lg transition shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Novo Sistema</span>
        </button>
      </div>

      {systems.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center bg-slate-900/30">
          <p className="text-xs text-slate-400 mb-3">
            Nenhum sistema adicionado ainda. Escolha um template rápido acima ou adicione um manualmente.
          </p>
          <button
            type="button"
            onClick={onAddBlankSystem}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-blue-400 hover:text-white bg-blue-600/10 hover:bg-blue-600 rounded-lg border border-blue-500/20 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            Adicionar Primeiro Sistema
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {systems.map((sys, index) => (
            <div
              key={sys.id}
              className="group bg-slate-900/70 hover:bg-slate-900/90 rounded-xl border border-slate-800 hover:border-slate-700/80 p-4 transition-all shadow-sm"
            >
              {/* Header do Cartão */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-semibold">
                    {index + 1}
                  </span>
                  <div className="p-1 rounded bg-slate-800/80 text-blue-400">
                    <SystemIcon name={sys.iconName} className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">
                    {sys.name || 'Sistema sem nome'}
                  </span>
                  {sys.category && (
                    <span className="text-[10px] uppercase font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/60">
                      {sys.category}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => duplicateSystem(sys)}
                    className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
                    title="Duplicar sistema"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSystem(sys.id)}
                    className="p-1.5 rounded-md text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                    title="Remover sistema"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Grid de Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Nome do Sistema */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Nome do Sistema / Plataforma
                  </label>
                  <input
                    type="text"
                    value={sys.name}
                    onChange={(e) => updateSystem(sys.id, { name: e.target.value })}
                    placeholder="Ex: CRM de Vendas"
                    className="w-full px-3 py-1.5 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>

                {/* Categoria / Tag */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                    <Tag className="w-3 h-3 text-slate-500" />
                    Categoria / Tag
                  </label>
                  <input
                    type="text"
                    value={sys.category}
                    onChange={(e) => updateSystem(sys.id, { category: e.target.value })}
                    placeholder="Ex: Comercial, Comunicação, Dev"
                    className="w-full px-3 py-1.5 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>

                {/* Link do Sistema */}
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                      <LinkIcon className="w-3 h-3 text-slate-500" />
                      Link / URL de Acesso
                    </label>
                    {sys.url && (
                      <a
                        href={sys.url.startsWith('http') ? sys.url : `https://${sys.url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-blue-400 hover:underline flex items-center gap-0.5"
                      >
                        Testar Link <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                  <input
                    type="text"
                    value={sys.url}
                    onChange={(e) => updateSystem(sys.id, { url: e.target.value })}
                    placeholder="https://sistema.empresa.com.br"
                    className="w-full px-3 py-1.5 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>

                {/* Usuário / Login */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-500" />
                    Usuário / E-mail / Identificador
                  </label>
                  <input
                    type="text"
                    value={sys.username}
                    onChange={(e) => updateSystem(sys.id, { username: e.target.value })}
                    placeholder="nome.sobrenome@empresa.com"
                    className="w-full px-3 py-1.5 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition font-mono"
                  />
                </div>

                {/* Senha Temporária com Gerador Rápido */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                      <KeyRound className="w-3 h-3 text-slate-500" />
                      Senha Temporária
                    </label>
                    <button
                      type="button"
                      onClick={() => handleRegeneratePassword(sys.id)}
                      className="text-[10px] text-purple-400 hover:text-purple-300 flex items-center gap-1 transition"
                      title="Gerar nova senha forte aleatória"
                    >
                      <Dices className="w-3 h-3" />
                      Gerar Forte
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={sys.password}
                      onChange={(e) => updateSystem(sys.id, { password: e.target.value })}
                      placeholder="Senha123#$"
                      className="w-full pr-10 pl-3 py-1.5 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => handleRegeneratePassword(sys.id)}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-500 hover:text-purple-400 transition"
                      title="Sortear nova senha"
                    >
                      <Dices className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Observações / Instruções */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                    <FileText className="w-3 h-3 text-slate-500" />
                    Instruções Específicas / Observações
                  </label>
                  <input
                    type="text"
                    value={sys.notes || ''}
                    onChange={(e) => updateSystem(sys.id, { notes: e.target.value })}
                    placeholder="Ex: Obrigatorio ativar 2FA no primeiro login"
                    className="w-full px-3 py-1.5 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
