# Sistema de Onboarding e Gerador de Credenciais de Acesso

Aplicação web moderna, minimalista e segura desenvolvida para gerar cartões e documentos de boas-vindas personalizados para novos consultores e colaboradores. Permite configurar acessos a múltiplos sistemas, preencher credenciais provisórias e exportar o resultado diretamente em **PDF de alta fidelidade** ou **Imagem PNG**.

---

## 🚀 Tecnologias Utilizadas

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React 18, TypeScript)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) com paleta profunda *Zinc & Slate* e acentos elétricos
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Exportação Client-Side**: [html2canvas](https://html2canvas.hertzen.com/) e [jsPDF](https://github.com/parallax/jsPDF)
- **Containerização**: Docker Multi-stage otimizado com `output: 'standalone'` (< 150MB)
- **Automação & Testes**: Servidores MCP de Puppeteer e Playwright configurados em `.agents/plugins/browser-automation/`

---

## ✨ Funcionalidades Principais

1. **Painel de Edição Completo**:
   - Dados do consultor: Nome, Cargo, Departamento, Empresa, Data e Mensagem personalizada.
   - Informações de suporte técnico e helpdesk.
   - Seletor de paleta de destaque visual: *Azul Elétrico*, *Roxo Cibernético*, *Ciano Futurista* e *Esmeralda Neon*.
   - Toggle para ocultar senhas com asteriscos (`••••••••`) no Live Preview.

2. **Templates Rápidos (1-Clique)**:
   - Botões pré-configurados para **E-mail Corporativo**, **CRM de Vendas**, **Slack**, **WhatsApp Business**, **GitHub**, **Notion**, **VPN Corporativa** e **ERP**.
   - Ao clicar, o sistema é adicionado instantaneamente com URL padrão, ícone correspondente e uma **senha forte gerada aleatoriamente**.

3. **Gerador Dinâmico de Sistemas**:
   - Adicionar, duplicar ou remover sistemas a qualquer momento.
   - Gerador de senhas seguras integrado (ícone 🎲 para sortear nova senha forte).
   - Botão para testar o link do sistema diretamente no navegador.

4. **Live Preview VIP (Dark Mode Nativo)**:
   - Layout em estilo **Bento Grid** com visual SaaS Enterprise.
   - Botão individual de **copiar usuário** e **copiar senha** com feedback em tempo real (*"Copiado!"*).
   - Botão de revelar senha individual no cartão de preview.
   - Termo de confidencialidade e segurança da informação integrado.

5. **Exportação Fiel em Alta Resolução**:
   - **Exportar PDF**: Renderiza o Live Preview mantendo a estética escura nativa, ajustado para proporções A4 sem distorções.
   - **Exportar Imagem PNG**: Exporta uma imagem de alta nitidez pronta para envio rápido via WhatsApp ou Slack.

6. **100% Client-Side e Seguro**:
   - Nenhuma senha ou dado de acesso é enviado para bancos de dados ou servidores externos. Todo o processamento e geração de arquivos ocorrem diretamente no navegador do usuário.

---

## 🛠️ Como Executar Localmente

### Pré-requisitos
- Node.js 18+ ou 20+
- npm ou yarn

### 1. Instalar as dependências:
```bash
npm install
```

### 2. Iniciar o servidor de desenvolvimento:
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 🐳 Executando com Docker

O projeto já conta com um `Dockerfile` multi-stage com compilação `output: 'standalone'`. A imagem resultante tem menos de 150MB e roda com usuário não-root por segurança.

### 1. Construir a imagem Docker:
```bash
docker build -t gerador-credenciais .
```

### 2. Rodar o container:
```bash
docker run -d -p 3000:3000 --name app-credenciais gerador-credenciais
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## 🤖 Servidores MCP (Model Context Protocol)

O projeto possui integração com os seguintes servidores MCP no diretório `.agents/plugins/browser-automation/`:

- **Puppeteer MCP**: Execução de scripts headless e capturas visuais.
- **Playwright MCP**: Automação multi-navegador e validação de interface.
- **GitHub MCP**: Versionamento e gerenciamento de repositório diretamente no assistente.
