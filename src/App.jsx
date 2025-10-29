import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Heart, MessageCircle, Calendar, BookOpen, Shield, Users, LogIn, LogOut, UserCircle, Send, FileText, Video } from 'lucide-react'
import { AuthProvider, useAuth } from './components/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Chatbot from './components/Chatbot.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Appointment from './components/Appointment.jsx'
import AppointmentHistory from './components/AppointmentHistory.jsx'
import VideoCall from './components/VideoCall.jsx'
import logo from './assets/logo.png'
import './App.css'

// Componente Header
function Header() {
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src={logo} alt="Mente Segura" className="h-12 w-12" />
            <h1 className="text-2xl font-bold">Mente Segura</h1>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-6">
              <button onClick={() => navigate('/')} className="hover:text-blue-200 transition-colors">Início</button>
              <a href="#sobre" className="hover:text-blue-200 transition-colors">Sobre</a>
              <a href="#blog" className="hover:text-blue-200 transition-colors">Blog</a>
              <a href="#contato" className="hover:text-blue-200 transition-colors">Contato</a>
            </nav>
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/history')}
                  className="text-white hover:bg-white/20"
                  title="Histórico de Atendimentos"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Histórico
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open('https://t.me/MenteSeguraBot', '_blank')}
                  className="text-white hover:bg-white/20"
                  title="Acessar Bot do Telegram"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Bot Telegram
                </Button>
                <div className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-lg">
                  <UserCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">{user?.name?.split(' ')[0]}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-white hover:bg-white/20"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/login')}
                className="text-white hover:bg-white/20"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Entrar
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

