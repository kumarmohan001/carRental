import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Car,
  CheckCircle2,
  Clock,
  Facebook,
  Fuel,
  Headphones,
  Instagram,
  MapPin,
  MessageSquareText,
  MessageCircle,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Twitter,
  User,
  Users,
  WalletCards,
  X
} from "lucide-react";

const heroImage =
  "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=2200&q=85";

const WHATSAPP_NUMBER = "918512823394"; // WhatsApp number for bookings

const cars = [
  {
    name: "Mercedes-AMG GT",
    price: "₹18,999",
    fuel: "Petrol",
    seats: "2 Seats",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "BMW M8 Competition",
    price: "₹16,499",
    fuel: "Hybrid",
    seats: "4 Seats",
    image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Porsche 911 Carrera",
    price: "₹21,999",
    fuel: "Petrol",
    seats: "2 Seats",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80"
  }
];

const benefits = [
  { title: "Affordable Pricing", icon: WalletCards, text: "Premium fleet access with clear rates and no hidden fees." },
  { title: "24/7 Customer Support", icon: Headphones, text: "Concierge-level help before, during, and after every trip." },
  { title: "Fully Insured Vehicles", icon: ShieldCheck, text: "Every rental is covered, inspected, and road-ready." },
  { title: "Easy Online Booking", icon: CalendarDays, text: "Reserve your car in minutes with instant confirmation." }
];

const steps = [
  { title: "Select Car", text: "Choose from curated luxury sedans, SUVs, and performance cars." },
  { title: "Book Online", text: "Set pickup, return, and extras in a polished booking flow." },
  { title: "Drive & Enjoy", text: "Arrive, unlock the keys, and make the road yours." }
];

const testimonials = [
  {
    name: "Ananya Sharma",
    role: "Executive Traveller",
    quote: "The AMG was immaculate, delivery was on time, and the entire experience felt private-club level."
  },
  {
    name: "Rohan Mehta",
    role: "Weekend Escape",
    quote: "Booking took minutes. The Porsche made our coastal drive unforgettable, and support was exceptional."
  },
  {
    name: "Priya Nair",
    role: "Event Client",
    quote: "Beautiful cars, polished service, and transparent pricing. Exactly what premium rental should feel like."
  }
];

const stats = [
  ["5000+", "Happy Customers"],
  ["100+", "Premium Cars"],
  ["50+", "Cities Covered"]
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 },
  transition: { duration: 0.7, ease: "easeOut" }
};

function SectionTitle({ eyebrow, title, text }) {
  return (
    <motion.div {...fadeUp} className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-champagne">{eyebrow}</p>
      <h2 className="font-display text-4xl font-bold text-white md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-7 text-white/65 md:text-lg">{text}</p>}
    </motion.div>
  );
}

