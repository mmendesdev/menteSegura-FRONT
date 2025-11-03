import { useState, useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { MessageCircle, Send, Mic, MicOff, Bot, User, ArrowLeft, Plus, Menu, Trash2, Edit3, UserPlus, LogIn } from 'lucide-react'
import { useAuth } from './AuthContext.jsx'

export default function Chatbot() {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: 'Nova conversa',
      date: new Date(),
      messages: [
        {
          id: 1,
          text: "Olá! Eu sou o assistente virtual do Mente Segura. Estou aqui para oferecer acolhimento e apoio. Como você está se sentindo hoje?",
          sender: 'bot',
          timestamp: new Date()
        }
      ]
    }
  ])
  const [currentConversationId, setCurrentConversationId] = useState(1)
  const [inputMessage, setInputMessage] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const messagesEndRef = useRef(null)

  const currentConversation = conversations.find(c => c.id === currentConversationId)
  const messages = useMemo(() => currentConversation?.messages || [], [currentConversation])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    // Atualizar conversa atual
    setConversations(prev => prev.map(conv => {
      if (conv.id === currentConversationId) {
        const newMessages = [...conv.messages, userMessage]
        return {
          ...conv,
          messages: newMessages,
          title: conv.messages.length === 1 ? inputMessage.slice(0, 30) + '...' : conv.title
        }
      }
      return conv
    }))

    setInputMessage('')
    setIsTyping(true)

    // Enviar para o proxy backend que chamará a API de IA (não exponha a chave no cliente)
    try {
      // Enviamos o histórico para contexto (sender: 'user' | 'bot')
      const history = messages.map(m => ({ sender: m.sender, text: m.text, timestamp: m.timestamp }))

      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage, history })
      })

      if (!resp.ok) {
        throw new Error('Erro no servidor de IA')
      }

      const data = await resp.json()
      const botText = data.reply || 'Desculpe, não consegui gerar uma resposta.'

      const botResponse = {
        id: Date.now(),
        text: botText,
        sender: 'bot',
        timestamp: new Date()
      }

      setConversations(prev => prev.map(conv => {
        if (conv.id === currentConversationId) {
          return {
            ...conv,
            messages: [...conv.messages, botResponse]
          }
        }
        return conv
      }))
    } catch (err) {
      console.error('Chat error', err)
      const botResponse = {
        id: Date.now(),
        text: 'Desculpe, ocorreu um erro ao conectar com a nossa IA. Tente novamente mais tarde.',
        sender: 'bot',
        timestamp: new Date()
      }

      setConversations(prev => prev.map(conv => {
        if (conv.id === currentConversationId) {
          return {
            ...conv,
            messages: [...conv.messages, botResponse]
          }
        }
        return conv
      }))
    } finally {
      setIsTyping(false)
    }
  }

  // A resposta agora vem do backend (/api/chat). A função de exemplo foi removida.

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition()
      recognition.lang = 'pt-BR'
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInputMessage(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } else {
      alert('Reconhecimento de voz não suportado neste navegador.')
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const createNewConversation = () => {
    const newConv = {
      id: Date.now(),
      title: 'Nova conversa',
      date: new Date(),
      messages: [
        {
          id: 1,
          text: "Olá! Eu sou o assistente virtual do Mente Segura. Estou aqui para oferecer acolhimento e apoio. Como você está se sentindo hoje?",
          sender: 'bot',
          timestamp: new Date()
        }
      ]
    }
    setConversations(prev => [newConv, ...prev])
    setCurrentConversationId(newConv.id)
  }

  const deleteConversation = (id) => {
    if (conversations.length === 1) return
    setConversations(prev => prev.filter(c => c.id !== id))
    if (currentConversationId === id) {
      setCurrentConversationId(conversations[0].id)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-gray-900 text-white transition-all duration-300 overflow-hidden flex flex-col`}>
        <div className="p-4 border-b border-gray-700">
          <Button
            onClick={createNewConversation}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Conversa
          </Button>
        </div>
        <ScrollArea className="flex-1 p-2">
          <div className="space-y-2">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setCurrentConversationId(conv.id)}
                className={`p-3 rounded-lg cursor-pointer group hover:bg-gray-800 transition-colors ${currentConversationId === conv.id ? 'bg-gray-800' : 'bg-gray-900'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{conv.title}</p>
                    <p className="text-xs text-gray-400">
                      {conv.date.toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteConversation(conv.id)
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 text-gray-400 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-gray-700">
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-gray-400">Online</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Visitante</p>
                  <p className="text-xs text-gray-400">Modo anônimo</p>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full bg-blue-600 hover:bg-blue-700 text-xs"
                onClick={() => navigate('/register')}
              >
                <UserPlus className="h-3 w-3 mr-1" />
                Criar Conta
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Assistente Virtual</h2>
                <p className="text-xs text-gray-500">Mente Segura</p>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-gray-600"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar
          </Button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="max-w-4xl mx-auto px-6 py-8">
              {/* Banner para usuários não logados */}
              {!isAuthenticated && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <UserPlus className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-900 mb-1">Crie sua conta gratuitamente!</h3>
                      <p className="text-sm text-blue-800 mb-3">
                        Ao criar uma conta, você terá acesso a recursos exclusivos como agendamento de consultas,
                        histórico de atendimentos e chamadas de vídeo com psicólogos especializados.
                      </p>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => navigate('/register')}
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Criar Conta Grátis
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-300 text-blue-600"
                          onClick={() => navigate('/login')}
                        >
                          <LogIn className="h-4 w-4 mr-2" />
                          Já tenho conta
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-4 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-200'
                      }`}>
                      {message.sender === 'bot' ? (
                        <Bot className="h-6 w-6 text-gray-700" />
                      ) : (
                        <User className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-gray-900">
                          {message.sender === 'bot' ? 'Assistente' : (isAuthenticated ? user?.name?.split(' ')[0] : 'Você')}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <div className="text-gray-800 leading-relaxed">
                        {message.text}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-6 w-6 text-gray-700" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <span className="text-sm font-semibold text-gray-900">Assistente</span>
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 bg-gray-100 rounded-xl p-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                onClick={handleVoiceInput}
                variant="ghost"
                size="icon"
                className={`rounded-lg ${isListening ? 'bg-red-100 text-red-600' : 'text-gray-600'}`}
              >
                {isListening ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </Button>
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="bg-blue-600 hover:bg-blue-700 rounded-lg"
                disabled={!inputMessage.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
