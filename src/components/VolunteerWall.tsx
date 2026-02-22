import { motion } from "framer-motion";
import { Award, Star } from "lucide-react";

const volunteers = [
  "Sharnitha", "Anu", "Sharmila", "Shalini", "Santhiya", "Abi", "Dheeraj", "Nandhini", "Harini"
];

const badges = ["🌟", "💚", "🏆", "🌱", "💪", "❤️", "🔥", "✨", "🎯"];

const VolunteerWall = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-muted text-warm text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Volunteer Recognition
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Our Amazing Volunteers
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            These heroes make zero-waste possible through their tireless service
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {volunteers.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative p-5 rounded-2xl bg-card border border-border shadow-soft text-center group cursor-default"
            >
              <div className="w-14 h-14 mx-auto rounded-full gradient-hero flex items-center justify-center text-2xl mb-3">
                {badges[i]}
              </div>
              <h3 className="font-semibold text-foreground">{name}</h3>
              <div className="flex items-center justify-center gap-0.5 mt-2">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-3.5 h-3.5 fill-warm text-warm"
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground mt-1 block">Top Volunteer</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VolunteerWall;
