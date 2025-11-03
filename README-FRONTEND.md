# Mente Segura - Frontend (React)

## 🚀 **Visão Geral**

Interface moderna e responsiva da plataforma Mente Segura, desenvolvida em React com foco na experiência do usuário e acessibilidade.

## 🛠️ **Tecnologias**

- **React 18** - Biblioteca principal
- **Vite** - Build tool moderna
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **Lucide Icons** - Ícones
- **Recharts** - Gráficos
- **React Router** - Navegação

## 📋 **Pré-requisitos**

- Node.js 18+
- pnpm (recomendado) ou npm

## ⚡ **Instalação Rápida**

### 1. **Instalar dependências:**

```bash
pnpm install
# ou
npm install
```

### 2. **Configurar variáveis de ambiente:**

```bash
cp .env.example .env
# Edite com a URL da sua API
```

### 3. **Executar em desenvolvimento:**

```bash
pnpm run dev
# ou
npm run dev
```

### AI Chat (proxy local)

Para permitir que usuários conversem com a IA sem expor a chave no cliente, há um proxy Express em `server/` que expõe `/api/chat`.

Passos rápidos:

1. Instale dependências do servidor:

```fish
cd server
npm install
```

2. Copie `.env.example` para `.env` e configure `OPENAI_API_KEY` com sua chave OpenAI.

3. Inicie o servidor:

```fish
npm start
```

4. Execute o frontend (na raiz do frontend):

```fish
pnpm dev
```

O Vite está configurado para encaminhar chamadas a `/api` para `http://localhost:5174` durante o desenvolvimento.

### 4. **Build para produção:**

```bash
pnpm run build
# ou
npm run build
```

## 🔧 **Configuração do .env**

```env
VITE_API_URL=http://localhost:5000
```

## 🎨 **Componentes Principais**

| Componente | Descrição |
|------------|-----------|
| **App.jsx** | Componente principal e roteamento |
| **Login.jsx** | Tela de autenticação |
| **Chatbot.jsx** | Interface do chatbot com IA |
| **Appointment.jsx** | Sistema de agendamentos |
| **AdminDashboard.jsx** | Painel administrativo |
| **Blog.jsx** | Blog educacional |

## 🎯 **Funcionalidades**

### ✅ **Implementadas:**

- Interface responsiva e moderna
- Chatbot com reconhecimento de voz
- Sistema de agendamento intuitivo
- Dashboard com gráficos e métricas
- Blog com filtros e categorias
- Design acolhedor (azul, verde, branco)

### 🔄 **Para implementar:**

- Sistema de rotas completo
- Autenticação integrada
- Estado global (Context/Redux)
- Testes automatizados

## 🛣️ **Configurar Rotas**

Adicione ao `App.jsx`:

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Chatbot from './components/Chatbot'
import Appointment from './components/Appointment'
import AdminDashboard from './components/AdminDashboard'
import Blog from './components/Blog'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/agendamento" element={<Appointment />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  )
}
```

## 🎨 **Personalização**

### **Cores do tema:**

- **Primária:** Azul (#3b82f6)
- **Secundária:** Verde (#10b981)
- **Acolhimento:** Tons suaves e gradientes

### **Componentes UI:**

Todos os componentes shadcn/ui estão disponíveis em `/src/components/ui/`

## 📱 **Responsividade**

- **Mobile First:** Design otimizado para dispositivos móveis
- **Breakpoints:** sm, md, lg, xl configurados
- **Touch Friendly:** Botões e interações otimizadas

## 🔊 **Recursos de Acessibilidade**

- Reconhecimento de voz no chatbot
- Navegação por teclado
- Contraste adequado
- Textos alternativos

## 🐳 **Docker**

```bash
docker build -t mente-segura-frontend .
docker run -p 3000:3000 mente-segura-frontend
```

## 🚀 **Deploy**

### **Vercel (Recomendado):**

```bash
npm i -g vercel
vercel
```

### **Netlify:**

```bash
npm run build
# Upload da pasta dist/
```

### **AWS S3 + CloudFront:**

```bash
npm run build
aws s3 sync dist/ s3://seu-bucket
```

## 📊 **Scripts Disponíveis**

```bash
pnpm run dev      # Desenvolvimento
pnpm run build    # Build produção
pnpm run preview  # Preview do build
pnpm run lint     # Linting
```

## 🎯 **URLs de Acesso**

- **Desenvolvimento:** `http://localhost:3000`
- **Home:** Página inicial com hero section
- **Chatbot:** Interface de conversação
- **Admin:** Dashboard administrativo
- **Blog:** Recursos educacionais

## 📞 **Suporte**

- Componentes documentados
- Storybook (opcional)
- Hot reload em desenvolvimento
- Source maps para debug

**Frontend rodando em:** `http://localhost:3000`
