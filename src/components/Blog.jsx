import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { 
  BookOpen, 
  Search, 
  Filter, 
  Clock, 
  User, 
  Play,
  Headphones,
  FileText,
  Heart,
  Brain,
  Shield
} from 'lucide-react'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { value: 'all', label: 'Todas as categorias' },
    { value: 'saude-mental', label: 'Saúde Mental' },
    { value: 'autocuidado', label: 'Autocuidado' },
    { value: 'burnout', label: 'Burnout' },
    { value: 'ansiedade', label: 'Ansiedade' },
    { value: 'trauma', label: 'Trauma' },
    { value: 'resiliencia', label: 'Resiliência' }
  ]

  const samplePosts = [
    {
      id: 1,
      title: "Como Reconhecer os Sinais de Burnout em Profissionais da Segurança",
      content: "O burnout é uma síndrome caracterizada pelo esgotamento físico e mental causado por condições de trabalho desgastantes...",
      author: "Dra. Maria Silva",
      publish_date: "2025-01-10T10:00:00Z",
      category: "burnout",
      media_type: "text",
      reading_time: "8 min",
      tags: ["burnout", "prevenção", "sinais"]
    },
    {
      id: 2,
      title: "Técnicas de Respiração para Controle da Ansiedade em Situações de Estresse",
      content: "A respiração consciente é uma ferramenta poderosa para o controle da ansiedade, especialmente em situações de alta pressão...",
      author: "Dr. João Santos",
      publish_date: "2025-01-08T14:30:00Z",
      category: "ansiedade",
      media_type: "text",
      reading_time: "5 min",
      tags: ["ansiedade", "técnicas", "respiração"]
    },
    {
      id: 3,
      title: "Podcast: Conversas sobre Saúde Mental com Bombeiros",
      content: "Neste episódio, conversamos com bombeiros sobre os desafios emocionais da profissão e estratégias de enfrentamento...",
      author: "Equipe Mente Segura",
      publish_date: "2025-01-05T09:00:00Z",
      category: "saude-mental",
      media_type: "audio",
      reading_time: "45 min",
      tags: ["podcast", "bombeiros", "depoimentos"]
    },
    {
      id: 4,
      title: "Vídeo: Exercícios de Mindfulness para Profissionais da Saúde",
      content: "Aprenda técnicas simples de mindfulness que podem ser praticadas durante o plantão para reduzir o estresse...",
      author: "Dra. Ana Costa",
      publish_date: "2025-01-03T16:00:00Z",
      category: "autocuidado",
      media_type: "video",
      reading_time: "12 min",
      tags: ["mindfulness", "exercícios", "saúde"]
    },
    {
      id: 5,
      title: "Lidando com Trauma Vicário: Estratégias para Profissionais de Emergência",
      content: "O trauma vicário afeta profissionais que lidam constantemente com situações traumáticas. Saiba como se proteger...",
      author: "Dr. Carlos Lima",
      publish_date: "2025-01-01T11:00:00Z",
      category: "trauma",
      media_type: "text",
      reading_time: "10 min",
      tags: ["trauma", "emergência", "proteção"]
    },
    {
      id: 6,
      title: "Construindo Resiliência: Ferramentas Práticas para o Dia a Dia",
      content: "A resiliência pode ser desenvolvida através de práticas específicas. Descubra como fortalecer sua capacidade de adaptação...",
      author: "Dra. Patricia Oliveira",
      publish_date: "2024-12-28T13:00:00Z",
      category: "resiliencia",
      media_type: "text",
      reading_time: "7 min",
      tags: ["resiliência", "ferramentas", "adaptação"]
    }
  ]

  useEffect(() => {
    setPosts(samplePosts)
    setFilteredPosts(samplePosts)
  }, [])

  useEffect(() => {
    let filtered = posts

    // Filtrar por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredPosts(filtered)
  }, [posts, selectedCategory, searchTerm])

  const getMediaIcon = (mediaType) => {
    switch (mediaType) {
      case 'video':
        return <Play className="h-4 w-4" />
      case 'audio':
        return <Headphones className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getMediaBadgeColor = (mediaType) => {
    switch (mediaType) {
      case 'video':
        return 'bg-red-100 text-red-800'
      case 'audio':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'saude-mental':
        return <Brain className="h-4 w-4" />
      case 'autocuidado':
        return <Heart className="h-4 w-4" />
      case 'burnout':
      case 'ansiedade':
      case 'trauma':
        return <Shield className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Centro de Recursos Educativos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conteúdos especializados em saúde mental para profissionais da segurança pública e da saúde
          </p>
        </div>

        {/* Filtros */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar artigos, vídeos ou podcasts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:w-64">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className={`${getMediaBadgeColor(post.media_type)} flex items-center space-x-1`}>
                    {getMediaIcon(post.media_type)}
                    <span className="capitalize">{post.media_type === 'text' ? 'Artigo' : post.media_type === 'video' ? 'Vídeo' : 'Podcast'}</span>
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.reading_time}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight hover:text-blue-600 transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.content}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{post.author}</span>
                  </div>
                  <span>{formatDate(post.publish_date)}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full" variant="outline">
                  {post.media_type === 'video' ? 'Assistir' : post.media_type === 'audio' ? 'Ouvir' : 'Ler Artigo'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum conteúdo encontrado</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou termos de busca</p>
          </div>
        )}

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-green-500 text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Precisa de Apoio Personalizado?</h3>
              <p className="text-blue-100 mb-6">
                Nossos psicólogos especializados estão prontos para oferecer suporte individualizado
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  Agendar Consulta
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Conversar com IA
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
