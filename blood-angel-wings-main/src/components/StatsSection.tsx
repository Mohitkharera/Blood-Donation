import { Users, Droplets, HeartHandshake, CalendarDays, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";

const stats = [
  { icon: Users, value: "156", label: "Total Donors", trend: "+12%", up: true, accent: "from-primary to-stat-blue", iconBg: "bg-primary/10 text-primary" },
  { icon: Droplets, value: "342", label: "Total Donations", trend: "+8%", up: true, accent: "from-blood-red to-blood-pink", iconBg: "bg-blood-red/10 text-blood-red" },
  { icon: HeartHandshake, value: "1,026", label: "Lives Saved", trend: "+23%", up: true, accent: "from-stat-green to-blood-teal", iconBg: "bg-stat-green/10 text-stat-green" },
  { icon: CalendarDays, value: "28", label: "This Month", trend: "-3%", up: false, accent: "from-stat-orange to-blood-red", iconBg: "bg-stat-orange/10 text-stat-orange" },
];

const StatsSection = () => (
  <section className="relative -mt-12 z-20 mx-auto max-w-6xl px-4">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="group relative animate-fade-in-up overflow-hidden rounded-2xl bg-card p-6 shadow-lg border border-border/50 transition-all hover:shadow-xl hover:-translate-y-1"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          {/* Top accent line */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.accent} opacity-80`} />

          <div className="flex items-center justify-between mb-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg} transition-transform group-hover:scale-110`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
              stat.up ? "bg-stat-green/10 text-stat-green" : "bg-stat-red/10 text-stat-red"
            }`}>
              {stat.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {stat.trend}
            </div>
          </div>
          <p className="text-3xl font-extrabold font-display text-foreground tracking-tight">{stat.value}</p>
          <div className="mt-1.5 flex items-center justify-between">
            <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default StatsSection;
