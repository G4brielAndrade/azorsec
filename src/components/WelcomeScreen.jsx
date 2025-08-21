import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Smartphone, QrCode } from 'lucide-react'

const WelcomeScreen = ({ userConfig, setUserConfig, appState, setAppState }) => {
  const [chipNumber, setChipNumber] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const validateChipNumber = async () => {
    if (!chipNumber || chipNumber.length !== 9) {
      setError('O número do chip deve ter 9 dígitos')
      return
    }

    setIsValidating(true)
    setError('')

    // Simular validação do chip (em um app real, seria uma chamada para API)
    setTimeout(() => {
      if (chipNumber === '123456789' || chipNumber.startsWith('999')) {
        setUserConfig({ ...userConfig, chipNumber })
        setAppState({ ...appState, isChipValidated: true })
        navigate('/config')
      } else {
        setError('Número do chip inválido. Tente 123456789 para demonstração.')
      }
      setIsValidating(false)
    }, 2000)
  }

  const handleChipNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 9)
    setChipNumber(value)
    setError('')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md space-y-8">
        {/* Logo e Título */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-4 rounded-full">
              <Shield className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Azor Sec</h1>
          <p className="text-lg text-gray-600">Rastreamento Veicular</p>
        </div>

        {/* Card Principal */}
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Bem-vindo(a)!</CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              O cliente adquirirá o produto da Azor Sec e, dentro da caixa, 
              encontrará o número que acompanha o rastreador. Esse número 
              deverá ser inserido já no início do aplicativo para acessar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Campo do Número do Chip */}
            <div className="space-y-2">
              <label htmlFor="chipNumber" className="text-sm font-medium text-gray-700">
                Número do chip:
              </label>
              <Input
                id="chipNumber"
                type="text"
                placeholder="123456789"
                value={chipNumber}
                onChange={handleChipNumberChange}
                className={`text-center text-lg tracking-wider ${error ? 'border-red-500' : ''}`}
                maxLength={9}
              />
              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}
            </div>

            {/* Botão de Acesso */}
            <Button 
              onClick={validateChipNumber}
              disabled={!chipNumber || isValidating}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              {isValidating ? 'Validando...' : 'Acessar'}
            </Button>

            {/* Informação sobre QR Code */}
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <QrCode className="h-4 w-4" />
              <span>Para baixar o app, escaneie o QR Code na caixa</span>
            </div>
          </CardContent>
        </Card>

        {/* Recursos do App */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="bg-green-100 p-3 rounded-full mx-auto w-fit">
              <Smartphone className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-xs text-gray-600">Praticidade</p>
          </div>
          <div className="space-y-2">
            <div className="bg-blue-100 p-3 rounded-full mx-auto w-fit">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-xs text-gray-600">Segurança</p>
          </div>
          <div className="space-y-2">
            <div className="bg-purple-100 p-3 rounded-full mx-auto w-fit">
              <QrCode className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-xs text-gray-600">Modernização</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen

