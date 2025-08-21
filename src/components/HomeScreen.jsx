import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Gauge, Battery, MapPin, Activity, Clock, Zap } from 'lucide-react'
import BottomNavigation from './BottomNavigation'

const HomeScreen = ({ userConfig, vehicleData, setVehicleData }) => {
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    // Simular atualizações em tempo real dos dados do veículo
    const interval = setInterval(() => {
      setVehicleData(prev => ({
        ...prev,
        speed: Math.floor(Math.random() * 120), // Velocidade aleatória 0-120 km/h
        batteryLevel: Math.max(20, Math.min(100, prev.batteryLevel + (Math.random() - 0.5) * 5)), // Variação da bateria
        isMoving: Math.random() > 0.3, // 70% chance de estar em movimento
        lastUpdate: new Date()
      }))
      setLastUpdate(new Date())
    }, 5000) // Atualizar a cada 5 segundos

    return () => clearInterval(interval)
  }, [setVehicleData])

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const getBatteryColor = (level) => {
    if (level > 60) return 'text-green-600'
    if (level > 30) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getBatteryIcon = (level) => {
    if (level > 60) return '🔋'
    if (level > 30) return '🔋'
    return '🪫'
  }

  const getSpeedColor = (speed) => {
    if (speed === 0) return 'text-gray-600'
    if (speed <= 60) return 'text-green-600'
    if (speed <= 100) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-md mx-auto space-y-4">
          {/* Header */}
          <div className="text-center space-y-2 pt-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Olá, {userConfig.userName}!
            </h1>
            <p className="text-gray-600">
              {userConfig.vehicleNickname || `Seu ${userConfig.vehicleType || 'veículo'}`}
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Última atualização: {formatTime(lastUpdate)}</span>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Velocidade */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Gauge className="h-4 w-4 text-blue-600" />
                  <span>Velocidade</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getSpeedColor(vehicleData.speed)}`}>
                    {vehicleData.speed}
                  </div>
                  <div className="text-sm text-gray-500">
                    {userConfig.speedUnit === 'kmh' ? 'km/h' : 'mph'}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bateria */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Battery className="h-4 w-4 text-green-600" />
                  <span>Bateria</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getBatteryColor(vehicleData.batteryLevel)}`}>
                    {Math.round(vehicleData.batteryLevel)}%
                  </div>
                  <div className="text-2xl">
                    {getBatteryIcon(vehicleData.batteryLevel)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Status de Movimento */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center space-x-2 text-sm">
                <Activity className="h-4 w-4 text-purple-600" />
                <span>Status do Veículo</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Movimento:</span>
                <Badge 
                  variant={vehicleData.isMoving ? "default" : "secondary"}
                  className={vehicleData.isMoving ? "bg-green-600" : "bg-gray-500"}
                >
                  {vehicleData.isMoving ? 'Em Movimento' : 'Parado'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Localização */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-red-600" />
                <span>Última Localização</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  {vehicleData.lastLocation}
                </p>
                <p className="text-xs text-gray-500">
                  Registrada em {formatTime(vehicleData.lastUpdate)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Saúde da Bateria */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center space-x-2 text-sm">
                <Zap className="h-4 w-4 text-yellow-600" />
                <span>Saúde da Bateria</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Condição:</span>
                <Badge 
                  variant="outline"
                  className={`${
                    vehicleData.batteryHealth === 'Saudável' 
                      ? 'border-green-500 text-green-700' 
                      : vehicleData.batteryHealth === 'Atenção'
                      ? 'border-yellow-500 text-yellow-700'
                      : 'border-red-500 text-red-700'
                  }`}
                >
                  {vehicleData.batteryHealth}
                </Badge>
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      vehicleData.batteryLevel > 60 ? 'bg-green-500' :
                      vehicleData.batteryLevel > 30 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${vehicleData.batteryLevel}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações Importantes */}
          <Card className="shadow-sm bg-blue-50 border-blue-200">
            <CardContent className="pt-4">
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-blue-800">
                  Monitoramento Ativo
                </h3>
                <p className="text-sm text-blue-700">
                  As configurações definidas demonstram pontos importantes como 
                  praticidade, modernização e segurança. Você consegue visualizar 
                  se o seu veículo está em movimento e monitorar a saúde da bateria.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}

export default HomeScreen

