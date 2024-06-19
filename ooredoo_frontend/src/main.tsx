import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryProvider } from "@/lib/react-query/QueryProvider.tsx";
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
          <App />
      </QueryProvider>
      </BrowserRouter>
  </React.StrictMode>,
)

