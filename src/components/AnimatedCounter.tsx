import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface CounterProps {
  end: number;
  label: string;
  suffix?: string;
  icon: React.ReactNode;
  duration?: number;
}

const AnimatedCounter = ({ end, label, suffix = "", icon, duration = 2 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card shadow-soft border border-border"
    >
      <div className="text-primary text-3xl">{icon}</div>
      <div className="text-4xl font-bold text-foreground">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
    </motion.div>
  );
};

export default AnimatedCounter;
