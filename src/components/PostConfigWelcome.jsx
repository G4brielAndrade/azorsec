import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Settings, Car, Home, MapPin, Bell, MoreHorizontal } from 'lucide-react'
import BottomNavigation from './BottomNavigation'

const PostConfigWelcome = ({ userConfig, appState, setAppState }) => {
  const [showInstallButton, setShowInstallButton] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Mostrar botão para simular instalação após 3 segundos
    const timer = setTimeout(() => {
      setShowInstallButton(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const simulateTrackerInstallation = () => {
    setAppState({ ...appState, isTrackerInstalled: true })
    navigate('/home')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-md mx-auto space-y-6 pt-8">
          {/* Header de Sucesso */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-green-600 p-4 rounded-full">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Olá, {userConfig.userName}!
            </h1>
            <p className="text-gray-600">Seu aplicativo já está configurado!</p>
          </div>

          {/* Card de Status */}
          <Card className="shadow-lg border-green-200">
            <CardHeader className="text-center">
              <CardTitle className="text-green-700">Configuração Concluída</CardTitle>
              <CardDescription>
                Agora ele exibe a mensagem de boas-vindas e aguarda a instalação do rastreador no veículo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Resumo das Configurações */}
              <div className="bg-green-50 p-4 rounded-lg space-y-3">
                <h3 className="font-semibold text-green-800 flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Suas Configurações</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nome:</span>
                    <span className="font-medium">{userConfig.userName}</span>
                  </div>
                  {userConfig.vehicleType && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Veículo:</span>
                      <span className="font-medium capitalize">{userConfig.vehicleType}</span>
                    </div>
                  )}
                  {userConfig.vehicleNickname && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Apelido:</span>
                      <span className="font-medium">{userConfig.vehicleNickname}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Velocidade:</span>
                    <span className="font-medium">
                      {userConfig.speedUnit === 'kmh' ? 'km/h' : 'mph'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Próximos Passos */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 flex items-center space-x-2 mb-2">
                  <Car className="h-4 w-4" />
                  <span>Próximo Passo</span>
                </h3>
                <p className="text-sm text-blue-700">
                  Instale o rastreador Azor Sec em seu veículo seguindo as instruções do manual. 
                  Após a instalação, você poderá monitorar seu veículo em tempo real.
                </p>
              </div>

              {/* Botão para Simular Instalação (para demonstração) */}
              {showInstallButton && (
                <div className="pt-4">
                  <Button 
                    onClick={simulateTrackerInstallation}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    Simular Rastreador Instalado
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    (Botão para demonstração - simula a instalação do rastreador)
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preview das Funcionalidades */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Funcionalidades Disponíveis</CardTitle>
              <CardDescription>
                Após a instalação do rastreador, você terá acesso a:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center space-y-2">
                  <div className="bg-blue-100 p-3 rounded-full mx-auto w-fit">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-600">Localização em Tempo Real</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="bg-green-100 p-3 rounded-full mx-auto w-fit">
                    <Car className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-600">Status do Veículo</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="bg-yellow-100 p-3 rounded-full mx-auto w-fit">
                    <Bell className="h-6 w-6 text-yellow-600" />
                  </div>
                  <p className="text-xs text-gray-600">Alertas Inteligentes</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="bg-purple-100 p-3 rounded-full mx-auto w-fit">
                    <MoreHorizontal className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-xs text-gray-600">Muito Mais</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentPage="home" />
    </div>
  )
}

export default PostConfigWelcome

