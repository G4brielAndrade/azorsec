import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import WelcomeScreen from './components/WelcomeScreen'
import ConfigurationScreen from './components/ConfigurationScreen'
import PostConfigWelcome from './components/PostConfigWelcome'
import HomeScreen from './components/HomeScreen'
import TrackScreen from './components/TrackScreen'
import AlertScreen from './components/AlertScreen'
import MoreScreen from './components/MoreScreen'
import './App.css'

function App() {
  const [userConfig, setUserConfig] = useState({
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

  const [appState, setAppState] = useState({
    isChipValidated: false,
    isConfigured: false,
    isTrackerInstalled: false
  })

  const [vehicleData, setVehicleData] = useState({
    speed: 0,
    batteryLevel: 85,
    lastLocation: 'Av. Paulista, 1000 - São Paulo, SP',
    isMoving: false,
    batteryHealth: 'Saudável',
    lastUpdate: new Date()
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              !appState.isChipValidated ? (
                <WelcomeScreen 
                  userConfig={userConfig}
                  setUserConfig={setUserConfig}
                  appState={appState}
                  setAppState={setAppState}
                />
              ) : !appState.isConfigured ? (
                <Navigate to="/config" replace />
              ) : (
                <Navigate to="/post-config" replace />
              )
            } 
          />
          <Route 
            path="/config" 
            element={
              <ConfigurationScreen 
                userConfig={userConfig}
                setUserConfig={setUserConfig}
                appState={appState}
                setAppState={setAppState}
              />
            } 
          />
          <Route 
            path="/post-config" 
            element={
              <PostConfigWelcome 
                userConfig={userConfig}
                appState={appState}
                setAppState={setAppState}
              />
            } 
          />
          <Route 
            path="/home" 
            element={
              <HomeScreen 
                userConfig={userConfig}
                vehicleData={vehicleData}
                setVehicleData={setVehicleData}
              />
            } 
          />
          <Route 
            path="/track" 
            element={
              <TrackScreen 
                vehicleData={vehicleData}
              />
            } 
          />
          <Route 
            path="/alert" 
            element={
              <AlertScreen 
                userConfig={userConfig}
                vehicleData={vehicleData}
              />
            } 
          />
          <Route 
            path="/more" 
            element={
              <MoreScreen 
                userConfig={userConfig}
                setUserConfig={setUserConfig}
                appState={appState}
                setAppState={setAppState}
              />
            } 
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App

