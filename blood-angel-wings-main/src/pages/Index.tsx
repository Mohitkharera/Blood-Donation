import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import QuickActions from "@/components/QuickActions";
import BloodInventory from "@/components/BloodInventory";
import RecentActivity from "@/components/RecentActivity";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <StatsSection />
      <QuickActions />
      <BloodInventory />
      <RecentActivity />
      <Footer />
    </div>
  );
};

export default Index;
