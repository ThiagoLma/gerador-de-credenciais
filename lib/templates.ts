import { ConsultantData, QuickTemplate, SystemCredential } from './types';

export const QUICK_TEMPLATES: QuickTemplate[] = [
  {
    id: 'email',
    name: 'E-mail Corporativo',
    category: 'Comunicação',
    defaultUrl: 'https://mail.google.com',
    iconName: 'Mail',
    defaultNotes: 'Altere a senha provisória no primeiro login.',
    placeholderUser: 'nome.sobrenome@empresa.com.br',
  },
  {
    id: 'crm',
    name: 'CRM de Vendas',
    category: 'Comercial',
    defaultUrl: 'https://crm.empresa.com.br',
    iconName: 'TrendingUp',
    defaultNotes: 'Acesso liberado com perfil de Consultor.',
    placeholderUser: 'usuario.crm@empresa.com.br',
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Comunicação',
    defaultUrl: 'https://empresa.slack.com',
    iconName: 'MessageSquare',
    defaultNotes: 'Entrar nos canais #geral e #onboarding.',
    placeholderUser: 'nome.sobrenome@empresa.com.br',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business / Web',
    category: 'Atendimento',
    defaultUrl: 'https://web.whatsapp.com',
    iconName: 'PhoneCall',
    defaultNotes: 'Conectar dispositivo corporativo autorizado.',
    placeholderUser: '+55 11 98765-4321',
  },
  {
    id: 'github',
    name: 'GitHub / GitLab',
    category: 'Desenvolvimento',
    defaultUrl: 'https://github.com/org-empresa',
    iconName: 'GitBranch',
    defaultNotes: 'Ativação de 2FA obrigatória no primeiro acesso.',
    placeholderUser: 'dev.consultor',
  },
  {
    id: 'notion',
    name: 'Notion / Wiki',
    category: 'Conhecimento',
    defaultUrl: 'https://notion.so/empresa-wiki',
    iconName: 'BookOpen',
    defaultNotes: 'Consulte o manual de conduta e documentações.',
    placeholderUser: 'consultor@empresa.com.br',
  },
  {
    id: 'vpn',
    name: 'VPN Corporativa',
    category: 'Segurança',
    defaultUrl: 'https://vpn.empresa.com.br',
    iconName: 'ShieldCheck',
    defaultNotes: 'Conectar antes de acessar sistemas internos.',
    placeholderUser: 'vpn.consultor',
  },
  {
    id: 'erp',
    name: 'ERP / Gestão',
    category: 'Operações',
    defaultUrl: 'https://erp.empresa.com.br',
    iconName: 'Layers',
    defaultNotes: 'Módulos financeiro e projetos habilitados.',
    placeholderUser: 'erp.user',
  },
];

export function generateSecurePassword(length: number = 12): string {
  const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lowercase = 'abcdefghijkmnopqrstuvwxyz';
  const numbers = '23456789';
  const symbols = '!@#$%&*';

  const allChars = uppercase + lowercase + numbers + symbols;
  let password = '';

  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  return password.split('').sort(() => 0.5 - Math.random()).join('');
}

export const INITIAL_CONSULTANT_DATA: ConsultantData = {
  name: 'Alexandre Silveira',
  role: 'Consultor de vendas',
  department: 'Comercial & Vendas',
  companyName: 'Riograndense Distribuidora',
  startDate: new Date().toLocaleDateString('pt-BR'),
  welcomeMessage:
    'Seja muito bem-vindo ao time! Este documento contém suas credenciais provisórias para os principais sistemas de trabalho.',
  contactSupport: 'suporte.ti@riograndense.com.br | Ramal 4022',
  confidentialityNotice: true,
  accentColor: 'blue',
  hidePasswordsInPreview: false,
};

export const INITIAL_SYSTEMS: SystemCredential[] = [
  {
    id: 'sys-1',
    name: 'E-mail Corporativo',
    category: 'Comunicação',
    url: 'https://mail.google.com',
    username: 'alexandre.silveira@riograndense.com.br',
    password: generateSecurePassword(12),
    notes: 'Altere a senha provisória e ative o 2FA no primeiro login.',
    iconName: 'Mail',
  },
  {
    id: 'sys-2',
    name: 'WhatsApp Business',
    category: 'Atendimento',
    url: 'https://web.whatsapp.com',
    username: '+55 84 98765-4321',
    password: generateSecurePassword(12),
    notes: 'Acesso corporativo de comunicação de vendas.',
    iconName: 'PhoneCall',
  },
  {
    id: 'sys-3',
    name: 'CRM de Vendas',
    category: 'Comercial',
    url: 'https://crm.riograndense.com.br',
    username: 'alexandre.vendas',
    password: generateSecurePassword(12),
    notes: 'Perfil de Consultoria Comercial e Propostas habilitado.',
    iconName: 'TrendingUp',
  },
  {
    id: 'sys-4',
    name: 'ERP / Faturamento',
    category: 'Operações',
    url: 'https://erp.riograndense.com.br',
    username: 'alexandre.silveira',
    password: generateSecurePassword(14),
    notes: 'Módulo de pedidos e consulta de clientes habilitado.',
    iconName: 'Layers',
  },
];
