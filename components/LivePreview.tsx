'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Check,
  Copy,
  ExternalLink,
  Lock,
  User,
  Calendar,
  Building,
  Headphones,
  Eye,
  EyeOff,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import { ConsultantData, SystemCredential } from '@/lib/types';
import { SystemIcon } from './SystemIcon';
import { BrandLogo } from './BrandLogo';

interface LivePreviewProps {
  consultant: ConsultantData;
  systems: SystemCredential[];
}

export function LivePreview({ consultant, systems }: LivePreviewProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [revealedPasswords, setRevealedPasswords] = useState<Record<string, boolean>>({});

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const togglePasswordReveal = (id: string) => {
    setRevealedPasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getInitials = (name: string) => {
    if (!name) return 'ON';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getAccentStyles = () => {
    switch (consultant.accentColor) {
      case 'purple':
        return {
          gradient: 'from-purple-600 via-indigo-600 to-pink-600',
          borderGlow: 'border-purple-500/30 shadow-glow-purple',
          badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
          textAccent: 'text-purple-400',
          buttonGlow: 'hover:bg-purple-600/20 text-purple-400',
        };
      case 'cyan':
        return {
          gradient: 'from-cyan-500 via-blue-600 to-indigo-600',
          borderGlow: 'border-cyan-500/30 shadow-glow-cyan',
          badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
          textAccent: 'text-cyan-400',
          buttonGlow: 'hover:bg-cyan-600/20 text-cyan-400',
        };
      case 'emerald':
        return {
          gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
          borderGlow: 'border-emerald-500/30 shadow-lg shadow-emerald-500/10',
          badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          textAccent: 'text-emerald-400',
          buttonGlow: 'hover:bg-emerald-600/20 text-emerald-400',
        };
      case 'blue':
      default:
        return {
          gradient: 'from-blue-600 via-indigo-600 to-cyan-500',
          borderGlow: 'border-blue-500/30 shadow-glow-blue',
          badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          textAccent: 'text-blue-400',
          buttonGlow: 'hover:bg-blue-600/20 text-blue-400',
        };
    }
  };

  const styles = getAccentStyles();

  return (
    <div className="relative">
      {/* Container Principal do Documento (Alvo do html2canvas) */}
      <div
        id="onboarding-live-preview-card"
        className={`w-full rounded-2xl bg-gradient-to-b from-[#0f172a] via-[#090d16] to-[#070b14] border ${styles.borderGlow} p-6 sm:p-8 text-white transition-all shadow-card-dark relative overflow-hidden`}
        style={{ minHeight: '680px' }}
      >
        {/* Marca d'água de Fundo sutil */}
        <div data-html2canvas-ignore="true" className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div data-html2canvas-ignore="true" className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-cyan-500/5 to-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* 1. Header do Documento VIP */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800/80 gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <BrandLogo size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                  {consultant.companyName?.trim() || 'Riograndense Distribuidora'}
                </span>
              </div>
              <h2 className="text-xl font-extrabold tracking-tight text-white">
                Credenciais de Acesso
              </h2>
            </div>
          </div>

          <div className="flex flex-col sm:items-end text-xs text-slate-400">
            <div className="flex items-center gap-1.5 font-medium text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Emissão: {consultant.startDate || 'Data do Onboarding'}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Credenciais Provisórias Ativas
            </div>
          </div>
        </div>

        {/* 2. Cartão de Identificação do Consultor */}
        <div className="my-6 p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Avatar com Iniciais */}
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${styles.gradient} flex items-center justify-center font-bold text-lg text-white shadow-md shrink-0`}
            >
              {getInitials(consultant.name)}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-white tracking-tight truncate">
                {consultant.name || 'Nome do Consultor'}
              </h3>
              <p className="text-xs font-medium text-slate-300">
                {consultant.role?.trim() || 'Consultor de vendas'}{' '}
                {consultant.department && `• ${consultant.department}`}
              </p>
              {consultant.welcomeMessage && (
                <p className="text-xs text-slate-400 mt-1.5 italic bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
                  "{consultant.welcomeMessage}"
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 3. Bento Grid dos Sistemas Liberados */}
        <div className="space-y-3 relative z-10">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Sistemas e Plataformas Autorizadas ({systems.length})
            </h4>
            <span className="text-[11px] text-slate-500">
              Clique em copiar para transferir credenciais
            </span>
          </div>

          {systems.length === 0 ? (
            <div className="p-8 text-center rounded-xl border border-dashed border-slate-800 text-xs text-slate-500">
              Nenhum sistema atribuído ainda.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {systems.map((sys) => {
                const isPasswordHidden =
                  consultant.hidePasswordsInPreview && !revealedPasswords[sys.id];
                const displayedPassword = isPasswordHidden
                  ? '••••••••••••'
                  : sys.password;

                const userCopyKey = `user-${sys.id}`;
                const passCopyKey = `pass-${sys.id}`;

                return (
                  <div
                    key={sys.id}
                    className="p-4 rounded-xl bg-slate-900/60 hover:bg-slate-900/80 border border-slate-800/90 transition-all flex flex-col justify-between group"
                  >
                    {/* Topo do Card de Sistema */}
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="p-2 rounded-lg bg-slate-800 text-slate-300 group-hover:text-blue-400 transition shrink-0">
                            <SystemIcon name={sys.iconName} className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <h5 className="text-sm font-bold text-white leading-normal py-0.5">
                              {sys.name}
                            </h5>
                            {sys.category && (
                              <span className="text-[10px] uppercase font-semibold text-slate-400">
                                {sys.category}
                              </span>
                            )}
                          </div>
                        </div>

                        {sys.url && (
                          <a
                            href={
                              sys.url.startsWith('http')
                                ? sys.url
                                : `https://${sys.url}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-md text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition shrink-0"
                            title="Acessar link do sistema"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      {/* Linha de Usuário */}
                      <div className="space-y-2 mb-2.5">
                        <div className="flex items-center justify-between text-xs bg-slate-950/70 px-2.5 py-2 rounded-lg border border-slate-800/80">
                          <div className="flex items-center gap-2 text-slate-400 mr-2 flex-1 min-w-0">
                            <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span className="text-[11px] text-slate-500 shrink-0">Usuário:</span>
                            <span className="text-slate-200 font-mono text-xs leading-normal py-0.5 break-all">
                              {sys.username || '—'}
                            </span>
                          </div>
                          {sys.username && (
                            <button
                              type="button"
                              onClick={() => handleCopy(sys.username, userCopyKey)}
                              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition shrink-0"
                              title="Copiar Usuário"
                            >
                              {copiedId === userCopyKey ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          )}
                        </div>

                        {/* Linha de Senha */}
                        <div className="flex items-center justify-between text-xs bg-slate-950/70 px-2.5 py-2 rounded-lg border border-slate-800/80">
                          <div className="flex items-center gap-2 text-slate-400 mr-2 flex-1 min-w-0">
                            <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span className="text-[11px] text-slate-500 shrink-0">Senha:</span>
                            <span className="text-slate-200 font-mono text-xs leading-normal py-0.5 tracking-wider break-all">
                              {displayedPassword || '—'}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {consultant.hidePasswordsInPreview && (
                              <button
                                type="button"
                                onClick={() => togglePasswordReveal(sys.id)}
                                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
                                title={
                                  revealedPasswords[sys.id]
                                    ? 'Ocultar Senha'
                                    : 'Revelar Senha'
                                }
                              >
                                {revealedPasswords[sys.id] ? (
                                  <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                                ) : (
                                  <Eye className="w-3.5 h-3.5" />
                                )}
                              </button>
                            )}
                            {sys.password && (
                              <button
                                type="button"
                                onClick={() => handleCopy(sys.password, passCopyKey)}
                                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
                                title="Copiar Senha"
                              >
                                {copiedId === passCopyKey ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Notas do Sistema */}
                    {sys.notes && (
                      <p className="text-[10px] text-slate-400 bg-slate-950/40 p-1.5 rounded border border-slate-800/40">
                        📌 {sys.notes}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 4. Rodapé e Instruções de Segurança */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-3 relative z-10">
          {consultant.confidentialityNotice && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90 text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-300">
                  Aviso de Segurança & Confidencialidade:
                </span>{' '}
                Estas credenciais são de uso pessoal, confidencial e intransferível.
                Recomendamos a alteração de todas as senhas temporárias no primeiro
                acesso e ativação de verificação em duas etapas (2FA) quando disponível.
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <div className="flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5 text-slate-400" />
              <span>
                Suporte TI: {consultant.contactSupport?.trim() || 'suporte.ti@riograndense.com.br | Ramal 4022'}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-500">
              <span>Documento ID:</span>
              <span className="font-mono text-slate-400">
                ONB-{Date.now().toString(36).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
