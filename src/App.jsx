import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <Outlet />
      </main>
    </div>
  )
}
