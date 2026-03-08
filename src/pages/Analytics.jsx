import { useState, useEffect, useMemo } from 'react'
import { TrendingUp, TrendingDown, Minus, BarChart3, PieChart } from 'lucide-react'
import GlucoseChart from '../components/GlucoseChart'
import { generate30DayData } from '../data/mockData'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

export default function Analytics() {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    setChartData(generate30DayData())
  }, [])

  const stats = useMemo(() => {
    if (chartData.length === 0) return null

    const values = chartData.map((d) => d.glucose)
    const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length)
    const max = Math.max(...values)
    const min = Math.min(...values)

    // Calculate trend
    const firstHalf = values.slice(0, Math.floor(values.length / 2))
    const secondHalf = values.slice(Math.floor(values.length / 2))
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length
    const trendPercent = (((secondAvg - firstAvg) / firstAvg) * 100).toFixed(1)

    // Calculate distribution
    const normal = values.filter((v) => v < 100).length
    const prediabetic = values.filter((v) => v >= 100 && v < 126).length
    const high = values.filter((v) => v >= 126).length

    return {
      avg,
      max,
      min,
      trend: parseFloat(trendPercent),
      distribution: { normal, prediabetic, high },
      total: values.length,
    }
  }, [chartData])

  const distributionData = useMemo(() => {
    if (!stats) return []
    return [
      { name: 'Normal', value: stats.distribution.normal, color: '#22c55e' },
      { name: 'Pre-diabetic', value: stats.distribution.prediabetic, color: '#f59e0b' },
      { name: 'High Risk', value: stats.distribution.high, color: '#ef4444' },
    ]
  }, [stats])

  const getTrendIcon = () => {
    if (!stats) return Minus
    if (stats.trend > 2) return TrendingUp
    if (stats.trend < -2) return TrendingDown
    return Minus
  }

  const getTrendColor = () => {
    if (!stats) return 'text-muted-foreground'
    if (stats.trend > 2) return 'text-danger'
    if (stats.trend < -2) return 'text-success'
    return 'text-muted-foreground'
  }

  const TrendIcon = getTrendIcon()

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">30-day glucose trend analysis and insights</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-2xl p-5 border border-border">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm">30-Day Average</span>
          </div>
          <div className="text-3xl font-bold text-foreground">
            {stats.avg}
            <span className="text-sm font-normal text-muted-foreground ml-1">mg/dL</span>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 border border-border">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <TrendIcon className={`w-4 h-4 ${getTrendColor()}`} />
            <span className="text-sm">Trend</span>
          </div>
          <div className={`text-3xl font-bold ${getTrendColor()}`}>
            {stats.trend > 0 ? '+' : ''}
            {stats.trend}%
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 border border-border">
          <div className="text-sm text-muted-foreground mb-2">Highest Reading</div>
          <div className="text-3xl font-bold text-danger">
            {stats.max}
            <span className="text-sm font-normal text-muted-foreground ml-1">mg/dL</span>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 border border-border">
          <div className="text-sm text-muted-foreground mb-2">Lowest Reading</div>
          <div className="text-3xl font-bold text-success">
            {stats.min}
            <span className="text-sm font-normal text-muted-foreground ml-1">mg/dL</span>
          </div>
        </div>
      </div>

      {/* 30-Day Chart */}
      <GlucoseChart data={chartData} title="30-Day Glucose Trend" />

      {/* Distribution Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribution Chart */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Reading Distribution</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={true} vertical={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  width={100}
                />
                <Tooltip
                  formatter={(value) => [`${value} readings`, 'Count']}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Summary */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-6">Distribution Summary</h3>
          <div className="space-y-4">
            {distributionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-4 bg-muted rounded-xl">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-foreground">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-foreground">{item.value} readings</div>
                  <div className="text-sm text-muted-foreground">
                    {((item.value / stats.total) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-primary/10 rounded-xl">
            <p className="text-sm text-foreground">
              <span className="font-semibold">Insight: </span>
              {stats.distribution.normal > stats.distribution.prediabetic + stats.distribution.high
                ? 'Most of your readings are in the normal range. Keep maintaining your healthy lifestyle!'
                : stats.distribution.prediabetic > stats.distribution.high
                ? 'You have several readings in the pre-diabetic range. Consider consulting your healthcare provider.'
                : 'Multiple high readings detected. Please schedule an appointment with your doctor.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
