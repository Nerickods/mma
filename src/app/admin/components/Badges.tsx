'use client'

interface QualityBadgeProps {
    label: string
    count: number
    color: 'green' | 'yellow' | 'orange' | 'red'
}

export function QualityBadge({
    label,
    count,
    color,
}: QualityBadgeProps) {
    const colorClasses = {
        green: 'bg-green-500/5 dark:bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20 hover:bg-green-500/10',
        yellow: 'bg-amber-500/5 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20 hover:bg-amber-500/10',
        orange: 'bg-orange-500/5 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/20 hover:bg-orange-500/10',
        red: 'bg-red-500/5 dark:bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20 hover:bg-red-500/10',
    }

    return (
        <div className={`p-4 rounded-xl border backdrop-blur-sm transition-colors duration-300 ${colorClasses[color]}`}>
            <p className="text-3xl font-bold mb-1 tracking-tight">{count}</p>
            <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">{label}</p>
        </div>
    )
}

export function SeverityBadge({ severity }: { severity: 'critical' | 'high' | 'medium' }) {
    const classes = {
        critical: 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-500/30',
        high: 'bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-500/30',
        medium: 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30',
    }

    return (
        <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${classes[severity]}`}>
            {severity}
        </span>
    )
}
