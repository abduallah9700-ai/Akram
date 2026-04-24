import React, { useState, useEffect } from 'react';
import logo from './logo.jpg';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Facebook, 
  Phone, 
  MapPin, 
  Clock, 
  Menu as MenuIcon, 
  X, 
  ChevronRight, 
  Star,
  Award,
  Zap,
  Package
} from 'lucide-react';

// --- Configuration ---

const IMAGES = {
  // HERO: Large dramatic image for the entrance.
  // Replace these URLs with your official product photos.
  hero: 'https://images.unsplash.com/photo-1519671282429-b44660ead0a7?auto=format&fit=crop&q=80&w=1920',
  
  // SPECIALTIES: Featured categories
  arabicSweets: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&q=80&w=800',
  artisanalCakes: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
  savoryDelights: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
  
  // BRAND STORY: Authentic craftsmanship
  craftsmanship: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000',
  
  // GALLERY: A collection of beautiful moments
  gallery: [
    'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1532499016263-f2c3e98df9c8?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800',
  ]
};

// --- Types ---

type Page = 'home' | 'menu' | 'about' | 'gallery' | 'contact';

interface MenuItem {
  id: string;
  name: string;
  category: 'sweets' | 'cakes' | 'fast-food';
  description: string;
  price: string;
  image: string;
}

// --- Data ---

const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Luxury Baklava Box',
    category: 'sweets',
    description: 'Crispy layers of phyllo dough filled with premium pistachios and honey.',
    price: '$25.00',
    image: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '2',
    name: 'Kunafa with Cream',
    category: 'sweets',
    description: 'Warm semolina pastry with a melting cream center and rose syrup.',
    price: '$12.00',
    image: 'https://images.unsplash.com/photo-1621508617081-2fc556996e48?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '3',
    name: 'Maamoul Cookies',
    category: 'sweets',
    description: 'Traditional date-filled buttery cookies dusted with powdered sugar.',
    price: '$15.00',
    image: 'https://images.unsplash.com/photo-1632733742466-9b5790b07e4d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '4',
    name: 'Red Velvet Royale',
    category: 'cakes',
    description: 'Rich cocoa layers with silky cream cheese frosting and gold leaf.',
    price: '$45.00',
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '5',
    name: 'Gold Leaf Chocolate Cake',
    category: 'cakes',
    description: 'Decadent dark chocolate ganache with edible 24k gold accents.',
    price: '$55.00',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '6',
    name: 'Spicy Shawarma Wrap',
    category: 'fast-food',
    description: 'Marinated chicken with garlic sauce and fresh vegetables.',
    price: '$8.50',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '7',
    name: 'Akram Special Burger',
    category: 'fast-food',
    description: 'Caramelized onions, secret sauce, and premium beef on brioche.',
    price: '$10.00',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600'
  }
];

// Removing the GALLERY_IMAGES constant as it's now in the IMAGES config

// --- Components ---

