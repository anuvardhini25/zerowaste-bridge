import { motion } from "framer-motion";

const zones = [
  { name: "Downtown", level: "high", x: 20, y: 30 },
  { name: "East Side", level: "medium", x: 60, y: 25 },
  { name: "South District", level: "high", x: 35, y: 65 },
  { name: "West End", level: "low", x: 15, y: 55 },
  { name: "North Quarter", level: "medium", x: 50, y: 15 },
  { name: "Central Hub", level: "high", x: 45, y: 45 },
  { name: "Harbor Area", level: "low", x: 75, y: 60 },
  { name: "University Zone", level: "medium", x: 70, y: 35 },
];

const levelColors: Record<string, string> = {
  high: "bg-destructive",
  medium: "bg-warm",
  low: "bg-primary",
};

const levelSizes: Record<string, string> = {
  high: "w-6 h-6",
  medium: "w-5 h-5",
  low: "w-4 h-4",
};

const HungerHeatmap = () => {
  return (
    <div className="w-full">
      <div className="relative w-full aspect-[16/10] bg-muted rounded-2xl border border-border overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(10)].map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full border-t border-foreground" style={{ top: `${i * 10}%` }} />
          ))}
          {[...Array(10)].map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full border-l border-foreground" style={{ left: `${i * 10}%` }} />
          ))}
        </div>

        {zones.map((zone, i) => (
          <motion.div
            key={zone.name}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring" }}
            className="absolute group"
            style={{ left: `${zone.x}%`, top: `${zone.y}%`, transform: "translate(-50%, -50%)" }}
          >
            <div className={`${levelColors[zone.level]} ${levelSizes[zone.level]} rounded-full animate-pulse-soft`} />
            <div className={`absolute ${levelColors[zone.level]} ${levelSizes[zone.level]} rounded-full opacity-30 animate-ping`} />
            <div className="absolute left-1/2 -translate-x-1/2 -top-8 bg-card border border-border rounded-lg px-2 py-1 text-xs font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-soft">
              {zone.name}
              <span className={`ml-1 inline-block w-2 h-2 rounded-full ${levelColors[zone.level]}`} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-6 mt-4">
        {[
          { label: "High Need", color: "bg-destructive" },
          { label: "Medium", color: "bg-warm" },
          { label: "Low", color: "bg-primary" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className={`w-3 h-3 rounded-full ${item.color}`} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HungerHeatmap;
