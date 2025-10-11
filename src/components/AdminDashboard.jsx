import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  Users, 
  Calendar, 
  MessageCircle, 
  TrendingUp, 
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total_users: 0,
    total_appointments: 0,
    total_interactions: 0
  })

  const [appointments, setAppointments] = useState([])
  const [users, setUsers] = useState([])

  // Dados simulados para os gráficos
  const monthlyData = [
    { month: 'Jan', usuarios: 45, consultas: 32, interacoes: 156 },
    { month: 'Fev', usuarios: 52, consultas: 41, interacoes: 189 },
    { month: 'Mar', usuarios: 61, consultas: 38, interacoes: 203 },
    { month: 'Abr', usuarios: 58, consultas: 45, interacoes: 234 },
    { month: 'Mai', usuarios: 67, consultas: 52, interacoes: 267 },
    { month: 'Jun', usuarios: 73, consultas: 48, interacoes: 289 }
  ]

  const emotionData = [
    { name: 'Ansiedade', value: 35, color: '#ff6b6b' },
    { name: 'Estresse', value: 28, color: '#ffa726' },
    { name: 'Tristeza', value: 20, color: '#42a5f5' },
    { name: 'Burnout', value: 12, color: '#ab47bc' },
    { name: 'Outros', value: 5, color: '#66bb6a' }
  ]

  const professionData = [
    { profession: 'Policial Civil', count: 45 },
    { profession: 'Policial Militar', count: 38 },
    { profession: 'Bombeiro', count: 22 },
    { profession: 'Enfermeiro', count: 31 },
    { profession: 'Médico', count: 18 },
    { profession: 'Agente Penitenciário', count: 15 }
  ]

  useEffect(() => {
    // Simular carregamento de dados
    setStats({
      total_users: 169,
      total_appointments: 256,
      total_interactions: 1338
    })

    setAppointments([
      { id: 1, user: 'João Silva', psychologist: 'Dra. Maria', date: '2025-01-15', time: '14:00', status: 'agendado' },
      { id: 2, user: 'Ana Costa', psychologist: 'Dr. Carlos', date: '2025-01-15', time: '15:00', status: 'realizado' },
      { id: 3, user: 'Pedro Santos', psychologist: 'Dra. Ana', date: '2025-01-16', time: '09:00', status: 'agendado' },
      { id: 4, user: 'Maria Oliveira', psychologist: 'Dr. João', date: '2025-01-16', time: '10:00', status: 'cancelado' }
    ])

    setUsers([
      { id: 1, name: 'João Silva', profession: 'Policial Civil', workplace: 'Delegacia Central', created_at: '2024-12-01' },
      { id: 2, name: 'Ana Costa', profession: 'Enfermeira', workplace: 'Hospital Municipal', created_at: '2024-12-05' },
      { id: 3, name: 'Pedro Santos', profession: 'Bombeiro', workplace: '1º Batalhão', created_at: '2024-12-10' }
    ])
  }, [])

  const getStatusBadge = (status) => {
    const statusConfig = {
      agendado: { variant: 'default', icon: Clock, color: 'text-blue-600' },
      realizado: { variant: 'default', icon: CheckCircle, color: 'text-green-600' },
      cancelado: { variant: 'destructive', icon: XCircle, color: 'text-red-600' }
    }

    const config = statusConfig[status] || statusConfig.agendado
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="flex items-center space-x-1">
        <Icon className="h-3 w-3" />
        <span>{status}</span>
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
          <p className="text-gray-600 mt-2">Visão geral da plataforma Mente Segura</p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_users}</div>
              <p className="text-xs text-muted-foreground">
                +12% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consultas Agendadas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_appointments}</div>
              <p className="text-xs text-muted-foreground">
                +8% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interações com IA</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_interactions}</div>
              <p className="text-xs text-muted-foreground">
                +23% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Crescimento Mensal</CardTitle>
                  <CardDescription>Usuários, consultas e interações por mês</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="usuarios" fill="#3b82f6" name="Usuários" />
                      <Bar dataKey="consultas" fill="#10b981" name="Consultas" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emoções Mais Relatadas</CardTitle>
                  <CardDescription>Distribuição das emoções nas interações</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={emotionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {emotionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Agendamentos Recentes</CardTitle>
                <CardDescription>Lista dos últimos agendamentos na plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{appointment.user}</div>
                        <div className="text-sm text-gray-500">
                          {appointment.psychologist} • {appointment.date} às {appointment.time}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(appointment.status)}
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Usuários Cadastrados</CardTitle>
                <CardDescription>Lista dos usuários da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">
                          {user.profession} • {user.workplace}
                        </div>
                        <div className="text-xs text-gray-400">
                          Cadastrado em {new Date(user.created_at).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver Perfil
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Usuários por Profissão</CardTitle>
                  <CardDescription>Distribuição dos usuários por área de atuação</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={professionData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="profession" type="category" width={120} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alertas e Indicadores</CardTitle>
                  <CardDescription>Monitoramento de situações que requerem atenção</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="font-medium text-red-800">3 interações de alto risco</div>
                        <div className="text-sm text-red-600">Requerem acompanhamento imediato</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-yellow-600" />
                      <div>
                        <div className="font-medium text-yellow-800">Aumento de 15% em consultas</div>
                        <div className="text-sm text-yellow-600">Considerar ampliar equipe</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium text-green-800">95% de satisfação</div>
                        <div className="text-sm text-green-600">Avaliações positivas dos usuários</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
