import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Settings, User, Car, Bell, Gauge } from 'lucide-react'

const ConfigurationScreen = ({ userConfig, setUserConfig, appState, setAppState }) => {
  const [config, setConfig] = useState({
    userName: userConfig.userName || '',
    vehicleType: userConfig.vehicleType || '',
    vehicleNickname: userConfig.vehicleNickname || '',
    notifications: userConfig.notifications || {
      batteryAlert: true,
      movementAlert: true,
      geofenceAlert: true
    },
    speedUnit: userConfig.speedUnit || 'kmh'
  })
  
  const [isSaving, setIsSaving] = useState(false)
  const navigate = useNavigate()

  const handleSave = async () => {
    if (!config.userName.trim()) {
      alert('Por favor, insira seu nome')
      return
    }

    setIsSaving(true)

    // Simular salvamento das configurações
    setTimeout(() => {
      setUserConfig({ ...userConfig, ...config })
      setAppState({ ...appState, isConfigured: true })
      navigate('/post-config')
      setIsSaving(false)
    }, 1500)
  }

  const updateConfig = (key, value) => {
    setConfig({ ...config, [key]: value })
  }

  const updateNotification = (key, value) => {
    setConfig({
      ...config,
      notifications: { ...config.notifications, [key]: value }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto space-y-6 pt-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-3 rounded-full">
              <Settings className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Configurar</h1>
          <p className="text-gray-600">Personalize e deixe a seu jeito!</p>
        </div>

        {/* Configurações Pessoais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <User className="h-5 w-5" />
              <span>Informações Pessoais</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userName">Seu Nome</Label>
              <Input
                id="userName"
                placeholder="Ex: João Silva"
                value={config.userName}
                onChange={(e) => updateConfig('userName', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configurações do Veículo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Car className="h-5 w-5" />
              <span>Seu Veículo</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vehicleType">Tipo de Veículo</Label>
              <Select value={config.vehicleType} onValueChange={(value) => updateConfig('vehicleType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="carro">Carro</SelectItem>
                  <SelectItem value="moto">Moto</SelectItem>
                  <SelectItem value="caminhao">Caminhão</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vehicleNickname">Apelido do Veículo (Opcional)</Label>
              <Input
                id="vehicleNickname"
                placeholder="Ex: Meu Carro, Azulão"
                value={config.vehicleNickname}
                onChange={(e) => updateConfig('vehicleNickname', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Notificação */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Bell className="h-5 w-5" />
              <span>Notificações</span>
            </CardTitle>
            <CardDescription>
              Escolha quais alertas você deseja receber
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="batteryAlert" className="text-sm">
                Alerta de Bateria Baixa
              </Label>
              <Switch
                id="batteryAlert"
                checked={config.notifications.batteryAlert}
                onCheckedChange={(checked) => updateNotification('batteryAlert', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="movementAlert" className="text-sm">
                Alerta de Movimento
              </Label>
              <Switch
                id="movementAlert"
                checked={config.notifications.movementAlert}
                onCheckedChange={(checked) => updateNotification('movementAlert', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="geofenceAlert" className="text-sm">
                Alerta de Geocerca
              </Label>
              <Switch
                id="geofenceAlert"
                checked={config.notifications.geofenceAlert}
                onCheckedChange={(checked) => updateNotification('geofenceAlert', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Unidades */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Gauge className="h-5 w-5" />
              <span>Unidades de Medida</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="speedUnit">Velocidade</Label>
              <Select value={config.speedUnit} onValueChange={(value) => updateConfig('speedUnit', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kmh">Quilômetros por hora (km/h)</SelectItem>
                  <SelectItem value="mph">Milhas por hora (mph)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Botão Salvar */}
        <Button 
          onClick={handleSave}
          disabled={isSaving || !config.userName.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700"
          size="lg"
        >
          {isSaving ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </div>
  )
}

export default ConfigurationScreen

