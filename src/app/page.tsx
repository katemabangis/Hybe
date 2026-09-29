"use client";

import { useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flame,
  Leaf,
  Droplet,
  ShoppingBag,
  Star,
  CheckCircle2,
  Plus,
  Minus,
  Heart,
  ChevronDown,
} from "lucide-react";

type FlavorId = "yuzu" | "guava" | "midnight";

interface Flavor {
  id: FlavorId;
  name: string;
  tagline: string;
  description: string;
  notes: string[];
  color: string;
  bgGradient: string;
  image: string;
  stats: {
    calories: string;
    sugar: string;
    prebiotics: string;
    caffeine: string;
  };
  accentColor: string;
}

const FLAVORS: Record<FlavorId, Flavor> = {
  yuzu: {
    id: "yuzu",
    name: "Electric Yuzu",
    tagline: "Sun-drenched Japanese citrus with sparkling bergamot zest",
    description:
      "A high-voltage citrus rush crafted from authentic Shikoku Island yuzu, crushed bergamot peel, and organic agave nectar. Sharp, hyper-refreshing, and undeniably crisp.",
    notes: ["Japanese Yuzu", "Calabrian Bergamot", "Wild Lemongrass", "Crisp Sparkling Water"],
    color: "#E9FE00",
    bgGradient: "radial-gradient(circle at 50% 50%, rgba(233, 254, 0, 0.15) 0%, rgba(7, 9, 6, 0) 70%)",
    image: "/soda-yuzu.jpg",
    stats: {
      calories: "15 kcal",
      sugar: "3g agave",
      prebiotics: "5g plant fiber",
      caffeine: "0mg (Clean Energy)",
    },
    accentColor: "border-[#E9FE00] text-[#E9FE00]",
  },
  guava: {
    id: "guava",
    name: "Pink Guava Glow",
    tagline: "Tropical pink guava kissed with wild hibiscus and elderflower",
    description:
      "Tropical lushness reimagined. Hand-harvested pink guava purée steeped with wild hibiscus flowers and organic elderflower for a velvety, ruby-blush finish.",
    notes: ["Pink Guava Pulp", "Wild Egyptian Hibiscus", "Elderflower Blossom", "Prebiotic Chicory Root"],
    color: "#FF3B7A",
    bgGradient: "radial-gradient(circle at 50% 50%, rgba(255, 59, 122, 0.15) 0%, rgba(7, 9, 6, 0) 70%)",
    image: "/soda-guava.jpg",
    stats: {
      calories: "18 kcal",
      sugar: "3g agave",
      prebiotics: "5g plant fiber",
      caffeine: "0mg (Clean Energy)",
    },
    accentColor: "border-[#FF3B7A] text-[#FF3B7A]",
  },
  midnight: {
    id: "midnight",
    name: "Midnight Botanical",
    tagline: "Dark wild bing cherry with smoked Madagascar vanilla bean",
    description:
      "A modern rebellion against vintage colas. Infused with tart dark bing cherries, cold-extracted kola nut botanicals, and warm notes of smoked bourbon vanilla.",
    notes: ["Bing Cherry Essence", "Smoked Bourbon Vanilla", "Kola Nut Extract", "Clove & Nutmeg Spices"],
    color: "#8F42EC",
    bgGradient: "radial-gradient(circle at 50% 50%, rgba(143, 66, 236, 0.18) 0%, rgba(7, 9, 6, 0) 70%)",
    image: "/soda-midnight.jpg",
    stats: {
      calories: "20 kcal",
      sugar: "4g agave",
      prebiotics: "5g plant fiber",
      caffeine: "35mg Green Tea extract",
    },
    accentColor: "border-[#8F42EC] text-[#8F42EC]",
  },
};

