import clsx from 'clsx'

export default function HealthCard({ title, value, unit, icon: Icon, status, subtitle }) {
  const statusStyles = {
    success: {
      bg: 'bg-success-light',
      text: 'text-success',
      border: 'border-success/20',
    },
    warning: {
      bg: 'bg-warning-light',
      text: 'text-warning',
      border: 'border-warning/20',
    },
    danger: {
      bg: 'bg-danger-light',
      text: 'text-danger',
      border: 'border-danger/20',
    },
    default: {
      bg: 'bg-muted',
      text: 'text-primary',
      border: 'border-border',
    },
  }

  const style = statusStyles[status] || statusStyles.default

  return (
    <div
      className={clsx(
        'bg-card rounded-2xl p-6 border-2 transition-all hover:shadow-lg',
        style.border
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={clsx('p-3 rounded-xl', style.bg)}>
          <Icon className={clsx('w-6 h-6', style.text)} />
        </div>
        {status && status !== 'default' && (
          <span
            className={clsx(
              'px-3 py-1 rounded-full text-xs font-medium',
              style.bg,
              style.text
            )}
          >
            {status === 'success' ? 'Normal' : status === 'warning' ? 'Caution' : 'Alert'}
          </span>
        )}
      </div>
      <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
      <div className="flex items-baseline gap-1">
        <span className={clsx('text-3xl font-bold', style.text)}>{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>
      )}
    </div>
  )
}
