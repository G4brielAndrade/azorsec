import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  User, 
  Settings, 
  Car, 
  Shield, 
  HelpCircle, 
  Phone, 
  Mail, 
  FileText, 
  Info, 
  LogOut,
  ChevronRight,
  Star,
  Download,
  Share2,
  Moon,
  Bell
} from 'lucide-react'
import BottomNavigation from './BottomNavigation'

const MoreScreen = ({ userConfig, setUserConfig, appState, setAppState }) => {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)

  const handleLogout = () => {
    if (confirm('Tem certeza que deseja sair do aplicativo?')) {
      setUserConfig({
        chipNumber: '',
        userName: '',
        vehicleType: '',
        vehicleNickname: '',
        notifications: {
          batteryAlert: true,
          movementAlert: true,
          geofenceAlert: true
        },
        speedUnit: 'kmh'
      })
      setAppState({
        isChipValidated: false,
        isConfigured: false,
        isTrackerInstalled: false
      })
      navigate('/')
    }
  }

  const menuSections = [
    {
      title: 'Conta',
      items: [
        {
          icon: User,
          label: 'Perfil do Usuário',
          description: 'Editar informações pessoais',
          action: () => navigate('/config'),
          showChevron: true
        },
        {
          icon: Car,
          label: 'Gerenciar Veículos',
          description: 'Adicionar ou editar veículos',
          badge: '1 veículo',
          action: () => alert('Funcionalidade em desenvolvimento'),
          showChevron: true
        }
      ]
    },
    {
      title: 'Configurações',
      items: [
        {
          icon: Bell,
          label: 'Notificações',
          description: 'Configurar alertas e notificações',
          action: () => navigate('/alert'),
          showChevron: true
        },
        {
          icon: Settings,
          label: 'Configurações do App',
          description: 'Preferências gerais',
          action: () => alert('Funcionalidade em desenvolvimento'),
          showChevron: true
        },
        {
          icon: Moon,
          label: 'Modo Escuro',
          description: 'Alterar tema do aplicativo',
          toggle: true,
          value: darkMode,
          action: () => setDarkMode(!darkMode)
        }
      ]
    },
    {
      title: 'Segurança',
      items: [
        {
          icon: Shield,
          label: 'Segurança',
          description: 'Configurações de segurança',
          action: () => alert('Funcionalidade em desenvolvimento'),
          showChevron: true
        },
        {
          icon: FileText,
          label: 'Política de Privacidade',
          description: 'Como protegemos seus dados',
          action: () => alert('Abrindo política de privacidade...'),
          showChevron: true
        }
      ]
    },
    {
      title: 'Suporte',
      items: [
        {
          icon: HelpCircle,
          label: 'Central de Ajuda',
          description: 'FAQs e tutoriais',
          action: () => alert('Abrindo central de ajuda...'),
          showChevron: true
        },
        {
          icon: Phone,
          label: 'Contato',
          description: 'Entre em contato conosco',
          action: () => alert('Telefone: (11) 1234-5678'),
          showChevron: true
        },
        {
          icon: Mail,
          label: 'Suporte por Email',
          description: 'suporte@azorsec.com',
          action: () => alert('Abrindo cliente de email...'),
          showChevron: true
        }
      ]
    },
    {
      title: 'Sobre',
      items: [
        {
          icon: Star,
          label: 'Avaliar App',
          description: 'Deixe sua avaliação',
          action: () => alert('Redirecionando para loja de apps...'),
          showChevron: true
        },
        {
          icon: Share2,
          label: 'Compartilhar',
          description: 'Indique para amigos',
          action: () => alert('Compartilhando aplicativo...'),
          showChevron: true
        },
        {
          icon: Info,
          label: 'Sobre o Aplicativo',
          description: 'Versão 1.0.0',
          action: () => alert('Azor Sec v1.0.0\nDesenvolvido por Gabriel Andrade'),
          showChevron: true
        }
      ]
    }
  ]

  const getUserInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-md mx-auto space-y-4">
          {/* Header */}
          <div className="text-center space-y-2 pt-4">
            <h1 className="text-2xl font-bold text-gray-900">Mais</h1>
            <p className="text-gray-600">Configurações e informações</p>
          </div>

          {/* Perfil do Usuário */}
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-blue-600 text-white text-lg">
                    {getUserInitials(userConfig.userName || 'U')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {userConfig.userName || 'Usuário'}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Chip: {userConfig.chipNumber || 'N/A'}
                  </p>
                  {userConfig.vehicleType && (
                    <div className="flex items-center space-x-2 mt-1">
                      <Car className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600 capitalize">
                        {userConfig.vehicleNickname || userConfig.vehicleType}
                      </span>
                    </div>
                  )}
                </div>
                <Badge className="bg-green-600">Ativo</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Menu Sections */}
          {menuSections.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={itemIndex}
                      onClick={item.action}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Icon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {item.label}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {item.badge}
                          </Badge>
                        )}
                        {item.toggle && (
                          <div className={`w-10 h-6 rounded-full p-1 transition-colors ${
                            item.value ? 'bg-blue-600' : 'bg-gray-300'
                          }`}>
                            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                              item.value ? 'translate-x-4' : 'translate-x-0'
                            }`}></div>
                          </div>
                        )}
                        {item.showChevron && (
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          ))}

          {/* Logout Button */}
          <Card className="shadow-sm border-red-200">
            <CardContent className="pt-4">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair do Aplicativo
              </Button>
            </CardContent>
          </Card>

          {/* App Info */}
          <div className="text-center space-y-2 py-4">
            <div className="flex justify-center">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-900">Azor Sec</p>
            <p className="text-xs text-gray-500">
              Rastreamento Veicular • Versão 1.0.0
            </p>
            <p className="text-xs text-gray-400">
              Desenvolvido por Gabriel Andrade
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}

export default MoreScreen