function Button({ children, variant = "primary", className = "", type = "button", ...props }) {
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-champagne via-gold to-champagne text-black shadow-glow hover:brightness-110"
      : "border border-white/20 bg-white/8 text-white hover:border-champagne/70 hover:bg-white/12";

  return (
    <motion.button
      type={type}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition ${styles} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

function BookingModal({ open, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickup: "",
    car: cars[0]?.name || "",
    pickupDate: "",
    returnDate: "",
    details: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    
    // Create WhatsApp message with booking details
    const message = `Hello! I would like to book a car with the following details:

*Booking Information:*
Name: ${formData.name}
Phone: ${formData.phone}
Pickup Location: ${formData.pickup}
Car: ${formData.car}
Pickup Date: ${formData.pickupDate}
Return Date: ${formData.returnDate}
Trip Details: ${formData.details || "No specific details provided"}

Please confirm availability and pricing.`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, "_blank");
    
    // Reset form and close modal
    setFormData({
      name: "",
      phone: "",
      pickup: "",
      car: cars[0]?.name || "",
      pickupDate: "",
      returnDate: "",
      details: ""
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 py-8 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="glass luxury-ring relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] p-5 sm:p-7"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/10 p-2 text-white transition hover:border-champagne hover:text-champagne"
              aria-label="Close booking form"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.26em] text-champagne">Customer details</p>
            <h2 className="pr-12 font-display text-3xl font-bold text-white sm:text-4xl">Book Your Premium Ride</h2>
            <p className="mt-3 max-w-xl leading-7 text-white/62">
              Fill your details and we'll send booking confirmation via WhatsApp.
            </p>

            <form className="mt-7 grid gap-4" onSubmit={handleWhatsAppSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-white/70">Full Name</span>
                  <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3">
                    <User className="h-5 w-5 text-champagne" />
                    <input
                      className="w-full bg-transparent text-white outline-none placeholder:text-white/35"
                      placeholder="Your name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </span>
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-white/70">Mobile Number</span>
                  <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3">
                    <Phone className="h-5 w-5 text-champagne" />
                    <input
                      className="w-full bg-transparent text-white outline-none placeholder:text-white/35"
                      placeholder="+91 98765 43210"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </span>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-white/70">Pickup Location</span>
                  <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3">
                    <MapPin className="h-5 w-5 text-champagne" />
                    <input
                      className="w-full bg-transparent text-white outline-none placeholder:text-white/35"
                      placeholder="Mumbai Airport"
                      name="pickup"
                      value={formData.pickup}
                      onChange={handleInputChange}
                      required
                    />
                  </span>
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-white/70">Preferred Car</span>
                  <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3">
                    <Car className="h-5 w-5 text-champagne" />
                    <select
                      className="w-full bg-transparent text-white outline-none"
                      name="car"
                      value={formData.car}
                      onChange={handleInputChange}
                    >
                      {cars.map((car) => (
                        <option key={car.name} className="bg-carbon text-white">{car.name}</option>
                      ))}
                    </select>
                  </span>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-white/70">Pickup Date</span>
                  <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3">
                    <CalendarDays className="h-5 w-5 text-champagne" />
                    <input
                      type="date"
                      className="w-full bg-transparent text-white outline-none"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleInputChange}
                      required
                    />
                  </span>
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-white/70">Return Date</span>
                  <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3">
                    <Clock className="h-5 w-5 text-champagne" />
                    <input
                      type="date"
                      className="w-full bg-transparent text-white outline-none"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleInputChange}
                      required
                    />
                  </span>
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-white/70">Trip Details</span>
                <span className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3">
                  <MessageSquareText className="mt-1 h-5 w-5 text-champagne" />
                  <textarea
                    className="min-h-28 w-full resize-none bg-transparent text-white outline-none placeholder:text-white/35"
                    placeholder="City, trip duration, driver needed or self-drive, pickup time..."
                    name="details"
                    value={formData.details}
                    onChange={handleInputChange}
                  />
                </span>
              </label>

              <Button className="mt-2 w-full" type="submit">
                <MessageCircle className="h-4 w-4" />
                Send via WhatsApp
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);
  const exploreCars = () => document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="min-h-screen bg-obsidian text-platinum">
      <BookingModal open={isBookingOpen} onClose={closeBooking} />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#home" className="flex items-center gap-3" aria-label="rentalscars home">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-champagne/50 bg-champagne/10">
              <Car className="h-5 w-5 text-champagne" />
            </span>
            <span className="text-lg font-extrabold tracking-wide text-white">rentalscars</span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-semibold text-white/70 md:flex">
            <a href="#fleet" className="hover:text-champagne">Fleet</a>
            <a href="#why" className="hover:text-champagne">Why Us</a>
            <a href="#works" className="hover:text-champagne">How It Works</a>
            <a href="#contact" className="hover:text-champagne">Contact</a>
          </div>
          <Button onClick={openBooking} className="hidden md:inline-flex">Book Now</Button>
          <button className="rounded-full border border-white/15 p-3 text-white md:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24">
        <img
          src={heroImage}
          alt="Black luxury sports car on a dramatic road"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92),rgba(0,0,0,0.55)_45%,rgba(0,0,0,0.72)),linear-gradient(180deg,rgba(0,0,0,0.28),#050505_96%)]" />
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute bottom-10 right-0 hidden h-40 w-2/5 bg-gradient-to-l from-champagne/20 to-transparent blur-3xl lg:block"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-10 px-5 pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-champagne/30 bg-black/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-champagne backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Luxury rentals
            </div>
            <h1 className="max-w-4xl font-display text-5xl font-extrabold leading-[0.96] text-white sm:text-6xl lg:text-7xl">
              Drive Your Dream Car Today
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-medium leading-8 text-white/78 md:text-2xl">
              Affordable, Reliable & Premium Car Rentals
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button onClick={openBooking}>
                Book Now <ArrowRight className="h-4 w-4" />
              </Button>
              <Button onClick={exploreCars} variant="secondary">Explore Cars</Button>
            </div>
          </motion.div>

          <motion.form
            onSubmit={(event) => {
              event.preventDefault();
              openBooking();
            }}
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.85 }}
            className="glass luxury-ring rounded-[2rem] p-5 sm:p-6"
          >
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-champagne">Quick booking</p>
            <div className="grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-white/70">Pickup Location</span>
                <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3">
                  <MapPin className="h-5 w-5 text-champagne" />
                  <input className="w-full bg-transparent text-white outline-none placeholder:text-white/35" placeholder="Mumbai, Maharashtra" />
                </span>
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-white/70">Pickup Date</span>
                  <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3">
                    <CalendarDays className="h-5 w-5 text-champagne" />
                    <input type="date" className="w-full bg-transparent text-white outline-none" />
                  </span>
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-white/70">Return Date</span>
                  <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3">
                    <Clock className="h-5 w-5 text-champagne" />
                    <input type="date" className="w-full bg-transparent text-white outline-none" />
                  </span>
                </label>
              </div>
              <Button type="submit" className="mt-2 w-full">Find My Car</Button>
            </div>
          </motion.form>
        </div>
      </section>

      <section id="fleet" className="px-5 py-24 lg:px-8">
        <SectionTitle eyebrow="Featured cars" title="Curated for the extraordinary" text="Premium vehicles selected for presence, performance, comfort, and unforgettable arrivals." />
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {cars.map((car, index) => (
            <motion.article
              key={car.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.08 }}
              whileHover={{ y: -10 }}
              className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] shadow-card backdrop-blur"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={car.image} alt={car.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-black/55 px-4 py-2 text-xs font-bold text-champagne backdrop-blur">
                  From {car.price}/day
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white">{car.name}</h3>
                <div className="mt-5 flex flex-wrap gap-3 text-sm text-white/70">
                  <span className="flex items-center gap-2 rounded-full bg-white/8 px-3 py-2"><Fuel className="h-4 w-4 text-champagne" />{car.fuel}</span>
                  <span className="flex items-center gap-2 rounded-full bg-white/8 px-3 py-2"><Users className="h-4 w-4 text-champagne" />{car.seats}</span>
                </div>
                <Button onClick={openBooking} className="mt-6 w-full">Rent Now</Button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="why" className="border-y border-white/10 bg-white/[0.035] px-5 py-24 lg:px-8">
        <SectionTitle eyebrow="Why choose us" title="Service polished to the last mile" />
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ title, icon: Icon, text }) => (
            <motion.div key={title} {...fadeUp} className="glass rounded-3xl p-6">
              <Icon className="mb-5 h-9 w-9 text-champagne" />
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="mt-3 leading-7 text-white/62">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="works" className="px-5 py-24 lg:px-8">
        <SectionTitle eyebrow="How it works" title="Three steps to the driver's seat" />
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div key={step.title} {...fadeUp} className="rounded-3xl border border-white/10 bg-carbon p-7 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-champagne text-xl font-black text-black">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold text-white">{step.title}</h3>
              <p className="mt-3 leading-7 text-white/62">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-24 lg:px-8">
        <SectionTitle eyebrow="Testimonials" title="Loved by discerning drivers" />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <motion.figure key={item.name} {...fadeUp} className="glass rounded-3xl p-6">
              <div className="mb-5 flex gap-1 text-champagne">
                {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="leading-7 text-white/72">"{item.quote}"</blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-5">
                <p className="font-bold text-white">{item.name}</p>
                <p className="text-sm text-white/45">{item.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <motion.div {...fadeUp} className="luxury-ring grid gap-8 rounded-[2rem] bg-gradient-to-r from-white/[0.08] via-champagne/[0.12] to-white/[0.06] p-8 text-center md:grid-cols-3">
          {stats.map(([value, label]) => (
            <div key={label}>
              <p className="gold-text font-display text-5xl font-extrabold">{value}</p>
              <p className="mt-2 font-semibold text-white/68">{label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="px-5 pb-24 lg:px-8">
        <motion.div {...fadeUp} className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-champagne/25 bg-[linear-gradient(135deg,rgba(214,167,60,0.24),rgba(255,255,255,0.06),rgba(0,0,0,0.3))] p-8 text-center shadow-glow md:p-14">
          <CheckCircle2 className="mx-auto mb-6 h-12 w-12 text-champagne" />
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl">Ready for Your Next Journey?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/68">
            Reserve a premium vehicle now and arrive with the confidence only a world-class ride can give.
          </p>
          <Button onClick={openBooking} className="mt-8">Book Now</Button>
        </motion.div>
      </section>

      <footer id="contact" className="border-t border-white/10 bg-black px-5 py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Car className="h-7 w-7 text-champagne" />
              <span className="text-xl font-extrabold text-white">rentalscars</span>
            </div>
            <p className="mt-4 max-w-md leading-7 text-white/55">
              Premium car rentals for business travel, celebrations, road escapes, and every arrival worth remembering.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white">Contact Details</h3>
            <p className="mt-4 text-white/55">hello@rentalscars.in</p>
            <p className="mt-2 text-white/55">+14844818199</p>
            <p className="mt-2 text-white/55">Delhi</p>
          </div>
          <div>
            <h3 className="font-bold text-white">WhatsApp</h3>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-champagne/50 bg-champagne/10 px-4 py-2 text-champagne transition hover:border-champagne hover:bg-champagne/20"
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </a>
            <p className="mt-3 text-sm text-white/55">+91 8512823394</p>
            <p className="text-xs text-white/40 mt-2">Available 24/7</p>
          </div>
          <div>
            <h3 className="font-bold text-white">Social Media</h3>
            <div className="mt-4 flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                <a key={index} href="#" aria-label="Social profile" className="rounded-full border border-white/10 p-3 text-white/70 transition hover:border-champagne hover:text-champagne">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-white/42">
          Copyright 2026 rentalscars. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

export default App;
