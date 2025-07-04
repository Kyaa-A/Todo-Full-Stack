'use client';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'blue' | 'emerald' | 'purple';
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    value: 'text-blue-700'
  },
  emerald: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    value: 'text-emerald-700'
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    value: 'text-purple-700'
  }
};

export default function StatsCard({ title, value, icon, color }: StatsCardProps) {
  const colors = colorClasses[color];
  
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${colors.value}`}>{value}</p>
        </div>
        <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center`}>
          <div className={colors.text}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
} 