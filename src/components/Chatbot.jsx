import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { MessageCircle, Send, Mic, MicOff, Bot, User } from 'lucide-react'

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Olá! Eu sou o assistente virtual do Mente Segura. Estou aqui para oferecer acolhimento e apoio. Como você está se sentindo hoje?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

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

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simular resposta do bot (aqui seria integrada a API real)
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userInput) => {
    const responses = [
      "Entendo como você se sente. É importante reconhecer essas emoções. Gostaria de conversar mais sobre isso?",
      "Obrigado por compartilhar isso comigo. Lembre-se de que buscar ajuda é um sinal de força, não de fraqueza.",
      "Suas emoções são válidas. Como profissional da segurança/saúde, você enfrenta desafios únicos. Estou aqui para apoiá-lo.",
      "É normal sentir-se assim às vezes. Que tal tentarmos algumas técnicas de respiração ou relaxamento?",
      "Percebo que você está passando por um momento difícil. Gostaria que eu te conectasse com um de nossos psicólogos especializados?"
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="h-[80vh] flex flex-col">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-6 w-6" />
              <span>Assistente Virtual - Mente Segura</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === 'bot' && (
                          <Bot className="h-5 w-5 mt-0.5 text-blue-600" />
                        )}
                        {message.sender === 'user' && (
                          <User className="h-5 w-5 mt-0.5 text-white" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[70%]">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-5 w-5 text-blue-600" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleVoiceInput}
                  variant="outline"
                  size="icon"
                  className={isListening ? 'bg-red-100 border-red-300' : ''}
                >
                  {isListening ? (
                    <MicOff className="h-4 w-4 text-red-600" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Este é um espaço seguro e confidencial. Se precisar de ajuda imediata, procure um profissional.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
