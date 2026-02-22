import { motion } from "framer-motion";
import { Utensils, Droplets, Users, Leaf, TrendingUp, BarChart3 } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import HungerHeatmap from "@/components/HungerHeatmap";
import Leaderboard from "@/components/Leaderboard";
import Navbar from "@/components/Navbar";

const recentDonations = [
  { donor: "Green Valley Café", food: "Rice & Curry", qty: "120 servings", time: "15 min ago", type: "veg" },
  { donor: "Sunrise Canteen", food: "Bread & Sandwiches", qty: "80 servings", time: "32 min ago", type: "veg" },
  { donor: "Campus Kitchen", food: "Mixed Meals", qty: "200 servings", time: "1 hr ago", type: "both" },
  { donor: "City Restaurant", food: "Biryani", qty: "150 servings", time: "2 hrs ago", type: "nonveg" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Real-time platform analytics</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <AnimatedCounter end={12450} label="Total Food Donations" suffix="+" icon={<Utensils className="w-7 h-7" />} />
            <AnimatedCounter end={156} label="Blood Donors" icon={<Droplets className="w-7 h-7" />} />
            <AnimatedCounter end={89} label="Active Volunteers" icon={<Users className="w-7 h-7" />} />
            <AnimatedCounter end={3200} label="Kg Food Saved" suffix=" kg" icon={<Leaf className="w-7 h-7" />} />
          </div>

          {/* Heatmap + Recent Donations */}
          <div className="grid lg:grid-cols-2 gap-6 mb-10">
            <div className="bg-card p-6 rounded-2xl border border-border shadow-soft">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Hunger Heatmap
              </h3>
              <HungerHeatmap />
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border shadow-soft">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-warm" />
                Recent Donations
              </h3>
              <div className="space-y-3">
                {recentDonations.map((d, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm ${
                        d.type === "veg" ? "gradient-card-green text-primary" : "gradient-card-warm text-warm"
                      }`}>
                        {d.type === "veg" ? "🥬" : d.type === "nonveg" ? "🍗" : "🍽️"}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{d.donor}</div>
                        <div className="text-xs text-muted-foreground">{d.food} · {d.qty}</div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{d.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <Leaderboard />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
