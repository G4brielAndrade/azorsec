import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Bell, AlertTriangle, CheckCircle, Clock, Settings, Zap, Car, MapPin } from 'lucide-react'
import BottomNavigation from './BottomNavigation'

const AlertScreen = ({ userConfig, vehicleData }) => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'movement',
      title: 'Veículo em Movimento',
      message: 'Seu veículo começou a se mover às 14:30',
      time: '14:30',
      date: 'Hoje',
      severity: 'info',
      read: false,
      location: 'Av. Paulista, 1000'
    },
    {
      id: 2,
      type: 'battery',
      title: 'Bateria Baixa',
      message: 'Nível da bateria está em 25%. Considere verificar o sistema elétrico.',
      time: '13:15',
      date: 'Hoje',
      severity: 'warning',
      read: false,
      location: 'Rua Augusta, 500'
    },
    {
      id: 3,
      type: 'geofence',
      title: 'Saída de Área Segura',
      message: 'Veículo saiu da área definida como "Trabalho"',
      time: '12:45',
      date: 'Hoje',
      severity: 'high',
      read: true,
      location: 'Av. Paulista, 1000'
    },
    {
      id: 4,
      type: 'speed',
      title: 'Velocidade Elevada',
      message: 'Velocidade de 95 km/h detectada na Marginal Tietê',
      time: '11:20',
      date: 'Hoje',
      severity: 'warning',
      read: true,
      location: 'Marginal Tietê'
    },
    {
      id: 5,
      type: 'maintenance',
      title: 'Lembrete de Manutenção',
      message: 'Próxima revisão programada em 15 dias',
      time: '09:00',
      date: 'Ontem',
      severity: 'info',
      read: true,
      location: null
    }
  ])

  const [alertSettings, setAlertSettings] = useState({
    batteryAlert: userConfig.notifications?.batteryAlert ?? true,
    movementAlert: userConfig.notifications?.movementAlert ?? true,
    geofenceAlert: userConfig.notifications?.geofenceAlert ?? true,
    speedAlert: true,
    maintenanceAlert: true
  })

  const [showSettings, setShowSettings] = useState(false)

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-50'
      case 'warning': return 'border-yellow-500 bg-yellow-50'
      case 'info': return 'border-blue-500 bg-blue-50'
      default: return 'border-gray-300 bg-gray-50'
    }
  }

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'high': return <Badge className="bg-red-600">Crítico</Badge>
      case 'warning': return <Badge className="bg-yellow-600">Atenção</Badge>
      case 'info': return <Badge className="bg-blue-600">Info</Badge>
      default: return <Badge variant="secondary">Normal</Badge>
    }
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'movement': return <Car className="h-5 w-5 text-blue-600" />
      case 'battery': return <Zap className="h-5 w-5 text-yellow-600" />
      case 'geofence': return <MapPin className="h-5 w-5 text-red-600" />
      case 'speed': return <AlertTriangle className="h-5 w-5 text-orange-600" />
      case 'maintenance': return <Settings className="h-5 w-5 text-purple-600" />
      default: return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const markAsRead = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, read: true } : alert
    ))
  }

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, read: true })))
  }

  const unreadCount = alerts.filter(alert => !alert.read).length

  const updateAlertSetting = (key, value) => {
    setAlertSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-md mx-auto space-y-4">
          {/* Header */}
          <div className="text-center space-y-2 pt-4">
            <div className="flex items-center justify-center space-x-2">
              <h1 className="text-2xl font-bold text-gray-900">Alertas</h1>
              {unreadCount > 0 && (
                <Badge className="bg-red-600">{unreadCount}</Badge>
              )}
            </div>
            <p className="text-gray-600">Notificações e alertas do veículo</p>
          </div>

          {/* Controles */}
          <div className="flex space-x-2">
            <Button
              variant={!showSettings ? 'default' : 'outline'}
              onClick={() => setShowSettings(false)}
              className="flex-1"
              size="sm"
            >
              <Bell className="h-4 w-4 mr-2" />
              Alertas
            </Button>
            <Button
              variant={showSettings ? 'default' : 'outline'}
              onClick={() => setShowSettings(true)}
              className="flex-1"
              size="sm"
            >
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
          </div>

          {!showSettings ? (
            <>
              {/* Ações Rápidas */}
              {unreadCount > 0 && (
                <Card className="shadow-sm border-blue-200 bg-blue-50">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">
                          {unreadCount} alerta{unreadCount > 1 ? 's' : ''} não lido{unreadCount > 1 ? 's' : ''}
                        </span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                      >
                        Marcar como lidos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Lista de Alertas */}
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <Card 
                    key={alert.id} 
                    className={`shadow-sm cursor-pointer transition-all ${
                      !alert.read ? getSeverityColor(alert.severity) : 'bg-white'
                    } ${!alert.read ? 'border-l-4' : ''}`}
                    onClick={() => markAsRead(alert.id)}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getAlertIcon(alert.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                              {alert.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                              {getSeverityBadge(alert.severity)}
                              {!alert.read && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">
                            {alert.message}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{alert.date} às {alert.time}</span>
                            </div>
                            {alert.location && (
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span className="truncate max-w-32">{alert.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Resumo */}
              <Card className="shadow-sm bg-green-50 border-green-200">
                <CardContent className="pt-4">
                  <div className="text-center space-y-2">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
                    <h3 className="font-semibold text-green-800">
                      Sistema de Alertas Ativo
                    </h3>
                    <p className="text-sm text-green-700">
                      Seu veículo está sendo monitorado 24/7. Você receberá notificações 
                      instantâneas sobre eventos importantes.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            /* Configurações de Alertas */
            <div className="space-y-4">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Configurações de Notificação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="batteryAlert" className="text-sm">
                      Alerta de Bateria Baixa
                    </Label>
                    <Switch
                      id="batteryAlert"
                      checked={alertSettings.batteryAlert}
                      onCheckedChange={(checked) => updateAlertSetting('batteryAlert', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="movementAlert" className="text-sm">
                      Alerta de Movimento
                    </Label>
                    <Switch
                      id="movementAlert"
                      checked={alertSettings.movementAlert}
                      onCheckedChange={(checked) => updateAlertSetting('movementAlert', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="geofenceAlert" className="text-sm">
                      Alerta de Geocerca
                    </Label>
                    <Switch
                      id="geofenceAlert"
                      checked={alertSettings.geofenceAlert}
                      onCheckedChange={(checked) => updateAlertSetting('geofenceAlert', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="speedAlert" className="text-sm">
                      Alerta de Velocidade
                    </Label>
                    <Switch
                      id="speedAlert"
                      checked={alertSettings.speedAlert}
                      onCheckedChange={(checked) => updateAlertSetting('speedAlert', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenanceAlert" className="text-sm">
                      Lembrete de Manutenção
                    </Label>
                    <Switch
                      id="maintenanceAlert"
                      checked={alertSettings.maintenanceAlert}
                      onCheckedChange={(checked) => updateAlertSetting('maintenanceAlert', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Tipos de Alerta</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-2 bg-red-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="text-sm font-medium text-red-800">Crítico</p>
                        <p className="text-xs text-red-600">Situações de emergência</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-yellow-50 rounded-lg">
                      <Bell className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">Atenção</p>
                        <p className="text-xs text-yellow-600">Situações que requerem atenção</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">Informativo</p>
                        <p className="text-xs text-blue-600">Informações gerais</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}

export default AlertScreen

