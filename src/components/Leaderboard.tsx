import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";

const campuses = [
  { name: "Green Valley Engineering", meals: 2450, badge: "🥇", rank: 1 },
  { name: "Sunrise Institute of Tech", meals: 2100, badge: "🥈", rank: 2 },
  { name: "Coastal Engineering College", meals: 1850, badge: "🥉", rank: 3 },
  { name: "Mountain View University", meals: 1620, badge: "🏅", rank: 4 },
  { name: "Riverdale Polytechnic", meals: 1400, badge: "🏅", rank: 5 },
  { name: "Lakeside Tech Academy", meals: 1180, badge: "🏅", rank: 6 },
];

const Leaderboard = () => {
  const maxMeals = campuses[0].meals;

  return (
    <section className="py-16 px-4 bg-muted/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            <Trophy className="w-4 h-4" />
            Campus Leaderboard
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Zero-Waste Champions
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-3">
          {campuses.map((campus, i) => (
            <motion.div
              key={campus.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-xl bg-card border border-border ${
                i === 0 ? "shadow-warm ring-2 ring-warm/20" : "shadow-soft"
              }`}
            >
              <span className="text-2xl w-10 text-center">{campus.badge}</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-foreground truncate">{campus.name}</div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(campus.meals / maxMeals) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-foreground">{campus.meals.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">meals</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
