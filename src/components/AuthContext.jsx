import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage
    const savedUser = localStorage.getItem('mentesegura_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Aqui seria feita a chamada à API real
      // Por enquanto, simulando login
      const users = JSON.parse(localStorage.getItem('mentesegura_users') || '[]')
      const foundUser = users.find(u => u.email === email && u.password === password)
      
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem('mentesegura_user', JSON.stringify(userWithoutPassword))
        return { success: true }
      } else {
        return { success: false, error: 'E-mail ou senha incorretos' }
      }
    } catch (error) {
      return { success: false, error: 'Erro ao fazer login' }
    }
  }

  const register = async (userData) => {
    try {
      // Aqui seria feita a chamada à API real
      // Por enquanto, salvando no localStorage
      const users = JSON.parse(localStorage.getItem('mentesegura_users') || '[]')
      
      // Verificar se o e-mail já existe
      if (users.find(u => u.email === userData.email)) {
        return { success: false, error: 'E-mail já cadastrado' }
      }
      
      // Verificar se o CPF já existe
      if (users.find(u => u.cpf === userData.cpf)) {
        return { success: false, error: 'CPF já cadastrado' }
      }
      
      const newUser = {
        id: Date.now(),
        ...userData,
        createdAt: new Date().toISOString()
      }
      
      users.push(newUser)
      localStorage.setItem('mentesegura_users', JSON.stringify(users))
      
      // Fazer login automático após cadastro
      const { password, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      localStorage.setItem('mentesegura_user', JSON.stringify(userWithoutPassword))
      
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Erro ao fazer cadastro' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('mentesegura_user')
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}