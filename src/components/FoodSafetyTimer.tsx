import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, AlertTriangle } from "lucide-react";

interface FoodSafetyTimerProps {
  prepTime: string; // ISO date string
  maxHours?: number;
}

const FoodSafetyTimer = ({ prepTime, maxHours = 4 }: FoodSafetyTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);
  const [percentage, setPercentage] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      const prep = new Date(prepTime).getTime();
      const expiry = prep + maxHours * 60 * 60 * 1000;
      const now = Date.now();
      const diff = expiry - now;

      if (diff <= 0) {
        setExpired(true);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        setPercentage(0);
        clearInterval(interval);
        return;
      }

      const total = maxHours * 60 * 60 * 1000;
      setPercentage((diff / total) * 100);

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [prepTime, maxHours]);

  const colorClass = expired
    ? "text-destructive"
    : percentage < 25
    ? "text-warm"
    : "text-primary";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-4 rounded-xl border ${
        expired ? "border-destructive bg-destructive/5" : "border-border bg-card"
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        {expired ? (
          <AlertTriangle className="w-5 h-5 text-destructive" />
        ) : (
          <Clock className={`w-5 h-5 ${colorClass}`} />
        )}
        <span className="text-sm font-semibold text-foreground">
          {expired ? "Food Safety Expired!" : "Food Safety Countdown"}
        </span>
      </div>

      <div className="flex justify-center gap-3 mb-3">
        {[
          { val: timeLeft.hours, label: "HRS" },
          { val: timeLeft.minutes, label: "MIN" },
          { val: timeLeft.seconds, label: "SEC" },
        ].map((unit) => (
          <div key={unit.label} className="text-center">
            <div className={`text-2xl font-bold ${colorClass}`}>
              {String(unit.val).padStart(2, "0")}
            </div>
            <div className="text-xs text-muted-foreground">{unit.label}</div>
          </div>
        ))}
      </div>

      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${
            expired ? "bg-destructive" : percentage < 25 ? "bg-warm" : "bg-primary"
          }`}
          initial={{ width: "100%" }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

export default FoodSafetyTimer;
