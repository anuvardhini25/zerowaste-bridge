import { useState } from "react";
import { motion } from "framer-motion";
import { Utensils, GraduationCap, Building, Users, Droplets, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import QuotePopup from "@/components/QuotePopup";
import Navbar from "@/components/Navbar";

const roles = [
  { id: "restaurant", label: "Restaurant", icon: <Utensils className="w-6 h-6" />, color: "gradient-card-warm" },
  { id: "college", label: "Engineering College", icon: <GraduationCap className="w-6 h-6" />, color: "gradient-card-green" },
  { id: "ngo", label: "NGO", icon: <Building className="w-6 h-6" />, color: "gradient-card-green" },
  { id: "volunteer", label: "Volunteer", icon: <Users className="w-6 h-6" />, color: "gradient-card-warm" },
  { id: "blood_donor", label: "Blood Donor", icon: <Droplets className="w-6 h-6" />, color: "gradient-card-blood" },
];

const roleQuotes: Record<string, string> = {
  restaurant: "From kitchen's pride to hunger's guide — your surplus turns the tide!",
  college: "Campus hearts that play their part — zero waste is just the start!",
  ngo: "Hands that serve with love so true — the world is better thanks to you!",
  volunteer: "A hero bold, with heart of gold — your story must be told!",
  blood_donor: "A drop you give helps someone live — the greatest gift to give!",
};

const Register = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [showQuote, setShowQuote] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setShowQuote(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Join ZeroWaste Bridge</h1>
            <p className="text-muted-foreground">Choose your role and be part of the change</p>
          </div>

          {/* Role selection */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-10">
            {roles.map((role) => (
              <motion.button
                key={role.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setSelectedRole(role.id); setSubmitted(false); }}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  selectedRole === role.id
                    ? "border-primary shadow-soft bg-accent"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <div className="flex justify-center text-primary mb-2">{role.icon}</div>
                <span className="text-xs font-medium text-foreground">{role.label}</span>
              </motion.button>
            ))}
          </div>

          {selectedRole && !submitted && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="space-y-5 bg-card p-6 md:p-8 rounded-2xl border border-border shadow-soft"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your name" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required className="mt-1" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+91 XXXXX XXXXX" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, State" required className="mt-1" />
                </div>
              </div>

              {selectedRole === "restaurant" && (
                <div>
                  <Label htmlFor="restaurant-name">Restaurant Name</Label>
                  <Input id="restaurant-name" placeholder="Your restaurant name" className="mt-1" />
                </div>
              )}

              {selectedRole === "college" && (
                <div>
                  <Label htmlFor="college-name">College Name</Label>
                  <Input id="college-name" placeholder="Your college name" className="mt-1" />
                </div>
              )}

              {selectedRole === "blood_donor" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Blood Group</Label>
                    <Select>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                          <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="last-donation">Last Donation Date</Label>
                    <Input id="last-donation" type="date" className="mt-1" />
                  </div>
                </div>
              )}

              <Button type="submit" size="lg" className="w-full rounded-xl">
                Register <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.form>
          )}

          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-accent p-8 rounded-2xl border border-primary/20"
            >
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Welcome aboard!</h3>
              <p className="text-muted-foreground">You've been registered as a {roles.find(r => r.id === selectedRole)?.label}</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      <QuotePopup
        isOpen={showQuote}
        onClose={() => setShowQuote(false)}
        quotes={[roleQuotes[selectedRole] || ""]}
        title="Welcome to ZeroWaste Bridge!"
        variant={selectedRole === "blood_donor" ? "blood" : "food"}
      />
    </div>
  );
};

export default Register;
