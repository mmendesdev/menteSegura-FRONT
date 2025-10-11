import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Calendar, Clock, User, MapPin } from 'lucide-react'

export default function Appointment() {
  const [formData, setFormData] = useState({
    psychologist: '',
    date: '',
    time: '',
    type: '',
    notes: ''
  })

  const psychologists = [
    { id: 1, name: "Dra. Maria Silva", specialization: "Trauma e PTSD" },
    { id: 2, name: "Dr. João Santos", specialization: "Ansiedade e Depressão" },
    { id: 3, name: "Dra. Ana Costa", specialization: "Burnout e Estresse" },
    { id: 4, name: "Dr. Carlos Lima", specialization: "Terapia Cognitiva" }
  ]

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui seria feita a integração com a API
    console.log('Appointment data:', formData)
    alert('Agendamento realizado com sucesso! Você receberá uma confirmação por e-mail.')
  }

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold flex items-center justify-center space-x-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              <span>Agendar Atendimento</span>
            </CardTitle>
            <CardDescription>
              Escolha um profissional e horário que melhor se adeque às suas necessidades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="psychologist">Psicólogo</Label>
                <Select onValueChange={(value) => handleChange('psychologist', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um psicólogo" />
                  </SelectTrigger>
                  <SelectContent>
                    {psychologists.map((psy) => (
                      <SelectItem key={psy.id} value={psy.id.toString()}>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <div>
                            <div className="font-medium">{psy.name}</div>
                            <div className="text-sm text-gray-500">{psy.specialization}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Horário</Label>
                  <Select onValueChange={(value) => handleChange('time', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{time}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Atendimento</Label>
                <Select onValueChange={(value) => handleChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de atendimento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="presencial">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>Presencial</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="online">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Online (Videochamada)</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações (Opcional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Descreva brevemente o que gostaria de abordar na consulta..."
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Informações Importantes:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Todos os atendimentos são confidenciais</li>
                  <li>• Você receberá uma confirmação por e-mail</li>
                  <li>• Cancelamentos devem ser feitos com 24h de antecedência</li>
                  <li>• Em caso de emergência, procure ajuda imediata</li>
                </ul>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Confirmar Agendamento
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
