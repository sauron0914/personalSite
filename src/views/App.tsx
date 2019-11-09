import { browserHistory, generateRoutes } from '@/router/Routes'
import React from 'react'
import { Router } from 'react-router-dom'
import { Store } from 'redux'
import './App.scss'

interface AppProps {
  store: Store
}

const App: React.FC<AppProps> = props => {
  return <Router history={browserHistory}>{generateRoutes(props.store)}</Router>
}

export default App
