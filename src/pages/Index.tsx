import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Utensils, Droplets, Users, Leaf, ArrowRight, MapPin, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/AnimatedCounter";
import Leaderboard from "@/components/Leaderboard";
import VolunteerWall from "@/components/VolunteerWall";
import heroBg from "@/assets/hero-bg.jpg";
import Navbar from "@/components/Navbar";

const features = [
  {
    icon: <Utensils className="w-6 h-6" />,
    title: "Food Donation",
    desc: "Restaurants & colleges donate surplus food in real-time",
    link: "/donate-food",
    gradient: "gradient-card-green",
  },
  {
    icon: <Droplets className="w-6 h-6" />,
    title: "Blood Donation",
    desc: "Emergency blood matching & donor registration",
    link: "/blood-donation",
    gradient: "gradient-card-blood",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Volunteer Network",
    desc: "Pickup tracking & volunteer recognition",
    link: "/volunteers",
    gradient: "gradient-card-warm",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Hunger Heatmap",
    desc: "Geo-matched hunger zones & NGO distribution",
    link: "/dashboard",
    gradient: "gradient-card-green",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Zero waste" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              Smart Hunger & Life Relief Network
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              <span className="text-gradient-hero">ZeroWaste</span>{" "}
              <span className="text-foreground">Bridge</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connecting restaurants, colleges, NGOs, and volunteers to reduce food waste,
              fight hunger, and save lives through emergency blood donation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="text-lg px-8 h-13 rounded-xl">
                <Link to="/register">
                  Join the Movement <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 h-13 rounded-xl">
                <Link to="/donate-food">Donate Food</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Counters */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-2xl font-bold text-foreground mb-10"
          >
            Live Impact Tracker
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <AnimatedCounter end={12450} label="Meals Served" suffix="+" icon={<Utensils className="w-8 h-8" />} />
            <AnimatedCounter end={3200} label="Kg Food Saved" suffix=" kg" icon={<Leaf className="w-8 h-8" />} />
            <AnimatedCounter end={890} label="CO₂ Reduced (kg)" suffix="" icon={<TrendingUp className="w-8 h-8" />} />
            <AnimatedCounter end={156} label="Blood Units Donated" suffix="" icon={<Droplets className="w-8 h-8" />} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">How It Works</h2>
            <p className="mt-3 text-muted-foreground">Four pillars of community impact</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link
                  to={f.link}
                  className={`block p-6 rounded-2xl ${f.gradient} border border-border shadow-soft hover:shadow-lg transition-shadow h-full`}
                >
                  <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center text-primary-foreground mb-4">
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Food Request */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="gradient-warm rounded-3xl p-8 md:p-12 text-center shadow-warm"
          >
            <Heart className="w-12 h-12 text-warm-foreground mx-auto mb-4 animate-float" />
            <h2 className="text-3xl font-bold text-warm-foreground mb-3">Emergency Food Request</h2>
            <p className="text-warm-foreground/80 mb-6 max-w-lg mx-auto">
              Need immediate food assistance? Click below to send an emergency request to nearby NGOs and volunteers.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="bg-card text-warm hover:bg-card/90 border-0 text-lg px-8 rounded-xl font-semibold"
            >
              🚨 Request Emergency Food
            </Button>
          </motion.div>
        </div>
      </section>

      <Leaderboard />
      <VolunteerWall />

      {/* Footer */}
      <footer className="border-t border-border py-10 px-4 bg-muted/30">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Leaf className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">ZeroWaste Bridge</span>
          </div>
          <p>Smart Hunger & Life Relief Network — Making every meal count</p>
          <p className="mt-1">© 2026 ZeroWaste Bridge. Built with compassion.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
