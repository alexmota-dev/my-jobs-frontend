import { createRoot } from 'react-dom/client'
import './index.css'
import Routes from './routes/index.tsx'
import { AuthProvider } from './contexts/auth.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <Routes />
  </AuthProvider>,
)
