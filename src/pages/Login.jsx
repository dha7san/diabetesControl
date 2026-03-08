import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Activity, Mail, Lock, ArrowRight } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false)
      navigate('/dashboard')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
              <Activity className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <span className="text-xl font-bold text-primary-foreground">GlucoSense</span>
              <span className="text-primary-foreground/70 text-sm block">IoT Health Monitor</span>
            </div>
          </div>
        </div>
        
        <div>
          <h1 className="text-4xl font-bold text-primary-foreground leading-tight mb-6">
            Smart Diabetes Screening at Home
          </h1>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Automated bathroom-based glucose monitoring system. Get real-time health insights 
            with our non-invasive IoT sensors. Early detection saves lives.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-primary-foreground/10 rounded-xl p-4">
            <div className="text-3xl font-bold text-primary-foreground">24/7</div>
            <div className="text-sm text-primary-foreground/70">Monitoring</div>
          </div>
          <div className="bg-primary-foreground/10 rounded-xl p-4">
            <div className="text-3xl font-bold text-primary-foreground">99%</div>
            <div className="text-sm text-primary-foreground/70">Accuracy</div>
          </div>
          <div className="bg-primary-foreground/10 rounded-xl p-4">
            <div className="text-3xl font-bold text-primary-foreground">10s</div>
            <div className="text-sm text-primary-foreground/70">Results</div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Activity className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <span className="text-xl font-bold text-foreground">GlucoSense</span>
              <span className="text-muted-foreground text-sm block">IoT Health Monitor</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back</h2>
          <p className="text-muted-foreground mb-8">Sign in to access your health dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            {"Don't have an account? "}
            <a href="#" className="text-primary font-medium hover:underline">
              Contact your healthcare provider
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
