import clsx from 'clsx'

export default function RecentTests({ tests }) {
  const getStatusStyles = (color) => {
    const styles = {
      success: 'bg-success-light text-success',
      warning: 'bg-warning-light text-warning',
      danger: 'bg-danger-light text-danger',
    }
    return styles[color] || styles.success
  }

  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Tests</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Time
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Glucose
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tests.map((test) => (
              <tr key={test.id} className="hover:bg-muted/50 transition-colors">
                <td className="py-3 px-2 text-sm text-foreground">{test.timestamp}</td>
                <td className="py-3 px-2">
                  <span className="text-sm font-semibold text-foreground">
                    {test.glucose} <span className="text-muted-foreground font-normal">mg/dL</span>
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span
                    className={clsx(
                      'px-2 py-1 rounded-full text-xs font-medium',
                      getStatusStyles(test.statusColor)
                    )}
                  >
                    {test.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
