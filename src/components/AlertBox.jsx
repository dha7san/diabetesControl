import clsx from 'clsx'
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'

export default function AlertBox({ type = 'success', title, message }) {
  const styles = {
    success: {
      bg: 'bg-success-light',
      border: 'border-success/30',
      icon: CheckCircle,
      iconColor: 'text-success',
    },
    warning: {
      bg: 'bg-warning-light',
      border: 'border-warning/30',
      icon: AlertTriangle,
      iconColor: 'text-warning',
    },
    danger: {
      bg: 'bg-danger-light',
      border: 'border-danger/30',
      icon: AlertCircle,
      iconColor: 'text-danger',
    },
  }

  const style = styles[type] || styles.success
  const Icon = style.icon

  return (
    <div
      className={clsx(
        'rounded-xl p-4 border flex items-start gap-3',
        style.bg,
        style.border
      )}
    >
      <Icon className={clsx('w-5 h-5 mt-0.5 shrink-0', style.iconColor)} />
      <div>
        <h4 className={clsx('font-semibold text-sm', style.iconColor)}>{title}</h4>
        <p className="text-sm text-foreground/80 mt-1">{message}</p>
      </div>
    </div>
  )
}
