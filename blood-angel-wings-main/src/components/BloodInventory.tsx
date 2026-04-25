import { Droplets, AlertTriangle, CheckCircle2 } from "lucide-react";

const bloodTypes = [
  { group: "A+", bottles: 45, pct: 29, gradient: "from-red-500 to-rose-600", status: "good" },
  { group: "A-", bottles: 12, pct: 8, gradient: "from-red-400 to-red-500", status: "low" },
  { group: "B+", bottles: 18, pct: 12, gradient: "from-blue-500 to-indigo-600", status: "moderate" },
  { group: "B-", bottles: 6, pct: 4, gradient: "from-blue-400 to-blue-500", status: "critical" },
  { group: "AB+", bottles: 8, pct: 5, gradient: "from-purple-500 to-violet-600", status: "low" },
  { group: "AB-", bottles: 3, pct: 2, gradient: "from-purple-400 to-purple-500", status: "critical" },
  { group: "O+", bottles: 52, pct: 33, gradient: "from-emerald-500 to-teal-600", status: "good" },
  { group: "O-", bottles: 12, pct: 8, gradient: "from-teal-500 to-cyan-600", status: "low" },
];

const statusConfig = {
  good: { label: "Good Stock", color: "text-stat-green", bg: "bg-stat-green/10", icon: CheckCircle2 },
  moderate: { label: "Moderate", color: "text-stat-orange", bg: "bg-stat-orange/10", icon: AlertTriangle },
  low: { label: "Low Stock", color: "text-stat-orange", bg: "bg-stat-orange/10", icon: AlertTriangle },
  critical: { label: "Critical", color: "text-stat-red", bg: "bg-stat-red/10", icon: AlertTriangle },
};

const BloodInventory = () => (
  <section className="mx-auto max-w-6xl px-4 py-12">
    <div className="rounded-3xl border bg-card p-8 shadow-sm">
      <div className="flex items-start justify-between mb-10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blood-red/5 border border-blood-red/10 px-4 py-1.5 mb-4">
            <Droplets className="h-3.5 w-3.5 text-blood-red" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-blood-red">Inventory</span>
          </div>
          <h2 className="text-2xl font-extrabold font-display text-foreground sm:text-3xl">Blood Type Distribution</h2>
          <p className="mt-2 text-sm text-muted-foreground">Current stock levels across all blood groups</p>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-stat-green" /> Good</div>
          <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-stat-orange" /> Low</div>
          <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-stat-red" /> Critical</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        {bloodTypes.map((bt) => {
          const s = statusConfig[bt.status as keyof typeof statusConfig];
          const StatusIcon = s.icon;
          return (
            <div key={bt.group} className="group rounded-2xl border overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
              <div className={`relative bg-gradient-to-br ${bt.gradient} px-5 py-6 text-center`}>
                <span className="text-3xl font-extrabold text-white font-display drop-shadow-sm">{bt.group}</span>
                <Droplets className="absolute top-3 right-3 h-5 w-5 text-white/20" />
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
              <div className="p-4 bg-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-foreground">{bt.bottles} Units</span>
                  <span className="text-sm font-extrabold text-primary">{bt.pct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${bt.gradient} transition-all duration-700`}
                    style={{ width: `${Math.min(bt.pct * 3, 100)}%` }}
                  />
                </div>
                <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 ${s.bg}`}>
                  <StatusIcon className={`h-3 w-3 ${s.color}`} />
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${s.color}`}>{s.label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default BloodInventory;
