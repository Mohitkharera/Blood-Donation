import { Building2, Users, UserPlus, Brain, Award, CalendarPlus, BarChart3, ArrowRight } from "lucide-react";

const actions = [
  { icon: Building2, label: "Partner Hospitals", desc: "Find hospitals in our network", gradient: "from-primary/10 to-stat-blue/10", iconColor: "text-primary", hoverBorder: "hover:border-primary/30" },
  { icon: Users, label: "View Donors", desc: "Browse and search donors", gradient: "from-blood-red/10 to-blood-pink/10", iconColor: "text-blood-red", hoverBorder: "hover:border-blood-red/30" },
  { icon: UserPlus, label: "Add Donor", desc: "Register a new donor", gradient: "from-stat-green/10 to-blood-teal/10", iconColor: "text-stat-green", hoverBorder: "hover:border-stat-green/30" },
  { icon: Brain, label: "Smart Match", desc: "AI-powered donor matching", gradient: "from-stat-orange/10 to-blood-red/10", iconColor: "text-stat-orange", hoverBorder: "hover:border-stat-orange/30" },
  { icon: Award, label: "Rewards", desc: "Donor achievements", gradient: "from-blood-pink/10 to-blood-purple/10", iconColor: "text-blood-pink", hoverBorder: "hover:border-blood-pink/30" },
  { icon: CalendarPlus, label: "Schedule", desc: "Book an appointment", gradient: "from-blood-teal/10 to-stat-green/10", iconColor: "text-blood-teal", hoverBorder: "hover:border-blood-teal/30" },
  { icon: BarChart3, label: "Reports", desc: "View statistics", gradient: "from-blood-purple/10 to-primary/10", iconColor: "text-blood-purple", hoverBorder: "hover:border-blood-purple/30" },
];

const QuickActions = () => (
  <section className="mx-auto max-w-6xl px-4 py-16">
    <div className="text-center mb-10">
      <div className="inline-flex items-center gap-2 rounded-full bg-primary/5 border border-primary/10 px-4 py-1.5 mb-4">
        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">Quick Access</span>
      </div>
      <h2 className="text-2xl font-extrabold font-display text-foreground sm:text-3xl">Quick Actions</h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">Access key features of your blood bank management system</p>
    </div>

    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
      {actions.map((action) => (
        <div
          key={action.label}
          className={`group relative flex flex-col items-center rounded-2xl border bg-card p-5 text-center transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer ${action.hoverBorder}`}
        >
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${action.gradient} mb-3 transition-transform group-hover:scale-110`}>
            <action.icon className={`h-6 w-6 ${action.iconColor}`} />
          </div>
          <h3 className="text-sm font-bold text-foreground mb-1">{action.label}</h3>
          <p className="text-[11px] text-muted-foreground leading-relaxed">{action.desc}</p>
          <ArrowRight className="mt-3 h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
        </div>
      ))}
    </div>
  </section>
);

export default QuickActions;
