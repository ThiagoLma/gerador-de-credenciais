'use client';

import React from 'react';
import { Plus, Zap, SlidersHorizontal } from 'lucide-react';
import { QuickTemplate } from '@/lib/types';
import { SystemIcon } from './SystemIcon';

interface QuickTemplatesBarProps {
  templates: QuickTemplate[];
  onSelectTemplate: (template: QuickTemplate) => void;
  onOpenManager: () => void;
}

export function QuickTemplatesBar({
  templates,
  onSelectTemplate,
  onOpenManager,
}: QuickTemplatesBarProps) {
  return (
    <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-semibold tracking-wide uppercase text-slate-300">
            Templates Rápidos (1-Clique)
          </h3>
        </div>

        <button
          type="button"
          onClick={onOpenManager}
          className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg border border-slate-700/80 transition"
          title="Editar ou adicionar novos templates de sistemas"
        >
          <SlidersHorizontal className="w-3 h-3 text-blue-400" />
          <span>Editar Templates</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {templates.map((tmpl) => (
          <button
            key={tmpl.id}
            type="button"
            onClick={() => onSelectTemplate(tmpl)}
            className="group flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 transition text-left active:scale-[0.98]"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="p-1.5 rounded-md bg-slate-800 group-hover:bg-blue-600/20 text-slate-400 group-hover:text-blue-400 transition shrink-0">
                <SystemIcon name={tmpl.iconName} className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-300 group-hover:text-white truncate">
                  {tmpl.name}
                </p>
                <p className="text-[10px] text-slate-500 truncate">
                  {tmpl.category}
                </p>
              </div>
            </div>
            <Plus className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 shrink-0 transition" />
          </button>
        ))}
      </div>
    </div>
  );
}
