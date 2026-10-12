'use client';

import React from 'react';
import {
  Mail,
  MessageSquare,
  TrendingUp,
  PhoneCall,
  GitBranch,
  BookOpen,
  ShieldCheck,
  Layers,
  Globe,
  KeyRound,
  Server,
  Database,
  Lock,
  Cpu,
  Terminal,
} from 'lucide-react';

interface SystemIconProps {
  name?: string;
  className?: string;
}

export function SystemIcon({ name, className = 'w-5 h-5' }: SystemIconProps) {
  switch (name) {
    case 'Mail':
      return <Mail className={className} />;
    case 'MessageSquare':
      return <MessageSquare className={className} />;
    case 'TrendingUp':
      return <TrendingUp className={className} />;
    case 'PhoneCall':
      return <PhoneCall className={className} />;
    case 'GitBranch':
      return <GitBranch className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'Database':
      return <Database className={className} />;
    case 'Lock':
      return <Lock className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    case 'Terminal':
      return <Terminal className={className} />;
    case 'Server':
      return <Server className={className} />;
    case 'Globe':
    default:
      return <Globe className={className} />;
  }
}
