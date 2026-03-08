import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'

export default function GlucoseChart({ data, title = '7-Day Glucose Trend' }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value
      let status = 'Normal'
      let statusColor = '#22c55e'
      
      if (value >= 126) {
        status = 'High Risk'
        statusColor = '#ef4444'
      } else if (value >= 100) {
        status = 'Pre-diabetic'
        statusColor = '#f59e0b'
      }

      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-2xl font-bold" style={{ color: statusColor }}>
            {value} <span className="text-sm font-normal text-muted-foreground">mg/dL</span>
          </p>
          <p className="text-xs" style={{ color: statusColor }}>{status}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-6">{title}</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis
              domain={[60, 180]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={100}
              stroke="#22c55e"
              strokeDasharray="5 5"
              label={{ value: 'Normal', position: 'right', fill: '#22c55e', fontSize: 11 }}
            />
            <ReferenceLine
              y={126}
              stroke="#ef4444"
              strokeDasharray="5 5"
              label={{ value: 'High', position: 'right', fill: '#ef4444', fontSize: 11 }}
            />
            <Line
              type="monotone"
              dataKey="glucose"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#2563eb' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-muted-foreground">{'< 100 Normal'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning" />
          <span className="text-muted-foreground">100-125 Pre-diabetic</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-danger" />
          <span className="text-muted-foreground">{'>= 126 High Risk'}</span>
        </div>
      </div>
    </div>
  )
}
