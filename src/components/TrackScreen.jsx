import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MapPin, Navigation, Clock, Route, Zap, Target } from 'lucide-react'
import BottomNavigation from './BottomNavigation'

const TrackScreen = ({ vehicleData }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('24h')
  const [mapView, setMapView] = useState('current') // 'current' ou 'history'
  const [currentLocation, setCurrentLocation] = useState({
    lat: -23.5505,
    lng: -46.6333,
    address: 'Av. Paulista, 1000 - São Paulo, SP'
  })

  // Simular histórico de rotas
  const [routeHistory] = useState([
    {
      id: 1,
      time: '08:30',
      location: 'Casa - Rua das Flores, 123',
      type: 'departure'
    },
    {
      id: 2,
      time: '09:15',
      location: 'Trabalho - Av. Paulista, 1000',
      type: 'arrival'
    },
    {
      id: 3,
      time: '12:30',
      location: 'Restaurante - Rua Augusta, 500',
      type: 'stop'
    },
    {
      id: 4,
      time: '13:45',
      location: 'Trabalho - Av. Paulista, 1000',
      type: 'arrival'
    },
    {
      id: 5,
      time: '18:00',
      location: 'Shopping - Av. Rebouças, 3970',
      type: 'stop'
    }
  ])

  // Simular pontos de interesse
  const [pointsOfInterest] = useState([
    { id: 1, name: 'Casa', address: 'Rua das Flores, 123', type: 'home' },
    { id: 2, name: 'Trabalho', address: 'Av. Paulista, 1000', type: 'work' },
    { id: 3, name: 'Escola', address: 'Rua da Educação, 456', type: 'school' }
  ])

  const getLocationIcon = (type) => {
    switch (type) {
      case 'departure': return '🚗'
      case 'arrival': return '📍'
      case 'stop': return '⏸️'
      default: return '📍'
    }
  }

  const getLocationColor = (type) => {
    switch (type) {
      case 'departure': return 'text-blue-600'
      case 'arrival': return 'text-green-600'
      case 'stop': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  const formatTime = (time) => {
    return time
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-md mx-auto space-y-4">
          {/* Header */}
          <div className="text-center space-y-2 pt-4">
            <h1 className="text-2xl font-bold text-gray-900">Rastreamento</h1>
            <p className="text-gray-600">Localização e histórico do veículo</p>
          </div>

          {/* Controles */}
          <div className="flex space-x-2">
            <Button
              variant={mapView === 'current' ? 'default' : 'outline'}
              onClick={() => setMapView('current')}
              className="flex-1"
              size="sm"
            >
              <Navigation className="h-4 w-4 mr-2" />
              Atual
            </Button>
            <Button
              variant={mapView === 'history' ? 'default' : 'outline'}
              onClick={() => setMapView('history')}
              className="flex-1"
              size="sm"
            >
              <Route className="h-4 w-4 mr-2" />
              Histórico
            </Button>
          </div>

          {/* Mapa Simulado */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-red-600" />
                  <span>
                    {mapView === 'current' ? 'Localização Atual' : 'Histórico de Rotas'}
                  </span>
                </div>
                <Badge 
                  variant={vehicleData.isMoving ? "default" : "secondary"}
                  className={vehicleData.isMoving ? "bg-green-600" : "bg-gray-500"}
                >
                  {vehicleData.isMoving ? 'Ativo' : 'Parado'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Simulação do Mapa */}
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-8 gap-1 h-full">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className="bg-gray-400 rounded-sm"></div>
                    ))}
                  </div>
                </div>
                
                <div className="relative z-10">
                  <div className="text-4xl mb-2">🗺️</div>
                  <div className="text-2xl mb-2">📍</div>
                  <p className="text-sm font-medium text-gray-700">
                    {currentLocation.address}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Lat: {currentLocation.lat.toFixed(4)}, Lng: {currentLocation.lng.toFixed(4)}
                  </p>
                  
                  {mapView === 'history' && (
                    <div className="mt-4 flex justify-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-100"></div>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse delay-200"></div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {mapView === 'history' && (
            <>
              {/* Seletor de Período */}
              <Card className="shadow-sm">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Período:
                    </label>
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24h">Últimas 24h</SelectItem>
                        <SelectItem value="7d">Última semana</SelectItem>
                        <SelectItem value="30d">Último mês</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Histórico de Rotas */}
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>Histórico de Hoje</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {routeHistory.map((route) => (
                      <div key={route.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                        <div className="text-lg">
                          {getLocationIcon(route.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">
                            {route.location}
                          </p>
                          <p className={`text-xs ${getLocationColor(route.type)}`}>
                            {formatTime(route.time)} - {route.type === 'departure' ? 'Saída' : 
                             route.type === 'arrival' ? 'Chegada' : 'Parada'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Pontos de Interesse */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center space-x-2 text-sm">
                <Target className="h-4 w-4 text-purple-600" />
                <span>Pontos de Interesse</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {pointsOfInterest.map((poi) => (
                  <div key={poi.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-lg">
                        {poi.type === 'home' ? '🏠' : poi.type === 'work' ? '🏢' : '🏫'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{poi.name}</p>
                        <p className="text-xs text-gray-500">{poi.address}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <Card className="shadow-sm bg-blue-50 border-blue-200">
            <CardContent className="pt-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-800">5</div>
                  <div className="text-xs text-blue-600">Paradas Hoje</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-800">45km</div>
                  <div className="text-xs text-blue-600">Distância</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-800">2h 30m</div>
                  <div className="text-xs text-blue-600">Tempo Ativo</div>
                </div>
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

export default TrackScreen

