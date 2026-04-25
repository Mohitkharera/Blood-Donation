import { Heart, Droplets, Shield, Activity, ChevronRight, Zap, Clock } from "lucide-react";

const HeroSection = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--hero-from))] via-[hsl(217,90%,58%)] to-[hsl(var(--hero-to))] py-24 px-4">
    {/* Mesh gradient overlays */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_80%,hsl(var(--blood-red)/0.15),transparent)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_20%,hsl(var(--blood-purple)/0.12),transparent)]" />

    {/* Grid pattern */}
    <div className="absolute inset-0 opacity-[0.04]" style={{
      backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
      backgroundSize: "40px 40px"
    }} />

    {/* Floating elements */}
    <div className="absolute top-20 left-[8%] animate-float-slow opacity-15">
      <Heart className="h-16 w-16 text-white" />
    </div>
    <div className="absolute top-12 right-[12%] animate-float opacity-10">
      <Droplets className="h-32 w-32 text-white" />
    </div>
    <div className="absolute bottom-20 left-[4%] animate-float opacity-10">
      <Droplets className="h-24 w-24 text-white" />
    </div>
    <div className="absolute top-40 right-[40%] animate-float-slow opacity-[0.07]">
      <Heart className="h-14 w-14 text-white" />
    </div>
    <div className="absolute bottom-12 right-[8%] animate-float opacity-[0.08]">
      <Heart className="h-20 w-20 text-white" />
    </div>

    {/* Glow circles */}
    <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
    <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

    <div className="relative z-10 mx-auto max-w-4xl text-center">
      {/* Badge */}
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-md shadow-lg shadow-black/5">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
          <Zap className="h-3 w-3 text-white" />
        </div>
        <span className="text-sm font-semibold text-white">Hospital Blood Bank Management System</span>
      </div>

      {/* Title */}
      <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight">
        Welcome to
        <br />
        <span className="relative inline-block mt-2">
          <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
            Blood Donation
          </span>
          <span className="absolute -bottom-3 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-white/80 via-white/40 to-transparent" />
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mx-auto mt-8 max-w-2xl text-base text-white/80 sm:text-lg leading-relaxed">
        Manage and track blood donation activities across partner hospitals with real-time inventory monitoring and smart donor matching
      </p>

      {/* CTA Buttons */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button className="group inline-flex items-center gap-2.5 rounded-2xl bg-white px-7 py-3.5 text-sm font-bold text-foreground shadow-xl shadow-black/10 transition-all hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98]">
          <Droplets className="h-4.5 w-4.5 text-primary" />
          Donate Now
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
        <button className="inline-flex items-center gap-2.5 rounded-2xl bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md border border-white/20 transition-all hover:bg-white/20 hover:border-white/30 active:scale-[0.98]">
          <Heart className="h-4.5 w-4.5 fill-white/80" />
          Find Blood Bank
        </button>
      </div>

      {/* Trust badges */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-5 text-sm text-white/70">
        <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 backdrop-blur-sm border border-white/10">
          <Shield className="h-4 w-4 text-white/80" />
          <span className="font-medium">FDA Compliant</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 backdrop-blur-sm border border-white/10">
          <Clock className="h-4 w-4 text-white/80" />
          <span className="font-medium">24/7 Available</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 backdrop-blur-sm border border-white/10">
          <Activity className="h-4 w-4 text-white/80" />
          <span className="font-medium">Real-time Tracking</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 backdrop-blur-sm border border-white/10">
          <Heart className="h-4 w-4 text-white/80" />
          <span className="font-medium">1000+ Lives Saved</span>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
