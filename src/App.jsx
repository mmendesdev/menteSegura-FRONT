import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Heart, MessageCircle, Calendar, BookOpen, Shield, Users } from 'lucide-react'
import './App.css'

// Componente Header
function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-green-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Mente Segura</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#inicio" className="hover:text-blue-200 transition-colors">Início</a>
            <a href="#sobre" className="hover:text-blue-200 transition-colors">Sobre</a>
            <a href="#blog" className="hover:text-blue-200 transition-colors">Blog</a>
            <a href="#contato" className="hover:text-blue-200 transition-colors">Contato</a>
          </nav>
        </div>
      </div>
    </header>
  )
}

// Componente Hero Section
function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Seu espaço de <span className="text-blue-600">acolhimento</span> e cuidado com a <span className="text-green-600">saúde mental</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Oferecemos suporte psicológico especializado para profissionais da segurança pública e da saúde. 
            Um ambiente seguro, confidencial e humanizado para seu bem-estar emocional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              <MessageCircle className="mr-2 h-5 w-5" />
              Conversar com Assistente Virtual
            </Button>
            <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3">
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
      icon: <Calendar className="h-8 w-8 text-green-600" />,
      title: "Agendamento Online",
      description: "Agende consultas com psicólogos especializados de forma rápida e segura."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-purple-600" />,
      title: "Recursos Educativos",
      description: "Acesse artigos, vídeos e podcasts sobre saúde mental e autocuidado."
    },
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: "Diário Emocional",
      description: "Registre suas emoções e acompanhe seu progresso ao longo do tempo."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-800" />,
      title: "Privacidade Total",
      description: "Seus dados são protegidos com criptografia e total confidencialidade."
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
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
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  {feature.icon}
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Quem atendemos</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nossos serviços são especialmente desenvolvidos para profissionais que dedicam suas vidas ao cuidado e proteção da sociedade
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">{audience.icon}</div>
                <h4 className="text-lg font-semibold text-gray-800">{audience.title}</h4>
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
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6" />
              <h4 className="text-xl font-bold">Mente Segura</h4>
            </div>
            <p className="text-gray-300">
              Acolhimento psicológico para profissionais da segurança pública e da saúde.
            </p>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Links Úteis</h5>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Sobre o Projeto</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Depoimentos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Contato</h5>
            <p className="text-gray-300 mb-2">📧 contato@mentesegura.com.br</p>
            <p className="text-gray-300 mb-2">📱 (11) 9999-9999</p>
            <p className="text-gray-300">🔒 Atendimento confidencial 24/7</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2025 Mente Segura. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

// Componente principal App
function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <Features />
          <TargetAudience />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
