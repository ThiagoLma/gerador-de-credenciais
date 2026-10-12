'use client';

import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  RotateCcw,
  Save,
  Check,
  Settings,
  Globe,
} from 'lucide-react';
import { QuickTemplate } from '@/lib/types';
import { QUICK_TEMPLATES } from '@/lib/templates';
import { SystemIcon } from './SystemIcon';

interface TemplateManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  templates: QuickTemplate[];
  onSaveTemplates: (updated: QuickTemplate[]) => void;
}

const AVAILABLE_ICONS = [
  'Mail',
  'MessageSquare',
  'TrendingUp',
  'PhoneCall',
  'GitBranch',
  'BookOpen',
  'ShieldCheck',
  'Layers',
  'Globe',
  'Server',
  'Database',
  'Lock',
  'Terminal',
];

export function TemplateManagerModal({
  isOpen,
  onClose,
  templates,
  onSaveTemplates,
}: TemplateManagerModalProps) {
  const [localTemplates, setLocalTemplates] = useState<QuickTemplate[]>(templates);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSavedNotice, setIsSavedNotice] = useState<boolean>(false);

  // Sincroniza quando abrir
  React.useEffect(() => {
    if (isOpen) {
      setLocalTemplates(templates);
      setEditingId(null);
    }
  }, [isOpen, templates]);

  if (!isOpen) return null;

  const handleUpdate = (id: string, updates: Partial<QuickTemplate>) => {
    setLocalTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const handleAddNew = () => {
    const newId = `tmpl-custom-${Date.now()}`;
    const newTemplate: QuickTemplate = {
      id: newId,
      name: 'Novo Sistema',
      category: 'Geral',
      defaultUrl: 'https://',
      iconName: 'Globe',
      defaultNotes: 'Instruções para o primeiro acesso.',
      placeholderUser: 'usuario@empresa.com.br',
    };
    setLocalTemplates((prev) => [...prev, newTemplate]);
    setEditingId(newId);
  };

  const handleDelete = (id: string) => {
    setLocalTemplates((prev) => prev.filter((t) => t.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleResetToDefault = () => {
    if (
      window.confirm(
        'Tem certeza que deseja restaurar a lista padrão de templates?'
      )
    ) {
      setLocalTemplates(QUICK_TEMPLATES);
      onSaveTemplates(QUICK_TEMPLATES);
      setIsSavedNotice(true);
      setTimeout(() => setIsSavedNotice(false), 2000);
    }
  };

  const handleSaveAll = () => {
    onSaveTemplates(localTemplates);
    setIsSavedNotice(true);
    setTimeout(() => {
      setIsSavedNotice(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Gerenciador de Templates Rápidos
              </h3>
              <p className="text-xs text-slate-400">
                Personalize os sistemas sugeridos com os links e padrões da sua empresa
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de Templates com Edição */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Templates Disponíveis ({localTemplates.length})
            </span>
            <button
              type="button"
              onClick={handleAddNew}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-400 hover:text-white bg-blue-600/10 hover:bg-blue-600 rounded-lg border border-blue-500/20 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Adicionar Novo Template
            </button>
          </div>

          <div className="space-y-2.5">
            {localTemplates.map((tmpl) => {
              const isEditing = editingId === tmpl.id;

              return (
                <div
                  key={tmpl.id}
                  className={`rounded-xl border transition-all p-3.5 ${
                    isEditing
                      ? 'bg-slate-950/80 border-blue-500/50 shadow-sm'
                      : 'bg-slate-950/40 hover:bg-slate-950/60 border-slate-800/80'
                  }`}
                >
                  {/* Linha Resumo */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-slate-800 text-slate-300 shrink-0">
                        <SystemIcon name={tmpl.iconName} className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-white truncate">
                            {tmpl.name}
                          </h4>
                          <span className="text-[10px] uppercase font-semibold px-2 py-0.2 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50">
                            {tmpl.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">
                          {tmpl.defaultUrl || 'Sem URL definida'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          setEditingId(isEditing ? null : tmpl.id)
                        }
                        className={`p-1.5 rounded-lg text-xs transition flex items-center gap-1 ${
                          isEditing
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                        title="Editar template"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span className="text-[11px]">
                          {isEditing ? 'Concluir' : 'Editar'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(tmpl.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                        title="Excluir template"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Formulário de Edição Expandido */}
                  {isEditing && (
                    <div className="mt-3.5 pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">
                          Nome do Sistema
                        </label>
                        <input
                          type="text"
                          value={tmpl.name}
                          onChange={(e) =>
                            handleUpdate(tmpl.id, { name: e.target.value })
                          }
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">
                          Categoria / Tag
                        </label>
                        <input
                          type="text"
                          value={tmpl.category}
                          onChange={(e) =>
                            handleUpdate(tmpl.id, { category: e.target.value })
                          }
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] text-slate-400 mb-1">
                          URL Padrão de Acesso
                        </label>
                        <input
                          type="text"
                          value={tmpl.defaultUrl}
                          onChange={(e) =>
                            handleUpdate(tmpl.id, { defaultUrl: e.target.value })
                          }
                          placeholder="https://sistema.empresa.com.br"
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">
                          Placeholder de Usuário
                        </label>
                        <input
                          type="text"
                          value={tmpl.placeholderUser}
                          onChange={(e) =>
                            handleUpdate(tmpl.id, {
                              placeholderUser: e.target.value,
                            })
                          }
                          placeholder="usuario@empresa.com.br"
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-blue-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">
                          Ícone Visual
                        </label>
                        <select
                          value={tmpl.iconName}
                          onChange={(e) =>
                            handleUpdate(tmpl.id, { iconName: e.target.value })
                          }
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        >
                          {AVAILABLE_ICONS.map((icon) => (
                            <option key={icon} value={icon}>
                              {icon}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] text-slate-400 mb-1">
                          Instruções / Notas Padrão
                        </label>
                        <input
                          type="text"
                          value={tmpl.defaultNotes}
                          onChange={(e) =>
                            handleUpdate(tmpl.id, {
                              defaultNotes: e.target.value,
                            })
                          }
                          placeholder="Ex: Altere a senha temporária no primeiro acesso"
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Rodapé com Ações */}
        <div className="flex items-center justify-between p-4 border-t border-slate-800 bg-slate-950/60">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restaurar Padrões
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleSaveAll}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition"
            >
              {isSavedNotice ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  Salvo!
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  Salvar Alterações
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
