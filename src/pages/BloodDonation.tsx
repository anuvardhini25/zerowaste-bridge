import { useState } from "react";
import { motion } from "framer-motion";
import { Droplets, ArrowRight, Search, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import QuotePopup from "@/components/QuotePopup";
import Navbar from "@/components/Navbar";

const bloodQuotes = ["A drop you give helps someone live."];

const mockDonors = [
  { name: "Dheeraj", blood: "O+", distance: "1.2 km", available: true },
  { name: "Nandhini", blood: "A+", distance: "2.5 km", available: true },
  { name: "Harini", blood: "B+", distance: "3.1 km", available: true },
  { name: "Anu", blood: "O-", distance: "4.0 km", available: false },
  { name: "Shalini", blood: "AB+", distance: "5.2 km", available: true },
];

const BloodDonation = () => {
  const [mode, setMode] = useState<"register" | "request">("register");
  const [showQuote, setShowQuote] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [searchBlood, setSearchBlood] = useState("");
  const [searchResults, setSearchResults] = useState<typeof mockDonors | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setShowQuote(true);
  };

  const handleSearch = () => {
    const results = mockDonors.filter(
      (d) => !searchBlood || d.blood === searchBlood
    );
    setSearchResults(results);
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blood-muted text-blood text-sm font-medium mb-4">
              <Droplets className="w-4 h-4" />
              Blood Donation
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Blood Donation Hub</h1>
            <p className="text-muted-foreground">Save lives — register as a donor or request blood</p>
          </div>

          {/* Mode toggle */}
          <div className="flex justify-center gap-3 mb-8">
            <Button
              variant={mode === "register" ? "default" : "outline"}
              onClick={() => { setMode("register"); setSubmitted(false); }}
              className="rounded-xl"
            >
              Register as Donor
            </Button>
            <Button
              variant={mode === "request" ? "default" : "outline"}
              onClick={() => setMode("request")}
              className="rounded-xl bg-blood text-blood-foreground hover:bg-blood/90"
              style={mode === "request" ? {} : { backgroundColor: "transparent", color: "hsl(var(--blood))", borderColor: "hsl(var(--blood))" }}
            >
              <AlertTriangle className="w-4 h-4 mr-1" /> Emergency Request
            </Button>
          </div>

          {mode === "register" && !submitted && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleRegister}
              className="space-y-5 bg-card p-6 md:p-8 rounded-2xl border border-border shadow-blood"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your name" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+91 XXXXX XXXXX" required className="mt-1" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Blood Group</Label>
                  <Select required>
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
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, State" required className="mt-1" />
              </div>
              <div className="flex items-center gap-3">
                <Switch id="available" defaultChecked />
                <Label htmlFor="available">Available for emergency donations</Label>
              </div>
              <Button type="submit" size="lg" className="w-full rounded-xl bg-blood hover:bg-blood/90 text-blood-foreground">
                Register <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.form>
          )}

          {mode === "register" && submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-blood-muted p-8 rounded-2xl border border-blood/20"
            >
              <Droplets className="w-16 h-16 text-blood mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Thank You, Hero!</h3>
              <p className="text-muted-foreground">You're now registered as a blood donor</p>
            </motion.div>
          )}

          {mode === "request" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-card p-6 rounded-2xl border border-border shadow-blood">
                <h3 className="text-lg font-semibold text-foreground mb-4">Find Matching Donors</h3>
                <div className="flex gap-3">
                  <Select onValueChange={setSearchBlood}>
                    <SelectTrigger><SelectValue placeholder="Blood Group" /></SelectTrigger>
                    <SelectContent>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                        <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={handleSearch} className="bg-blood hover:bg-blood/90 text-blood-foreground">
                    <Search className="w-4 h-4 mr-1" /> Search
                  </Button>
                </div>
              </div>

              {searchResults && (
                <div className="space-y-3">
                  {searchResults.map((donor, i) => (
                    <motion.div
                      key={donor.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between p-4 bg-card rounded-xl border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full gradient-blood flex items-center justify-center text-sm font-bold text-blood-foreground">
                          {donor.blood}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{donor.name}</div>
                          <div className="text-xs text-muted-foreground">{donor.distance} away</div>
                        </div>
                      </div>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                        donor.available ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                        {donor.available ? "Available" : "Unavailable"}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      <QuotePopup
        isOpen={showQuote}
        onClose={() => setShowQuote(false)}
        quotes={bloodQuotes}
        title="You're a Lifesaver!"
        variant="blood"
      />
    </div>
  );
};

export default BloodDonation;
