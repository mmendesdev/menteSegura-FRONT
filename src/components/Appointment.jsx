import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Calendar, Clock, User, MapPin, Video, ArrowLeft, Star, Phone, AlertCircle, Heart, Shield, Navigation } from 'lucide-react'

export default function Appointment() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    psychologist: '',
    date: '',
    time: '',
    type: '',
    notes: '',
    state: '',
    city: ''
  })
  const [selectedPsychologist, setSelectedPsychologist] = useState(null)
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [nearestClinics, setNearestClinics] = useState([])
  const [cep, setCep] = useState('')
  const [loadingCep, setLoadingCep] = useState(false)
  const [addressData, setAddressData] = useState({
    street: '',
    neighborhood: '',
    city: '',
    state: ''
  })

  const brazilianStates = [
    { code: 'SP', name: 'São Paulo' },
    { code: 'RJ', name: 'Rio de Janeiro' },
    { code: 'MG', name: 'Minas Gerais' },
    { code: 'BA', name: 'Bahia' },
    { code: 'PR', name: 'Paraná' },
    { code: 'RS', name: 'Rio Grande do Sul' },
    { code: 'PE', name: 'Pernambuco' },
    { code: 'CE', name: 'Ceará' },
    { code: 'PA', name: 'Pará' },
    { code: 'SC', name: 'Santa Catarina' },
    { code: 'GO', name: 'Goiás' },
    { code: 'MA', name: 'Maranhão' },
    { code: 'ES', name: 'Espírito Santo' },
    { code: 'PB', name: 'Paraíba' },
    { code: 'RN', name: 'Rio Grande do Norte' },
    { code: 'AL', name: 'Alagoas' },
    { code: 'MT', name: 'Mato Grosso' },
    { code: 'PI', name: 'Piauí' },
    { code: 'DF', name: 'Distrito Federal' },
    { code: 'MS', name: 'Mato Grosso do Sul' },
    { code: 'SE', name: 'Sergipe' },
    { code: 'RO', name: 'Rondônia' },
    { code: 'TO', name: 'Tocantins' },
    { code: 'AC', name: 'Acre' },
    { code: 'AM', name: 'Amazonas' },
    { code: 'RR', name: 'Roraima' },
    { code: 'AP', name: 'Amapá' }
  ]

  const clinicsByState = {
    'SP': [
      {
        name: 'Clínica Mente Segura - São Paulo',
        address: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP',
        phone: '(11) 3456-7890',
        city: 'São Paulo',
        mapsUrl: 'https://maps.google.com/?q=Av.+Paulista+1578+Sao+Paulo'
      },
      {
        name: 'Centro de Apoio Psicológico - Campinas',
        address: 'Rua Barão de Jaguara, 1481 - Centro, Campinas - SP',
        phone: '(19) 3234-5678',
        city: 'Campinas',
        mapsUrl: 'https://maps.google.com/?q=Rua+Barao+de+Jaguara+1481+Campinas'
      }
    ],
    'RJ': [
      {
        name: 'Clínica Mente Segura - Rio de Janeiro',
        address: 'Av. Rio Branco, 156 - Centro, Rio de Janeiro - RJ',
        phone: '(21) 2567-8901',
        city: 'Rio de Janeiro',
        mapsUrl: 'https://maps.google.com/?q=Av.+Rio+Branco+156+Rio+de+Janeiro'
      },
      {
        name: 'Espaço Acolher - Niterói',
        address: 'Rua da Conceição, 188 - Centro, Niterói - RJ',
        phone: '(21) 3678-9012',
        city: 'Niterói',
        mapsUrl: 'https://maps.google.com/?q=Rua+da+Conceicao+188+Niteroi'
      }
    ],
    'MG': [
      {
        name: 'Clínica Mente Segura - Belo Horizonte',
        address: 'Av. Afonso Pena, 1500 - Centro, Belo Horizonte - MG',
        phone: '(31) 3456-7890',
        city: 'Belo Horizonte',
        mapsUrl: 'https://maps.google.com/?q=Av.+Afonso+Pena+1500+Belo+Horizonte'
      }
    ],
    'BA': [
      {
        name: 'Clínica Mente Segura - Salvador',
        address: 'Av. Sete de Setembro, 1238 - Vitória, Salvador - BA',
        phone: '(71) 3234-5678',
        city: 'Salvador',
        mapsUrl: 'https://maps.google.com/?q=Av.+Sete+de+Setembro+1238+Salvador'
      }
    ],
    'PR': [
      {
        name: 'Clínica Mente Segura - Curitiba',
        address: 'Rua XV de Novembro, 1299 - Centro, Curitiba - PR',
        phone: '(41) 3567-8901',
        city: 'Curitiba',
        mapsUrl: 'https://maps.google.com/?q=Rua+XV+de+Novembro+1299+Curitiba'
      }
    ],
    'RS': [
      {
        name: 'Clínica Mente Segura - Porto Alegre',
        address: 'Av. Borges de Medeiros, 1501 - Centro, Porto Alegre - RS',
        phone: '(51) 3678-9012',
        city: 'Porto Alegre',
        mapsUrl: 'https://maps.google.com/?q=Av.+Borges+de+Medeiros+1501+Porto+Alegre'
      }
    ],
    'DF': [
      {
        name: 'Clínica Mente Segura - Brasília',
        address: 'SCS Quadra 1, Bloco A - Asa Sul, Brasília - DF',
        phone: '(61) 3234-5678',
        city: 'Brasília',
        mapsUrl: 'https://maps.google.com/?q=SCS+Quadra+1+Brasilia'
      }
    ]
  }

  const handleStateChange = (stateCode) => {
    setSelectedState(stateCode)
    setSelectedCity('')
    setNearestClinics(clinicsByState[stateCode] || [])
    setFormData({ ...formData, state: stateCode, city: '' })
  }

  const handleCityChange = (city) => {
    setSelectedCity(city)
    setFormData({ ...formData, city })
  }

  const formatCep = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1')
  }

  const handleCepChange = async (value) => {
    const formattedCep = formatCep(value)
    setCep(formattedCep)

    const cleanCep = formattedCep.replace(/\D/g, '')

    if (cleanCep.length === 8) {
      setLoadingCep(true)
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
        const data = await response.json()

        if (!data.erro) {
          setAddressData({
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf
          })

          // Buscar clínicas do estado
          const stateCode = data.uf
          setSelectedState(stateCode)
          setSelectedCity(data.localidade)
          setNearestClinics(clinicsByState[stateCode] || [])
          setFormData({
            ...formData,
            state: stateCode,
            city: data.localidade
          })
        } else {
          alert('CEP não encontrado')
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error)
        alert('Erro ao buscar CEP. Tente novamente.')
      } finally {
        setLoadingCep(false)
      }
    }
  }

  const psychologists = [
    {
      id: 1,
      name: "Dra. Maria Silva",
      specialization: "Trauma e PTSD",
      crp: "CRP 06/123456",
      rating: 4.9,
      experience: "15 anos de experiência",
      description: "Especialista em atendimento a profissionais de segurança pública com foco em traumas e estresse pós-traumático.",
      availability: ["presencial", "online"]
    },
    {
      id: 2,
      name: "Dr. João Santos",
      specialization: "Ansiedade e Depressão",
      crp: "CRP 06/234567",
      rating: 4.8,
      experience: "12 anos de experiência",
      description: "Psicólogo clínico com abordagem cognitivo-comportamental para ansiedade e depressão.",
      availability: ["online"]
    },
    {
      id: 3,
      name: "Dra. Ana Costa",
      specialization: "Burnout e Estresse",
      crp: "CRP 06/345678",
      rating: 5.0,
      experience: "10 anos de experiência",
      description: "Especializada em síndrome de burnout e gestão de estresse ocupacional.",
      availability: ["presencial", "online"]
    },
    {
      id: 4,
      name: "Dr. Carlos Lima",
      specialization: "Terapia Cognitiva",
      crp: "CRP 06/456789",
      rating: 4.7,
      experience: "18 anos de experiência",
      description: "Terapeuta cognitivo-comportamental com foco em reestruturação de pensamentos.",
      availability: ["presencial"]
    }
  ]

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui seria feita a integração com a API
    console.log('Appointment data:', formData)
    alert('Agendamento realizado com sucesso! Você receberá uma confirmação por e-mail.')
    navigate('/')
  }

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    })

    if (field === 'psychologist') {
      const psy = psychologists.find(p => p.id.toString() === value)
      setSelectedPsychologist(psy)
    }
  }

  const emergencyContacts = [
    {
      name: "CVV - Centro de Valorização da Vida",
      phone: "188",
      description: "Apoio emocional e prevenção do suicídio. Atendimento 24h, gratuito e sigiloso.",
      icon: <Heart className="h-6 w-6 text-red-500" />
    },
    {
      name: "SAMU",
      phone: "192",
      description: "Serviço de Atendimento Móvel de Urgência. Emergências médicas e psiquiátricas.",
      icon: <AlertCircle className="h-6 w-6 text-red-600" />
    },
    {
      name: "Escuta SUSP",
      phone: "0800 644 9988",
      description: "Atendimento psicológico para profissionais de segurança pública. Segunda a sexta, 8h às 20h.",
      icon: <Shield className="h-6 w-6 text-blue-600" />
    },
    {
      name: "Disque 100",
      phone: "100",
      description: "Denúncias de violações de direitos humanos. Atendimento 24h.",
      icon: <Phone className="h-6 w-6 text-green-600" />
    }
  ]

  const helpResources = [
    {
      title: "Atendimento Presencial",
      description: "Consultas presenciais em nossos consultórios com psicólogos especializados.",
      icon: <MapPin className="h-8 w-8 text-blue-600" />
    },
    {
      title: "Atendimento Online",
      description: "Sessões por videochamada, no conforto da sua casa, com total privacidade.",
      icon: <Video className="h-8 w-8 text-blue-600" />
    },
    {
      title: "Grupos de Apoio",
      description: "Participe de grupos terapêuticos com outros profissionais da segurança e saúde.",
      icon: <User className="h-8 w-8 text-blue-600" />
    },
    {
      title: "Atendimento de Emergência",
      description: "Em casos urgentes, oferecemos atendimento prioritário e imediato.",
      icon: <AlertCircle className="h-8 w-8 text-red-600" />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900 flex items-center space-x-3">
                <Calendar className="h-8 w-8 text-blue-600" />
                <span>Agendar Atendimento Psicológico</span>
              </h1>
              <p className="text-gray-600 mt-2">
                Escolha a melhor forma de receber apoio psicológico especializado
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

        {/* Contatos de Emergência */}
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-xl text-red-900 flex items-center space-x-2">
              <AlertCircle className="h-6 w-6" />
              <span>Precisa de Ajuda Imediata?</span>
            </CardTitle>
            <CardDescription className="text-red-700">
              Se você está em crise ou precisa de ajuda urgente, entre em contato com estes serviços:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-red-200">
                  <div className="flex items-start space-x-3">
                    {contact.icon}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                      <p className="text-2xl font-bold text-blue-600 my-2">{contact.phone}</p>
                      <p className="text-sm text-gray-600">{contact.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tipos de Atendimento */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-blue-900">Formas de Atendimento Disponíveis</CardTitle>
            <CardDescription>
              Escolha a modalidade que melhor se adequa às suas necessidades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {helpResources.map((resource, index) => (
                <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-center text-center space-y-3">
                    {resource.icon}
                    <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Localização */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-blue-900 flex items-center space-x-2">
              <Navigation className="h-6 w-6" />
              <span>Encontre uma Clínica Próxima</span>
            </CardTitle>
            <CardDescription>
              Selecione seu estado para ver as clínicas disponíveis na sua região
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-2 mb-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900">Dica:</p>
                  <p className="text-sm text-blue-800">
                    Digite seu CEP para encontrar automaticamente as clínicas mais próximas de você!
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <div className="relative">
                  <Input
                    id="cep"
                    type="text"
                    placeholder="00000-000"
                    value={cep}
                    onChange={(e) => handleCepChange(e.target.value)}
                    maxLength={9}
                    className="pr-10"
                  />
                  {loadingCep && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    </div>
                  )}
                </div>
                {addressData.city && (
                  <p className="text-xs text-green-600 flex items-center space-x-1">
                    <span>✓</span>
                    <span>CEP encontrado!</span>
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado *</Label>
                <Select onValueChange={handleStateChange} value={selectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {brazilianStates.map((state) => (
                      <SelectItem key={state.code} value={state.code}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                {nearestClinics.length > 0 ? (
                  <Select onValueChange={handleCityChange} value={selectedCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a cidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...new Set(nearestClinics.map(c => c.city))].map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="city"
                    type="text"
                    placeholder="Sua cidade"
                    value={addressData.city}
                    readOnly
                    className="bg-gray-50"
                  />
                )}
              </div>
            </div>

            {addressData.street && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-green-900 mb-2">Endereço Encontrado:</h4>
                <div className="space-y-1 text-sm text-green-800">
                  <p><strong>Rua:</strong> {addressData.street}</p>
                  <p><strong>Bairro:</strong> {addressData.neighborhood}</p>
                  <p><strong>Cidade:</strong> {addressData.city}</p>
                  <p><strong>Estado:</strong> {addressData.state}</p>
                </div>
              </div>
            )}

            {nearestClinics.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Clínicas Disponíveis:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nearestClinics
                    .filter(clinic => !selectedCity || clinic.city === selectedCity)
                    .map((clinic, index) => (
                      <div key={index} className="bg-white border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h4 className="font-semibold text-blue-900 mb-2">{clinic.name}</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                            <span>{clinic.address}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-blue-600" />
                            <span>{clinic.phone}</span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-3"
                          onClick={() => window.open(clinic.mapsUrl, '_blank')}
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          Ver no Google Maps
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {selectedState && nearestClinics.length === 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <AlertCircle className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                <p className="text-yellow-800">
                  Ainda não temos clínicas cadastradas neste estado.
                  <br />
                  Entre em contato conosco para atendimento online!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Formulário de Agendamento */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-blue-900">Agendar Consulta com Psicólogo</CardTitle>
            <CardDescription>
              Preencha os dados abaixo para agendar sua consulta
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

              {selectedPsychologist && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-lg">{selectedPsychologist.name}</h4>
                        <div className="flex items-center space-x-1 text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm font-semibold">{selectedPsychologist.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{selectedPsychologist.crp}</p>
                      <p className="text-sm text-gray-700">{selectedPsychologist.description}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{selectedPsychologist.experience}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="font-medium">Disponibilidade:</span>
                        {selectedPsychologist.availability.map((type, idx) => (
                          <span key={idx} className="inline-flex items-center space-x-1 bg-white px-2 py-1 rounded">
                            {type === 'online' ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                            <span className="text-xs">{type === 'online' ? 'Online' : 'Presencial'}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

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
                        <Video className="h-4 w-4" />
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
