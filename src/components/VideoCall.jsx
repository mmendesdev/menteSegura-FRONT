import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Video, VideoOff, Mic, MicOff, PhoneOff, Monitor, Settings, ArrowLeft, User, Clock } from 'lucide-react'
import { useAuth } from './AuthContext.jsx'

export default function VideoCall() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [callDuration, setCallDuration] = useState(0)
  const [isCallActive, setIsCallActive] = useState(false)

  // Simular duração da chamada
  useEffect(() => {
    let interval
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isCallActive])

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleEndCall = () => {
    if (confirm('Deseja realmente encerrar a chamada?')) {
      navigate('/history')
    }
  }

  const startCall = () => {
    setIsCallActive(true)
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/history')}
            className="text-white hover:bg-gray-700"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar
          </Button>
          <div>
            <h2 className="text-lg font-semibold">Consulta Online</h2>
            <p className="text-sm text-gray-400">Dra. Ana Costa - Psicóloga</p>
          </div>
        </div>
        {isCallActive && (
          <div className="flex items-center space-x-2 bg-red-600 px-4 py-2 rounded-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <Clock className="h-4 w-4" />
            <span className="font-mono">{formatDuration(callDuration)}</span>
          </div>
        )}
      </div>

      {/* Video Area */}
      <div className="flex-1 relative bg-black">
        {/* Video Principal */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isCallActive ? (
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-16 w-16 text-white" />
                </div>
                <p className="text-white text-xl font-semibold">Dra. Ana Costa</p>
                <p className="text-gray-400">Aguardando conexão...</p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <Video className="h-24 w-24 text-gray-600 mx-auto mb-4" />
              <p className="text-white text-xl mb-2">Pronto para iniciar a consulta?</p>
              <p className="text-gray-400 mb-6">Clique em "Iniciar Chamada" quando estiver pronto</p>
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700"
                onClick={startCall}
              >
                <Video className="h-5 w-5 mr-2" />
                Iniciar Chamada
              </Button>
            </div>
          )}
        </div>

        {/* Seu Vídeo (Picture-in-Picture) */}
        {isCallActive && (
          <div className="absolute bottom-24 right-6 w-64 h-48 bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-700 shadow-xl">
            <div className="w-full h-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
              {isVideoOn ? (
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <p className="text-white text-sm mt-2">{user?.name?.split(' ')[0]}</p>
                </div>
              ) : (
                <div className="text-center">
                  <VideoOff className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Câmera desligada</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      {isCallActive && (
        <div className="bg-gray-800 px-6 py-6">
          <div className="max-w-2xl mx-auto flex items-center justify-center space-x-4">
            <Button
              size="lg"
              variant={isAudioOn ? "default" : "destructive"}
              className={`rounded-full w-14 h-14 ${isAudioOn ? 'bg-gray-700 hover:bg-gray-600' : ''}`}
              onClick={() => setIsAudioOn(!isAudioOn)}
            >
              {isAudioOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
            </Button>
            
            <Button
              size="lg"
              variant={isVideoOn ? "default" : "destructive"}
              className={`rounded-full w-14 h-14 ${isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : ''}`}
              onClick={() => setIsVideoOn(!isVideoOn)}
            >
              {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
            </Button>

            <Button
              size="lg"
              variant="destructive"
              className="rounded-full w-16 h-16 bg-red-600 hover:bg-red-700"
              onClick={handleEndCall}
            >
              <PhoneOff className="h-7 w-7" />
            </Button>

            <Button
              size="lg"
              variant="default"
              className="rounded-full w-14 h-14 bg-gray-700 hover:bg-gray-600"
            >
              <Monitor className="h-6 w-6" />
            </Button>

            <Button
              size="lg"
              variant="default"
              className="rounded-full w-14 h-14 bg-gray-700 hover:bg-gray-600"
            >
              <Settings className="h-6 w-6" />
            </Button>
          </div>

          {/* Informações */}
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              Esta é uma simulação de chamada de vídeo. Em produção, seria integrado com WebRTC ou serviço de videochamada.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}