const Navbar = ({ activePage, setActivePage }: { activePage: Page, setActivePage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: Page; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'about', label: 'Our Story' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-white shadow-md py-4 border-charcoal/5' : 'bg-transparent py-6 border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-charcoal">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setActivePage('home')}
        >
          <div className="w-12 h-12 flex items-center justify-center overflow-hidden rounded-full border border-accent/20">
            <img 
              src={logo} 
              className="w-full h-full object-cover transition-transform group-hover:scale-110" 
              alt="Akram Sweets Logo"
            />
          </div>
          <div>
            <span className={`text-xl font-semibold uppercase tracking-widest block transition-colors ${isScrolled ? 'text-primary' : 'text-primary'}`}>Akram</span>
            <span className="block text-[10px] uppercase tracking-[0.3em] text-accent font-bold -mt-1">Sweets</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className={`hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors ${isScrolled ? 'text-charcoal' : 'text-primary'}`}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`relative py-1 transition-colors hover:text-accent ${activePage === link.id ? 'text-accent border-b border-accent' : ''}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-cream shadow-2xl py-12 flex flex-col items-center gap-8 md:hidden border-b border-accent"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { setActivePage(link.id); setMobileMenuOpen(false); }}
                className={`text-sm font-semibold tracking-[0.3em] uppercase ${activePage === link.id ? 'text-accent' : 'text-primary'}`}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setActivePage }: { setActivePage: (p: Page) => void }) => (
  <footer className="bg-primary text-white pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 flex items-center justify-center overflow-hidden rounded-full border border-white/20">
            <img 
              src={logo} 
              className="w-full h-full object-cover" 
              alt="Akram Sweets Logo"
            />
          </div>
          <div>
            <span className="text-xl font-semibold uppercase tracking-widest block text-cream">Akram</span>
            <span className="block text-[10px] uppercase tracking-[0.3em] text-accent font-bold -mt-1">Sweets</span>
          </div>
        </div>
        <p className="text-cream/60 text-xs leading-[1.8] uppercase tracking-[0.05em]">
          Bringing the finest Arabic sweets and savory delicacies to the heart of Somalia. A tradition of taste, a legacy of quality.
        </p>
      </div>

      <div>
        <h4 className="text-accent font-sans text-[10px] uppercase tracking-[0.3em] font-bold mb-8">Location</h4>
        <p className="text-sm font-light text-white/80 leading-relaxed">
          Maka Al Mukarama Road,<br />Mogadishu, Somalia
        </p>
      </div>

      <div>
        <h4 className="text-accent font-sans text-[10px] uppercase tracking-[0.3em] font-bold mb-8">Operating Hours</h4>
        <p className="text-sm font-light text-white/80 leading-relaxed">
          Daily: 8:00 AM — 11:00 PM<br />
          Experience Luxury Every Day
        </p>
      </div>

      <div>
        <h4 className="text-accent font-sans text-[10px] uppercase tracking-[0.3em] font-bold mb-8">Connect</h4>
        <div className="flex gap-4">
          <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent/20 hover:border-accent transition-all cursor-pointer text-xs font-bold uppercase tracking-tighter">FB</div>
          <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent/20 hover:border-accent transition-all cursor-pointer text-xs font-bold uppercase tracking-tighter">IG</div>
          <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent/20 hover:border-accent transition-all cursor-pointer text-xs font-bold uppercase tracking-tighter">WA</div>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-6 pt-10 mt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
       <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">© 2026 Akram Sweets Somalia. All rights reserved.</div>
       <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] font-semibold text-accent/60">
          <button className="hover:text-accent transition-colors">Privacy</button>
          <button className="hover:text-accent transition-colors">Terms</button>
          <button className="hover:text-accent transition-colors">Boutique Policy</button>
       </div>
    </div>
  </footer>
);

// --- Page Views ---

const HomePage: React.FC<{ setActivePage: (p: Page) => void }> = ({ setActivePage }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="relative"
  >
    <div className="pattern-overlay absolute inset-0 pointer-events-none z-0" />
    
    {/* Hero Section - Split Layout */}
    <section className="relative min-h-[90vh] flex items-center z-10 px-6 max-w-7xl mx-auto pt-24 pb-12 gap-12 flex-col md:flex-row">
      <div className="w-full md:w-1/2 space-y-8">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-4 text-accent uppercase tracking-[0.3em] text-[10px] font-bold"
        >
          <span>Est. 1994</span>
          <span className="w-12 h-[1px] bg-accent"></span>
          <span>Somalia</span>
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-6xl md:text-[5.5rem] text-primary leading-[1.05] font-bold serif"
        >
          Taste the<br />
          <span className="italic font-normal">Sweet Tradition</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-500 max-w-md leading-relaxed font-light"
        >
          Indulge in the finest Arabic sweets and artisanal desserts, crafted with generations of secret recipes and premium ingredients. Somalia's destination for elegance.
        </motion.p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-6 pt-4"
        >
          <button 
            onClick={() => setActivePage('menu')}
            className="bg-primary text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:shadow-[0_20px_40px_rgba(114,16,16,0.2)] transition-all transform hover:-translate-y-1"
          >
            Explore Menu
          </button>
          <button 
            onClick={() => setActivePage('contact')}
            className="border border-accent text-primary px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-accent/5 transition-all"
          >
            Visit Boutique
          </button>
        </motion.div>
      </div>

      <div className="w-full md:w-1/2 flex justify-end relative">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative"
        >
          <div className="hero-arch w-[320px] md:w-[480px] h-[450px] md:h-[650px] overflow-hidden bg-gray-100 border-[12px] border-white shadow-2xl relative z-10">
            <img 
              src={IMAGES.hero} 
              className="w-full h-full object-cover" 
              alt="Premium Sweets"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
          </div>
          

        </motion.div>
      </div>
    </section>

    {/* Specialties Grid */}
    <section className="py-32 px-6 bg-white relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
             <span className="text-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">Selection</span>
             <h2 className="text-5xl md:text-6xl text-primary font-bold serif">Curated Delicacies</h2>
          </div>
          <p className="text-gray-400 italic max-w-xs text-sm">Our master pastry chefs combine tradition with modern artistry for an unforgettable experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: 'Arabic Legacy', desc: 'Handcrafted baklava and sweet pastries.', img: IMAGES.arabicSweets },
            { title: 'Artisan Patisserie', desc: 'Custom cakes with signature gold accents.', img: IMAGES.artisanalCakes },
            { title: 'Gourmet Savory', desc: 'Light fast food refined for high palates.', img: IMAGES.savoryDelights }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -15 }}
              className="group relative h-[600px] overflow-hidden rounded-[80px_0_80px_0] cursor-pointer shadow-lg"
              onClick={() => setActivePage('menu')}
            >
              <img 
                src={item.img} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                alt={item.title} 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent p-12 flex flex-col justify-end">
                <h3 className="text-3xl text-white serif font-bold mb-3">{item.title}</h3>
                <p className="text-white/60 text-sm mb-8 font-light uppercase tracking-widest">{item.desc}</p>
                <div className="w-12 h-[2px] bg-accent transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Experience Section */}
    <section className="py-32 bg-cream/50 relative overflow-hidden">
      <div className="pattern-overlay absolute inset-0 opacity-5" />
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-24 relative z-10">
        <div className="w-full md:w-1/2">
           <img 
             src={IMAGES.craftsmanship} 
             className="w-full rounded-[250px_250px_0_0] luxury-shadow border-[1px] border-accent/20" 
             alt="Luxury Experience" 
             referrerPolicy="no-referrer"
           />
        </div>
        <div className="w-full md:w-1/2 space-y-10">
          <div className="space-y-4">
             <span className="text-accent uppercase tracking-[0.3em] text-[10px] font-bold block">Legacy of Taste</span>
             <h2 className="text-5xl md:text-6xl text-primary serif leading-tight">Decades of<br /><span className="italic font-normal text-accent">Pure Craftsmanship</span></h2>
          </div>
          <p className="text-gray-600 text-lg leading-loose font-light">
            Each tray at Akram Sweets is a testament to the pursuit of culinary perfection. We select only the most aromatic honeys, local dates, and premium pistachios, ensuring that every bite tells a story of heritage and luxury.
          </p>
          <div className="grid grid-cols-2 gap-12 pt-4">
            <div className="space-y-3">
              <span className="text-3xl serif text-primary block">94%</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Traditional Methods</span>
            </div>
            <div className="space-y-3">
              <span className="text-3xl serif text-primary block">Elite</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Member Experience</span>
            </div>
          </div>
          <button 
            onClick={() => setActivePage('about')}
            className="inline-block border-b-2 border-accent pb-2 text-primary serif font-bold italic text-xl hover:text-accent transition-colors translate-y-0 hover:-translate-y-1 transform"
          >
            Explore Our Heritage
          </button>
        </div>
      </div>
    </section>
  </motion.div>
);

const MenuPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'sweets' | 'cakes' | 'fast-food'>('all');

  const filteredItems = filter === 'all' ? MENU_ITEMS : MENU_ITEMS.filter(item => item.category === filter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl text-primary font-serif mb-6">Our Culinary Menu</h1>
          <p className="text-gray-500 max-w-xl mx-auto italic">Explore our curated selection of Arabic delights, designer cakes, and savory fast food.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-6 mb-24">
          {['all', 'sweets', 'cakes', 'fast-food'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-10 py-4 rounded-full border transition-all uppercase tracking-[0.2em] text-[10px] font-bold ${filter === cat ? 'bg-primary text-accent border-accent luxury-shadow' : 'border-accent/20 text-gray-400 hover:border-accent hover:text-primary'}`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-3xl overflow-hidden luxury-shadow group"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-primary font-bold text-sm luxury-shadow">
                    {item.price}
                  </div>
                </div>
                <div className="p-8">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-2 block">{item.category}</span>
                  <h3 className="text-xl font-serif text-charcoal mb-3 group-hover:text-primary transition-colors">{item.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed italic">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const AboutPage: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-32 pb-24 px-6"
  >
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
        <div>
          <h1 className="text-5xl md:text-6xl text-primary font-serif mb-8 leading-tight">The Journey of Akram Sweets</h1>
          <p className="text-gray-600 text-lg mb-8 leading-loose">
            For over a decade, Akram Sweets has stood as a beacon of culinary excellence in Somalia. What began as a small boutique specializing in traditional baklava has grown into a destination for those seeking the finest tastes from across the Arabic world.
          </p>
          <div className="flex gap-10 items-center">
            <div>
              <span className="text-4xl font-serif font-bold text-accent block">2010</span>
              <span className="text-xs uppercase tracking-widest text-gray-400">ESTABLISHED</span>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div>
              <span className="text-4xl font-serif font-bold text-accent block">50+</span>
              <span className="text-xs uppercase tracking-widest text-gray-400">RECIPES</span>
            </div>
          </div>
        </div>
        <div className="relative">
           <img 
             src="https://picsum.photos/seed/history/800/1000" 
             className="w-full rounded-[100px] luxury-shadow" 
             alt="Heritage" 
             referrerPolicy="no-referrer"
           />
           <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { icon: <Star />, title: 'Quality First', desc: 'We source the highest quality pistachios, dates, and butter to ensure excellence.' },
          { icon: <Award />, title: 'Handcrafted', desc: 'Every tray is hand-laid by our master pastry chefs using traditional tools.' },
          { icon: <Zap />, title: 'Fresh Daily', desc: 'We bake in small batches throughout the day to guarantee peak freshness.' }
        ].map((v, i) => (
          <div key={i} className="p-12 bg-white rounded-3xl luxury-shadow border-b-4 border-accent">
            <div className="text-primary mb-6">{v.icon}</div>
            <h3 className="text-2xl font-serif mb-4">{v.title}</h3>
            <p className="text-gray-500 font-light leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const GalleryPage: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-32 pb-24 px-6"
  >
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif text-primary mb-4">Visual Delights</h1>
        <p className="text-gray-500 italic">Experience the art of Akram Sweets through our lens.</p>
      </div>
      
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
        {IMAGES.gallery.map((img, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="mb-8 relative overflow-hidden rounded-3xl group"
          >
            <img 
              src={img} 
              alt="Gallery item" 
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 rounded-[60px_60px_0_0] border-[8px] border-white shadow-xl" 
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

const ContactPage: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-32 pb-24 px-6"
  >
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h1 className="text-5xl font-serif text-primary mb-8">Let's Connect</h1>
          <p className="text-gray-600 mb-12">Visit us in Mogadishu or reach out for custom cake orders and premium dessert catering.</p>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-white luxury-shadow rounded-2xl flex items-center justify-center text-primary shrink-0"><MapPin /></div>
              <div>
                <h4 className="font-serif font-bold text-xl mb-1">Our Location</h4>
                <p className="text-gray-500">Maka Al Mukarama Road, Mogadishu, Somalia</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-white luxury-shadow rounded-2xl flex items-center justify-center text-primary shrink-0"><Phone /></div>
              <div>
                <h4 className="font-serif font-bold text-xl mb-1">Call Us</h4>
                <p className="text-gray-500">+252 (615) 123 456</p>
                <p className="text-gray-500">+252 (612) 987 654</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-white luxury-shadow rounded-2xl flex items-center justify-center text-primary shrink-0"><Clock /></div>
              <div>
                <h4 className="font-serif font-bold text-xl mb-1">Email & Social</h4>
                <p className="text-gray-500">hello@akramsweets.so</p>
                <div className="flex gap-4 mt-4 text-primary">
                   <Instagram size={24} className="cursor-pointer hover:text-accent transition-colors" />
                   <Facebook size={24} className="cursor-pointer hover:text-accent transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 md:p-16 rounded-[50px] luxury-shadow">
          <h3 className="text-3xl font-serif mb-8 text-charcoal">Send an Inquiry</h3>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Full Name" className="w-full px-6 py-4 rounded-2xl bg-cream border border-transparent focus:border-accent outline-none font-sans" />
              <input type="email" placeholder="Email Address" className="w-full px-6 py-4 rounded-2xl bg-cream border border-transparent focus:border-accent outline-none font-sans" />
            </div>
            <select className="w-full px-6 py-4 rounded-2xl bg-cream border border-transparent focus:border-accent outline-none font-sans appearance-none">
              <option>General Inquiry</option>
              <option>Custom Cake Order</option>
              <option>Catering Request</option>
              <option>Gift Box Bulk Order</option>
            </select>
            <textarea placeholder="Your Message" rows={4} className="w-full px-6 py-4 rounded-2xl bg-cream border border-transparent focus:border-accent outline-none font-sans" />
            <button className="w-full py-5 bg-primary text-accent font-bold uppercase tracking-widest text-sm rounded-2xl luxury-shadow hover:scale-[1.02] transition-transform">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Mini CTA for Ordering */}
      <div className="mt-32 p-12 bg-accent rounded-[50px] text-center luxury-shadow">
         <div className="p-4 bg-white/20 inline-block rounded-3xl mb-6 backdrop-blur-md">
            <Package size={32} className="text-charcoal" />
         </div>
         <h2 className="text-4xl font-serif text-charcoal mb-4">Gifting for Special Occasions</h2>
         <p className="text-charcoal/70 mb-10 max-w-2xl mx-auto">Contact us for bespoke artisan boxes tailored to weddings, corporate events, and family celebrations.</p>
         <button className="px-10 py-5 bg-charcoal text-white rounded-full font-bold uppercase tracking-widest text-xs">Explore Options</button>
      </div>
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <div className="min-h-screen bg-cream relative">
      <div className="pattern-overlay fixed inset-0 pointer-events-none z-0" />
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main className="relative z-10 transition-all duration-300">
        <AnimatePresence mode="wait">
          {activePage === 'home' && <HomePage key="home" setActivePage={setActivePage} />}
          {activePage === 'menu' && <MenuPage key="menu" />}
          {activePage === 'about' && <AboutPage key="about" />}
          {activePage === 'gallery' && <GalleryPage key="gallery" />}
          {activePage === 'contact' && <ContactPage key="contact" />}
        </AnimatePresence>
      </main>

      <Footer setActivePage={setActivePage} />
    </div>
  );
}
