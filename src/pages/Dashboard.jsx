import { useState, useEffect } from 'react'
import { Activity, Droplets, Clock, TrendingUp, RefreshCw } from 'lucide-react'
import HealthCard from '../components/HealthCard'
import GlucoseChart from '../components/GlucoseChart'
import AlertBox from '../components/AlertBox'
import RecentTests from '../components/RecentTests'
import {
  generateHealthMetrics,
  generate7DayData,
  generateRecentTests,
} from '../data/mockData'

export default function Dashboard() {
  const [metrics, setMetrics] = useState(generateHealthMetrics())
  const [chartData, setChartData] = useState(generate7DayData())
  const [recentTests, setRecentTests] = useState(generateRecentTests())
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Auto-refresh data every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData()
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const refreshData = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setMetrics(generateHealthMetrics())
      setChartData(generate7DayData())
      setRecentTests(generateRecentTests())
      setLastUpdate(new Date())
      setIsRefreshing(false)
    }, 500)
  }

  const getAlertType = () => {
    if (metrics.currentGlucose >= 126) return 'danger'
    if (metrics.currentGlucose >= 100) return 'warning'
    return 'success'
  }

  const getAlertContent = () => {
    const type = getAlertType()
    if (type === 'danger') {
      return {
        title: 'High Glucose Alert',
        message: 'Your current glucose level is above normal range. Please consult your healthcare provider.',
      }
    }
    if (type === 'warning') {
      return {
        title: 'Elevated Glucose Level',
        message: 'Your glucose level is in the pre-diabetic range. Monitor closely and maintain a healthy lifestyle.',
      }
    }
    return {
      title: 'Glucose Level Normal',
      message: 'Your current glucose reading is within the healthy range. Keep up the good work!',
    }
  }

  const alert = getAlertContent()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Health Dashboard</h1>
          <p className="text-muted-foreground">Real-time glucose monitoring from your IoT sensor</p>
        </div>
        <button
          onClick={refreshData}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Last Update */}
      <p className="text-xs text-muted-foreground">
        Last updated: {lastUpdate.toLocaleTimeString()}
      </p>

      {/* Alert */}
      <AlertBox type={getAlertType()} title={alert.title} message={alert.message} />

      {/* Health Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <HealthCard
          title="Current Glucose"
          value={metrics.currentGlucose}
          unit="mg/dL"
          icon={Droplets}
          status={metrics.status.color}
          subtitle={`Status: ${metrics.status.label}`}
        />
        <HealthCard
          title="7-Day Average"
          value={metrics.avgGlucose7Day}
          unit="mg/dL"
          icon={TrendingUp}
          status={metrics.avgGlucose7Day < 100 ? 'success' : metrics.avgGlucose7Day < 126 ? 'warning' : 'danger'}
        />
        <HealthCard
          title="Tests Today"
          value={metrics.testsToday}
          icon={Activity}
          status="default"
          subtitle="Automatic readings"
        />
        <HealthCard
          title="Last Test"
          value={metrics.lastTestTime}
          icon={Clock}
          status="default"
          subtitle="IoT Sensor Active"
        />
      </div>

      {/* Chart and Recent Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlucoseChart data={chartData} />
        </div>
        <div>
          <RecentTests tests={recentTests} />
        </div>
      </div>
    </div>
  )
}
