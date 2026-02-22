import { useState } from "react";
import { motion } from "framer-motion";
import { Utensils, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import QuotePopup from "@/components/QuotePopup";
import FoodSafetyTimer from "@/components/FoodSafetyTimer";
import Navbar from "@/components/Navbar";

const foodQuotes = [
  "From surplus plate to hopeful fate — your kindness will resonate.",
  "Less waste today, more smiles on the way.",
  "Food you give, helps someone live.",
  "From campus and kitchen, compassion is written.",
];

const DonateFood = () => {
  const [showQuote, setShowQuote] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [prepTime, setPrepTime] = useState("");
  const [surplusPrediction, setSurplusPrediction] = useState<number | null>(null);
  const [quantity, setQuantity] = useState("");

  const handleQuantityChange = (val: string) => {
    setQuantity(val);
    const num = parseInt(val);
    if (num > 0) {
      // Smart surplus prediction: estimate waste percentage based on quantity
      const wastePercent = num > 100 ? 35 : num > 50 ? 25 : 15;
      setSurplusPrediction(Math.round(num * (wastePercent / 100)));
    } else {
      setSurplusPrediction(null);
    }
  };

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              <Utensils className="w-4 h-4" />
              Food Donation
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Donate Surplus Food</h1>
            <p className="text-muted-foreground">Every meal counts — share your surplus and fight hunger</p>
          </div>

          {!submitted ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="space-y-5 bg-card p-6 md:p-8 rounded-2xl border border-border shadow-soft"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Food Type</Label>
                  <Select required>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cooked">Cooked Meals</SelectItem>
                      <SelectItem value="raw">Raw Ingredients</SelectItem>
                      <SelectItem value="packaged">Packaged Food</SelectItem>
                      <SelectItem value="bakery">Bakery Items</SelectItem>
                      <SelectItem value="fruits">Fruits & Vegetables</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Veg / Non-Veg</Label>
                  <Select required>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="veg">🥬 Vegetarian</SelectItem>
                      <SelectItem value="nonveg">🍗 Non-Vegetarian</SelectItem>
                      <SelectItem value="both">🍽️ Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantity (servings)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="e.g. 50"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="prep-time">Preparation Time</Label>
                  <Input
                    id="prep-time"
                    type="datetime-local"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Surplus Prediction */}
              {surplusPrediction !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="p-4 rounded-xl bg-accent border border-primary/20"
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-accent-foreground">
                    <span>📊</span>
                    Smart Surplus Prediction: ~<strong>{surplusPrediction}</strong> servings likely to go waste without donation
                  </div>
                </motion.div>
              )}

              {/* Food Safety Timer */}
              {prepTime && (
                <FoodSafetyTimer prepTime={prepTime} />
              )}

              <div>
                <Label htmlFor="location">Pickup Location</Label>
                <Input id="location" placeholder="Full address for pickup" required className="mt-1" />
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Allergens, special instructions..." className="mt-1" />
              </div>

              <Button type="submit" size="lg" className="w-full rounded-xl">
                Submit Donation <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-accent p-8 rounded-2xl border border-primary/20"
            >
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Donation Submitted!</h3>
              <p className="text-muted-foreground mb-4">NGOs nearby are being notified for pickup</p>
              <Button onClick={() => { setSubmitted(false); setQuantity(""); setPrepTime(""); setSurplusPrediction(null); }}>
                Donate More
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      <QuotePopup
        isOpen={showQuote}
        onClose={() => setShowQuote(false)}
        quotes={foodQuotes}
        title="Thank You for Donating!"
        variant="food"
      />
    </div>
  );
};

export default DonateFood;
