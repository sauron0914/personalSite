import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { generateTestCompRoute } from '@/router/Routes'
import Dashbord from './Dashbord'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <BrowserRouter>{generateTestCompRoute(Dashbord)}</BrowserRouter>,
    </BrowserRouter>,
    div,
  )
  ReactDOM.unmountComponentAtNode(div)
})
