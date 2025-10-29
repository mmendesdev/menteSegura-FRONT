import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from './AuthContext.jsx'
import logo from '../assets/logo.png'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    password: '',
    confirmPassword: ''
  })

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  const formatPhone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
  }

  const validateCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '')
    if (cpf.length !== 11) return false

    // Validação básica de CPF
    if (/^(\d)\1{10}$/.test(cpf)) return false

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validações
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres')
      return
    }

    if (!validateCPF(formData.cpf)) {
      setError('CPF inválido')
      return
    }

    setLoading(true)

    const { confirmPassword, ...userData } = formData
    const result = await register(userData)

    if (result.success) {
      navigate('/')
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  const handleChange = (e) => {
    let { name, value } = e.target

    if (name === 'cpf') {
      value = formatCPF(value)
    } else if (name === 'phone') {
      value = formatPhone(value)
    }

    setFormData({
      ...formData,
      [name]: value
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
      <div className="relative z-10 w-full max-w-2xl">
        <Card className="w-full shadow-2xl border-blue-100">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <img src={logo} alt="Mente Segura" className="h-20 w-20" />
            </div>
            <CardTitle className="text-2xl font-bold">Criar Conta - Mente Segura</CardTitle>
            <CardDescription>
              Preencha seus dados para ter acesso aos nossos serviços de saúde mental
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
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
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
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={15}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  name="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={handleChange}
                  maxLength={14}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Senha *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mínimo 6 caracteres"
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
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Repita sua senha"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Seus dados estão seguros</p>
                    <p>Utilizamos criptografia e seguimos a LGPD para proteger suas informações pessoais.</p>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Criando conta...' : 'Criar Conta'}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Faça login aqui
                </button>
              </p>
              <p className="text-sm text-gray-600 mt-2">
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