import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Eye, EyeOff, AlertCircle, MessageCircle } from 'lucide-react'
import { useAuth } from './AuthContext.jsx'
import logo from '../assets/logo.png'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(formData.email, formData.password)

    if (result.success) {
      navigate('/')
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Padrão decorativo de fundo */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 -left-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-200 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 w-full max-w-md">
        <Card className="w-full shadow-2xl border-blue-100">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <img src={logo} alt="Mente Segura" className="h-20 w-20" />
            </div>
            <CardTitle className="text-2xl font-bold">Bem-vindo ao Mente Segura</CardTitle>
            <CardDescription>
              Entre na sua conta para acessar seus recursos de saúde mental
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2 mb-4">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
            <div className="mt-6 text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Ou</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full border-blue-300 text-blue-600 hover:bg-blue-50"
                onClick={() => navigate('/chat')}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Continuar sem cadastro - Falar com Assistente
              </Button>

              <p className="text-sm text-gray-600">
                Não tem uma conta?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Cadastre-se aqui
                </button>
              </p>
              <p className="text-sm text-gray-600">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="text-blue-600 hover:underline"
                >
                  Voltar para início
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