// Componente Hero Section
function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Seu espaço de <span className="text-blue-600">acolhimento</span> e cuidado com a <span className="text-blue-600">saúde mental</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Oferecemos suporte psicológico especializado para profissionais da segurança pública e da saúde.
            Um ambiente seguro, confidencial e humanizado para seu bem-estar emocional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              onClick={() => navigate('/chat')}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Conversar com Assistente Virtual
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3"
              onClick={() => navigate('/appointment')}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Agendar Atendimento
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Componente Features
function Features() {
  const features = [
    {
      icon: <MessageCircle className="h-8 w-8 text-blue-600" />,
      title: "Chatbot com IA",
      description: "Assistente virtual disponível 24/7 para acolhimento inicial e orientação empática."
    },
    {
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      title: "Agendamento Online",
      description: "Agende consultas com psicólogos especializados de forma rápida e segura."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "Recursos Educativos",
      description: "Acesse artigos, vídeos e podcasts sobre saúde mental e autocuidado."
    },
    {
      icon: <Heart className="h-8 w-8 text-blue-600" />,
      title: "Diário Emocional",
      description: "Registre suas emoções e acompanhe seu progresso ao longo do tempo."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Privacidade Total",
      description: "Seus dados são protegidos com criptografia e total confidencialidade."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Comunidade Especializada",
      description: "Conecte-se com outros profissionais que enfrentam desafios similares."
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Como podemos ajudar você</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nossa plataforma oferece um conjunto completo de ferramentas para cuidar da sua saúde mental
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-blue-100">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  {feature.icon}
                  <CardTitle className="text-xl text-blue-900">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Componente Target Audience
function TargetAudience() {
  const audiences = [
    { title: "Policiais Civis e Militares", icon: "👮‍♂️" },
    { title: "Bombeiros", icon: "🚒" },
    { title: "Agentes Penitenciários", icon: "🏛️" },
    { title: "Profissionais da Saúde", icon: "👩‍⚕️" }
  ]

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-blue-900 mb-4">Quem atendemos</h3>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Nossos serviços são especialmente desenvolvidos para profissionais que dedicam suas vidas ao cuidado e proteção da sociedade
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-blue-100 bg-white">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">{audience.icon}</div>
                <h4 className="text-lg font-semibold text-blue-900">{audience.title}</h4>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Componente Sobre
function AboutSection() {
  return (
    <section id="sobre" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-blue-900 mb-6 text-center">Sobre o Mente Segura</h3>
          <div className="space-y-6 text-gray-700">
            <p className="text-lg leading-relaxed">
              O <strong className="text-blue-600">Mente Segura</strong> é uma plataforma dedicada ao cuidado da saúde mental de profissionais da segurança pública e da saúde. Reconhecemos os desafios únicos enfrentados por aqueles que dedicam suas vidas a proteger e cuidar da sociedade.
            </p>
            <p className="text-lg leading-relaxed">
              Nossa missão é oferecer um espaço seguro, confidencial e acessível, onde esses profissionais possam encontrar apoio psicológico especializado, recursos educativos e ferramentas para o autocuidado emocional.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card className="border-blue-100">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                  <p className="text-sm text-gray-600">Suporte Disponível</p>
                </CardContent>
              </Card>
              <Card className="border-blue-100">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
                  <p className="text-sm text-gray-600">Confidencial</p>
                </CardContent>
              </Card>
              <Card className="border-blue-100">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">+50</div>
                  <p className="text-sm text-gray-600">Psicólogos Especializados</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Componente Bot Telegram
function TelegramBotSection() {
  const { isAuthenticated } = useAuth()

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 p-6 rounded-full">
              <Send className="h-16 w-16" />
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-4">Bot do Telegram - Mente Segura</h3>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Acesse nosso assistente virtual diretamente pelo Telegram! Converse de forma rápida e prática,
            receba dicas de saúde mental e agende atendimentos - tudo no conforto do seu mensageiro favorito.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 p-6 rounded-lg">
              <MessageCircle className="h-8 w-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Chat Instantâneo</h4>
              <p className="text-sm text-blue-100">Converse com o assistente a qualquer hora</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <Calendar className="h-8 w-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Agendamentos</h4>
              <p className="text-sm text-blue-100">Marque consultas direto pelo bot</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <Shield className="h-8 w-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">100% Seguro</h4>
              <p className="text-sm text-blue-100">Suas conversas são privadas e criptografadas</p>
            </div>
          </div>
          {isAuthenticated ? (
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
              onClick={() => window.open('https://t.me/MenteSeguraBot', '_blank')}
            >
              <Send className="mr-2 h-5 w-5" />
              Acessar Bot no Telegram
            </Button>
          ) : (
            <div className="space-y-4">
              <p className="text-blue-100">Faça login para acessar o bot do Telegram</p>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3"
                onClick={() => window.location.href = '/login'}
              >
                <LogIn className="mr-2 h-5 w-5" />
                Fazer Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// Componente Blog
function BlogSection() {
  const blogPosts = [
    {
      title: "Como lidar com o estresse no trabalho",
      excerpt: "Descubra técnicas eficazes para gerenciar o estresse ocupacional e manter o equilíbrio emocional.",
      date: "15 de Janeiro, 2025",
      category: "Saúde Mental"
    },
    {
      title: "A importância do autocuidado para profissionais da saúde",
      excerpt: "Entenda por que cuidar de si mesmo é fundamental para continuar cuidando dos outros.",
      date: "10 de Janeiro, 2025",
      category: "Autocuidado"
    },
    {
      title: "Reconhecendo sinais de burnout",
      excerpt: "Aprenda a identificar os sintomas da síndrome de burnout e quando buscar ajuda profissional.",
      date: "5 de Janeiro, 2025",
      category: "Prevenção"
    },
    {
      title: "Técnicas de respiração para momentos de crise",
      excerpt: "Exercícios simples de respiração que podem ajudar a acalmar a mente em situações de alta pressão.",
      date: "28 de Dezembro, 2024",
      category: "Técnicas"
    },
    {
      title: "Trauma vicariante: o que é e como prevenir",
      excerpt: "Compreenda o impacto emocional de trabalhar com situações traumáticas e como se proteger.",
      date: "20 de Dezembro, 2024",
      category: "Saúde Mental"
    },
    {
      title: "A importância do sono para a saúde mental",
      excerpt: "Descubra como a qualidade do sono afeta diretamente seu bem-estar emocional e desempenho profissional.",
      date: "15 de Dezembro, 2024",
      category: "Bem-estar"
    }
  ]

  return (
    <section id="blog" className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-blue-900 mb-4">Blog - Artigos e Recursos</h3>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Conteúdo educativo sobre saúde mental, autocuidado e bem-estar para profissionais
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-blue-100 bg-white">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
                <CardTitle className="text-xl text-gray-800 hover:text-blue-600 cursor-pointer transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">
                  {post.excerpt}
                </CardDescription>
                <Button variant="link" className="text-blue-600 p-0 h-auto">
                  Ler mais →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Componente Footer
function Footer() {
  return (
    <footer id="contato" className="bg-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src={logo} alt="Mente Segura" className="h-8 w-8" />
              <h4 className="text-xl font-bold">Mente Segura</h4>
            </div>
            <p className="text-blue-100">
              Acolhimento psicológico para profissionais da segurança pública e da saúde.
            </p>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Links Úteis</h5>
            <ul className="space-y-2 text-blue-100">
              <li><a href="#sobre" className="hover:text-white transition-colors">Sobre o Projeto</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Contato</h5>
            <p className="text-blue-100 mb-2">📧 contato@mentesegura.com.br</p>
            <p className="text-blue-100 mb-2">📱 (11) 9999-9999</p>
            <p className="text-blue-100">🔒 Atendimento confidencial 24/7</p>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-100">
          <p>&copy; 2025 Mente Segura. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

// Página inicial
function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <Features />
        <TargetAudience />
        <TelegramBotSection />
        <AboutSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  )
}

// Componente principal App
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Chatbot />} />
          <Route
            path="/appointment"
            element={
              <ProtectedRoute>
                <Appointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <AppointmentHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/video-call"
            element={
              <ProtectedRoute>
                <VideoCall />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