const FAQ_ITEMS = [
  {
    q: "How does HYPERPOP stay under 20 calories without artificial sweeteners?",
    a: "We only use whole fruit purées, botanical distillates, and a hint of organic raw blue agave nectar (3g total). No stevia aftertaste, no erythritol, no monkfruit chemical extraction.",
  },
  {
    q: "What are the prebiotic fiber benefits?",
    a: "Every 330ml can packs 5g of natural chicory root inulin and Jerusalem artichoke fiber — feeding the beneficial bacteria in your gut microbiome for sustained metabolic vitality.",
  },
  {
    q: "How fast is cold-chain shipping?",
    a: "Orders ship within 24 hours in insulated, 100% biodegradable thermal packaging. 2-day priority delivery is free across the continental United States on 12-packs and subscriptions.",
  },
  {
    q: "Can I customize the flavor split in the 12-pack?",
    a: "Absolutely! Choose our 'Tasting Trio' or build your own custom 12-can case during checkout.",
  },
];

export default function Home() {
  const [activeFlavor, setActiveFlavor] = useState<FlavorId>("yuzu");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [cartCount, setCartCount] = useState<number>(0);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const currentFlavor = FLAVORS[activeFlavor];

  const triggerAddToCart = () => {
    setCartCount((prev) => prev + quantity);
    setAddedToast(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.85 },
      colors: [currentFlavor.color, "#ffffff", "#0A0D08"],
    });
    setTimeout(() => setAddedToast(false), 3000);
  };

  return (
    <div className="relative min-h-screen selection:bg-[#E9FE00] selection:text-[#0A0D08]">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#11160F] border border-white/20 text-white px-5 py-3 rounded-xl shadow-2xl backdrop-blur-lg animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#E9FE00]" />
          <div>
            <p className="text-sm font-semibold">Added to your crate!</p>
            <p className="text-xs text-stone-400">
              {quantity}x 12-Pack ({currentFlavor.name})
            </p>
          </div>
        </div>
      )}

      {/* Background radial glow based on active flavor */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-700 ease-out z-0"
        style={{ background: currentFlavor.bgGradient }}
      />

      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#070906]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#E9FE00] animate-ping" />
            <a href="#" className="font-display font-bold text-2xl tracking-tighter text-white">
              HYPER<span className="text-[#E9FE00]">POP</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-300">
            <a href="#flavors" className="hover:text-white transition-colors">Flavors</a>
            <a href="#botanicals" className="hover:text-white transition-colors">Botanicals & Science</a>
            <a href="#nutrition" className="hover:text-white transition-colors">Nutrition</a>
            <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#order"
              className="relative flex items-center gap-2 bg-[#161D14] hover:bg-[#1E261C] border border-white/10 px-4 py-2.5 rounded-full text-sm font-medium text-white transition-all hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-[#E9FE00]" />
              <span>Crate</span>
              {cartCount > 0 && (
                <span className="bg-[#E9FE00] text-black font-bold text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left: Headline and Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 w-fit">
              <Sparkles className="w-4 h-4 text-[#E9FE00]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                100% Wild Botanicals • 3g Agave • 5g Prebiotics
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              The Soda You Love, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9FE00] via-[#FF3B7A] to-[#8F42EC]">
                Electrified.
              </span>
            </h1>

            <p className="text-stone-300 text-lg sm:text-xl font-normal max-w-xl leading-relaxed">
              We ditched artificial sweeteners, hollow syrups, and lab chemicals. HYPERPOP brews real whole citrus, wild herbs, and gut-healthy fiber into crisp, electrifying effervescence.
            </p>

            {/* Flavor Quick Switcher Pills */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
                Select Edition:
              </p>
              <div className="flex flex-wrap gap-3">
                {(Object.keys(FLAVORS) as FlavorId[]).map((fId) => {
                  const item = FLAVORS[fId];
                  const isSelected = activeFlavor === fId;
                  return (
                    <button
                      key={fId}
                      onClick={() => setActiveFlavor(fId)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2.5 border ${
                        isSelected
                          ? `bg-[#192217] border-white/30 text-white shadow-lg scale-105`
                          : "bg-white/5 border-white/5 text-stone-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA Group */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <a
                href="#order"
                className="font-display font-semibold text-base bg-[#E9FE00] hover:bg-[#d8ec00] text-[#0A0D08] px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(233,254,0,0.3)] active:scale-95"
              >
                <span>Order 12-Pack Sample Crate</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#botanicals"
                className="font-semibold text-sm text-stone-300 hover:text-white px-6 py-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 text-center transition-colors"
              >
                Explore Ingredients
              </a>
            </div>

            {/* Social proof metric badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10">
              <div>
                <p className="font-display text-2xl font-bold text-white">4.9 / 5.0</p>
                <div className="flex gap-0.5 text-[#E9FE00] my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-stone-400">2,400+ Verified Soda Fans</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-white">100%</p>
                <p className="text-xs text-[#E9FE00] font-semibold mt-1">Plant-Powered</p>
                <p className="text-xs text-stone-400">Zero artificial extracts</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-white">5g</p>
                <p className="text-xs text-[#E9FE00] font-semibold mt-1">Prebiotics</p>
                <p className="text-xs text-stone-400">Per 330ml can</p>
              </div>
            </div>
          </div>

          {/* Hero Right: Can Showcase with Visual Animation */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            {/* Ambient Background Aura */}
            <div
              className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl opacity-30 animate-pulse pointer-events-none"
              style={{ backgroundColor: currentFlavor.color }}
            />

            {/* Product Card Showcase */}
            <div className="relative w-full max-w-md bg-[#0F140D]/90 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
              
              {/* Product Image */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center mb-6">
                <Image
                  src={currentFlavor.image}
                  alt={currentFlavor.name}
                  width={460}
                  height={460}
                  priority
                  className="object-cover w-full h-full transition-all duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-semibold text-white">
                  Limited Batch #04
                </div>
              </div>

              {/* Flavor Title and Specs */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-bold text-white">
                      {currentFlavor.name}
                    </h3>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full uppercase"
                      style={{
                        backgroundColor: `${currentFlavor.color}20`,
                        color: currentFlavor.color,
                      }}
                    >
                      {currentFlavor.stats.calories}
                    </span>
                  </div>
                  <p className="text-sm text-stone-300 mt-1">{currentFlavor.tagline}</p>
                </div>

                {/* Botanical Notes Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {currentFlavor.notes.map((note, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-stone-300"
                    >
                      {note}
                    </span>
                  ))}
                </div>

                {/* Quick Add To Cart Button */}
                <button
                  onClick={triggerAddToCart}
                  className="w-full mt-2 font-display font-semibold text-sm bg-white hover:bg-stone-200 text-black py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Quick Add {currentFlavor.name} 12-Pack • $34</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <section className="py-4 border-y border-white/10 bg-[#0B0F0A] overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-8 items-center text-xs sm:text-sm font-semibold tracking-widest uppercase text-stone-400">
          <span>⚡ REAL FRUIT COLD-PRESSED</span>
          <span className="text-[#E9FE00]">•</span>
          <span>NO STEVIA OR SYNTHETIC AFTERTASTE</span>
          <span className="text-[#FF3B7A]">•</span>
          <span>5G PREBIOTIC GUT FIBER</span>
          <span className="text-[#8F42EC]">•</span>
          <span>ONLY 3G NATURAL AGAVE SUGAR</span>
          <span className="text-[#E9FE00]">•</span>
          <span>100% RECYCLABLE ALUMINUM</span>
          <span className="text-[#FF3B7A]">•</span>
          <span>⚡ REAL FRUIT COLD-PRESSED</span>
          <span className="text-[#E9FE00]">•</span>
          <span>NO STEVIA OR SYNTHETIC AFTERTASTE</span>
          <span className="text-[#8F42EC]">•</span>
          <span>5G PREBIOTIC GUT FIBER</span>
          <span className="text-[#FF3B7A]">•</span>
        </div>
      </section>

      {/* Triple Flavor Grid Section */}
      <section id="flavors" className="py-24 max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E9FE00]">
            The Flavor Catalog
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Crafted with Wild Nature, Not Chemical Labs
          </h2>
          <p className="text-stone-400 text-base">
            Every recipe begins with rare, potent botanicals and cold-pressed citrus juice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(Object.keys(FLAVORS) as FlavorId[]).map((fId) => {
            const item = FLAVORS[fId];
            const isSelected = activeFlavor === fId;
            return (
              <div
                key={fId}
                onClick={() => setActiveFlavor(fId)}
                className={`group cursor-pointer rounded-3xl p-6 sm:p-8 bg-[#0D120C] border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? "border-white/40 shadow-2xl scale-[1.02]"
                    : "border-white/10 hover:border-white/20 hover:scale-[1.01]"
                }`}
              >
                <div>
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-6 bg-black/30">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className="absolute top-3 right-3 w-4 h-4 rounded-full border-2 border-black"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-stone-400 mb-6 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white/5 p-2.5 rounded-lg">
                      <span className="text-stone-400 block">Sugar</span>
                      <span className="font-bold text-white">{item.stats.sugar}</span>
                    </div>
                    <div className="bg-white/5 p-2.5 rounded-lg">
                      <span className="text-stone-400 block">Fiber</span>
                      <span className="font-bold text-white">{item.stats.prebiotics}</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveFlavor(fId);
                      triggerAddToCart();
                    }}
                    className="w-full py-3 rounded-xl font-semibold text-sm transition-all border border-white/20 hover:bg-white hover:text-black text-white flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Select & Add to Crate</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison: HYPERPOP vs Old Soda */}
      <section id="nutrition" className="py-20 bg-[#0B0F0A] border-y border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E9FE00]">
              The Comparison
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Why We Rebuilt Soda from Scratch
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-stone-400 text-sm">
                  <th className="py-4 px-6 font-medium">Nutritional Profile</th>
                  <th className="py-4 px-6 font-bold text-[#E9FE00] text-base">HYPERPOP</th>
                  <th className="py-4 px-6 font-medium text-stone-400">Legacy Big Soda</th>
                  <th className="py-4 px-6 font-medium text-stone-400">Diet / Zero Soda</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-white/5">
                <tr>
                  <td className="py-5 px-6 font-medium text-white flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-400" /> Added Sugars
                  </td>
                  <td className="py-5 px-6 font-bold text-[#E9FE00]">3g – 4g (Organic Agave)</td>
                  <td className="py-5 px-6 text-stone-400">39g – 45g (High Fructose)</td>
                  <td className="py-5 px-6 text-stone-400">0g</td>
                </tr>
                <tr>
                  <td className="py-5 px-6 font-medium text-white flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-emerald-400" /> Prebiotic Gut Fiber
                  </td>
                  <td className="py-5 px-6 font-bold text-[#E9FE00]">5g Plant Inulin</td>
                  <td className="py-5 px-6 text-stone-400">0g</td>
                  <td className="py-5 px-6 text-stone-400">0g</td>
                </tr>
                <tr>
                  <td className="py-5 px-6 font-medium text-white flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-sky-400" /> Sweetener Source
                  </td>
                  <td className="py-5 px-6 font-bold text-[#E9FE00]">Real Fruits + Agave</td>
                  <td className="py-5 px-6 text-stone-400">Corn Syrup</td>
                  <td className="py-5 px-6 text-stone-400">Aspartame / Sucralose</td>
                </tr>
                <tr>
                  <td className="py-5 px-6 font-medium text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-400" /> Artificial Colorants
                  </td>
                  <td className="py-5 px-6 font-bold text-[#E9FE00]">0% (Fruit Pigments)</td>
                  <td className="py-5 px-6 text-stone-400">Caramel Color IV, Red 40</td>
                  <td className="py-5 px-6 text-stone-400">Synthetic Dyes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Interactive Builder & Order Section */}
      <section id="order" className="py-24 max-w-5xl mx-auto px-6">
        <div className="bg-[#0F140E] border border-white/15 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E9FE00]">
                Custom 12-Pack Crate
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Taste the Revolution Delivered to Your Door.
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Receive cold-packed 12-can crates right on schedule. Switch flavors anytime, pause, or cancel in a single tap.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <p className="font-semibold text-white">Selected Flavor:</p>
                    <p className="text-sm text-stone-400">{currentFlavor.name} (12 Cans)</p>
                  </div>
                  <div className="flex gap-2">
                    {(Object.keys(FLAVORS) as FlavorId[]).map((fId) => (
                      <button
                        key={fId}
                        onClick={() => setActiveFlavor(fId)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform ${
                          activeFlavor === fId
                            ? "border-white scale-110"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: FLAVORS[fId].color }}
                        title={FLAVORS[fId].name}
                      />
                    ))}
                  </div>
                </div>

                {/* Quantity selector */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <p className="font-semibold text-white">Crate Quantity:</p>
                    <p className="text-xs text-stone-400">12 cans per crate ($34 / crate)</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-display text-lg font-bold text-white w-6 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={triggerAddToCart}
                className="w-full font-display text-base font-bold bg-[#E9FE00] hover:bg-[#d4e700] text-black py-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-95 shadow-[0_0_25px_rgba(233,254,0,0.35)] cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add {quantity} Crate{quantity > 1 ? "s" : ""} to Cart • ${(34 * quantity).toFixed(2)}</span>
              </button>

              <div className="flex items-center justify-center gap-6 text-xs text-stone-400 pt-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E9FE00]" /> Free 2-Day Shipping
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E9FE00]" /> 100% Satisfaction Guarantee
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative aspect-square w-full max-w-xs rounded-2xl overflow-hidden border border-white/15 bg-black/50 shadow-inner">
                <Image
                  src={currentFlavor.image}
                  alt={currentFlavor.name}
                  width={380}
                  height={380}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section id="reviews" className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E9FE00]">
            Social Proof
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Loved by Citrus Obsessives & Gut Enthusiasts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0F140E] border border-white/10 space-y-4">
            <div className="flex gap-1 text-[#E9FE00]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">
              &quot;The Electric Yuzu is completely in a league of its own. It has that crisp, tart bite without the synthetic aspartame film other low-calorie drinks leave behind.&quot;
            </p>
            <div className="pt-2 border-t border-white/5">
              <p className="font-bold text-sm text-white">Elena Rostova</p>
              <p className="text-xs text-stone-400">Verified Buyer • Austin, TX</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F140E] border border-white/10 space-y-4">
            <div className="flex gap-1 text-[#E9FE00]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">
              &quot;Pink Guava Glow is the best mixer for summer mocktails. My gut feels fantastic thanks to the prebiotic fiber, and the flavor tastes genuinely artisanal.&quot;
            </p>
            <div className="pt-2 border-t border-white/5">
              <p className="font-bold text-sm text-white">Marcus Vance</p>
              <p className="text-xs text-stone-400">Verified Buyer • Brooklyn, NY</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F140E] border border-white/10 space-y-4">
            <div className="flex gap-1 text-[#E9FE00]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">
              &quot;Finally someone made a dark soda that respects real spices! Midnight Botanical with smoked vanilla is incredible chilled over ice with an orange twist.&quot;
            </p>
            <div className="pt-2 border-t border-white/5">
              <p className="font-bold text-sm text-white">Sophia Tanaka</p>
              <p className="text-xs text-stone-400">Verified Buyer • Seattle, WA</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="py-20 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E9FE00]">
            Questions & Answers
          </span>
          <h2 className="font-display text-3xl font-bold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-[#0F140E] overflow-hidden transition-colors"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-white"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#E9FE00] transition-transform duration-300 ${
                    activeFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-6 text-stone-300 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#040604] py-12 text-stone-400 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-xl text-white">
              HYPER<span className="text-[#E9FE00]">POP</span>
            </span>
            <span>© 2026 HYPERPOP Beverage Co. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-stone-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Wholesale Inquiries</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
