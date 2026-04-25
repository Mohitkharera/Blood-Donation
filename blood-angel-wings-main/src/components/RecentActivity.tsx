import { Droplets, UserPlus, Building2, FlaskConical, HeartPulse, Clock, ArrowRight } from "lucide-react";

const activities = [
  { icon: Droplets, text: "New donation received from John Doe", time: "2 min ago", iconBg: "bg-blood-red/10", iconColor: "text-blood-red" },
  { icon: UserPlus, text: "New donor registered: Sarah Smith", time: "15 min ago", iconBg: "bg-stat-green/10", iconColor: "text-stat-green" },
  { icon: Building2, text: "City Hospital requested 5 units of O+", time: "1 hour ago", iconBg: "bg-primary/10", iconColor: "text-primary" },
  { icon: FlaskConical, text: "Blood screening completed for batch #2847", time: "2 hours ago", iconBg: "bg-stat-orange/10", iconColor: "text-stat-orange" },
  { icon: HeartPulse, text: "Emergency request fulfilled: 3 units A-", time: "3 hours ago", iconBg: "bg-blood-red/10", iconColor: "text-blood-red" },
];

const RecentActivity = () => (
  <section className="mx-auto max-w-6xl px-4 pb-16">
    <div className="rounded-3xl border bg-card p-8 shadow-sm">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-stat-green/5 border border-stat-green/10 px-4 py-1.5 mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-stat-green opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-stat-green" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-stat-green">Live Feed</span>
          </div>
          <h2 className="text-2xl font-extrabold font-display text-foreground">Recent Activity</h2>
          <p className="mt-2 text-sm text-muted-foreground">Latest updates from the blood bank network</p>
        </div>
        <button className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-4">
          View All <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        {activities.map((a, i) => (
          <div
            key={i}
            className="group flex items-center gap-4 rounded-2xl border p-4 transition-all hover:shadow-md hover:border-primary/20 hover:bg-accent/30"
          >
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${a.iconBg} transition-transform group-hover:scale-110`}>
              <a.icon className={`h-5 w-5 ${a.iconColor}`} />
            </div>
            <p className="flex-1 text-sm font-medium text-foreground">{a.text}</p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0 rounded-full bg-secondary px-3 py-1.5">
              <Clock className="h-3 w-3" />
              {a.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default RecentActivity;
