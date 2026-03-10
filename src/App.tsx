import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import TrustTriggers from './components/TrustTriggers';
import Products from './components/Products';
import ExpandedTrust from './components/ExpandedTrust';
import Testimonials from './components/Testimonials';
import Urgency from './components/Urgency';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import SchedulingModal from './components/SchedulingModal';
import FloatingChat from './components/FloatingChat';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [nikeInStock, setNikeInStock] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('nike_in_stock');
    if (savedState) {
      setNikeInStock(JSON.parse(savedState));
    }
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-orange-500 selection:text-white">
      {/* Sticky Urgency Banner */}
      <div className="sticky top-0 z-50 bg-orange-500 text-white text-center py-2 px-4 text-sm font-bold tracking-wide shadow-md flex items-center justify-center gap-2">
        <span className="animate-pulse">⚡</span> Promoção por tempo limitado — Pagamento somente na entrega
      </div>

      <Hero />
      <TrustTriggers />
      <Products 
        onOpenSchedule={() => setIsScheduleOpen(true)} 
        nikeInStock={nikeInStock} 
      />
      <ExpandedTrust />
      <Testimonials />
      <Urgency />
      <FAQ />
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Modals & Overlays */}
      <SchedulingModal 
        isOpen={isScheduleOpen} 
        onClose={() => setIsScheduleOpen(false)} 
      />
      
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        nikeInStock={nikeInStock}
        setNikeInStock={setNikeInStock}
      />
      
      <FloatingChat />
    </div>
  );
}
