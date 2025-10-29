import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Calendar, Clock, User, Video, MapPin, ArrowLeft, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { useAuth } from './AuthContext.jsx'

export default function AppointmentHistory() {
  const navigate = useNavigate()
  const { user } = useAuth()

  // Dados simulados de histórico
  const appointments = [
    {
      id: 1,
      date: '2025-01-15',
      time: '14:00',
      psychologist: 'Dra. Maria Silva',
      type: 'online',
      status: 'completed',
      notes: 'Consulta realizada com sucesso'
    },
    {
      id: 2,
      date: '2025-01-08',
      time: '10:00',
      psychologist: 'Dr. João Santos',
      type: 'presencial',
      status: 'completed',
      notes: 'Primeira consulta - avaliação inicial'
    },
    {
      id: 3,
      date: '2025-01-22',
      time: '15:30',
      psychologist: 'Dra. Ana Costa',
      type: 'online',
      status: 'scheduled',
      notes: 'Agendado'
    },
    {
      id: 4,
      date: '2024-12-20',
      time: '09:00',
      psychologist: 'Dr. Carlos Lima',
      type: 'presencial',
      status: 'cancelled',
      notes: 'Cancelado pelo paciente'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5" />
      case 'scheduled':
        return <AlertCircle className="h-5 w-5" />
      case 'cancelled':
        return <XCircle className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Realizado'
      case 'scheduled':
        return 'Agendado'
      case 'cancelled':
        return 'Cancelado'
      default:
        return 'Pendente'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900 flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <span>Histórico de Atendimentos</span>
              </h1>
              <p className="text-gray-600 mt-2">
                Acompanhe suas consultas realizadas e agendadas
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar
            </Button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Consultas</p>
                  <p className="text-3xl font-bold text-blue-600">{appointments.length}</p>
                </div>
                <Calendar className="h-12 w-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Realizadas</p>
                  <p className="text-3xl font-bold text-green-600">
                    {appointments.filter(a => a.status === 'completed').length}
                  </p>
                </div>
                <CheckCircle className="h-12 w-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Agendadas</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {appointments.filter(a => a.status === 'scheduled').length}
                  </p>
                </div>
                <AlertCircle className="h-12 w-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Atendimentos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-blue-900">Suas Consultas</CardTitle>
            <CardDescription>
              Histórico completo de atendimentos psicológicos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center space-x-1 ${getStatusColor(appointment.status)}`}>
                          {getStatusIcon(appointment.status)}
                          <span>{getStatusText(appointment.status)}</span>
                        </span>
                        {appointment.type === 'online' ? (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200 flex items-center space-x-1">
                            <Video className="h-3 w-3" />
                            <span>Online</span>
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-200 flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>Presencial</span>
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2 text-gray-700">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium">{formatDate(appointment.date)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-700">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-700">
                          <User className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">{appointment.psychologist}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{appointment.notes}</p>
                    </div>
                    {appointment.status === 'scheduled' && appointment.type === 'online' && (
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => navigate('/video-call')}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Iniciar Chamada
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="mt-6 flex justify-center">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate('/appointment')}
          >
            <Calendar className="h-5 w-5 mr-2" />
            Agendar Nova Consulta
          </Button>
        </div>
      </div>
    </div>
  )
}