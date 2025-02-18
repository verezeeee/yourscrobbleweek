import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import { LastFmProvider } from './contexts/LastFmContext.tsx'
import Result from './Result.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LastFmProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
          </Route>
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </LastFmProvider>
  </StrictMode>,
)
