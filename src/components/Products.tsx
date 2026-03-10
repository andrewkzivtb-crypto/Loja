import { useState } from 'react';
import { NIKE_IMAGES, ADIDAS_IMAGES } from '../constants';
import { ShoppingCart, CalendarClock, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductsProps {
  onOpenSchedule: () => void;
  nikeInStock: boolean;
}

export default function Products({ onOpenSchedule, nikeInStock }: ProductsProps) {
  const [nikeIndex, setNikeIndex] = useState(0);
  const [adidasIndex, setAdidasIndex] = useState(0);

  const nextImage = (setter: any, max: number) => setter((prev: number) => (prev + 1) % max);
  const prevImage = (setter: any, max: number) => setter((prev: number) => (prev - 1 + max) % max);

  return (
    <section id="produtos" className="py-20 bg-zinc-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-zinc-900">
          Escolha o seu modelo
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Produto 1: Nike */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-zinc-100 flex flex-col">
            <div className="relative aspect-square group">
              <img 
                src={NIKE_IMAGES[nikeIndex]} 
                alt="Nike Vomero Premium" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  🔥 Muito Procurado
                </span>
                {!nikeInStock ? (
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    ⚠️ Estoque Esgotado — Agende o seu
                  </span>
                ) : (
                  <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    ✅ Em Estoque — Pronta Entrega
                  </span>
                )}
              </div>
              
              <button onClick={() => prevImage(setNikeIndex, NIKE_IMAGES.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors">
                <ChevronLeft className="w-5 h-5 text-zinc-800" />
              </button>
              <button onClick={() => nextImage(setNikeIndex, NIKE_IMAGES.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors">
                <ChevronRight className="w-5 h-5 text-zinc-800" />
              </button>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {NIKE_IMAGES.map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i === nikeIndex ? 'bg-orange-500' : 'bg-white/50'}`} />
                ))}
              </div>
            </div>
            
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-zinc-900 mb-2">Tênis Masculino Nike Vomero Premium</h3>
              <p className="text-3xl font-black text-orange-500 mb-4">R$ 298,90</p>
              <p className="text-zinc-600 mb-8 flex-grow">
                Leveza extrema, solado responsivo e conforto absoluto para o dia a dia ou academia. Design esportivo premium em preto com detalhes laranja e branco.
              </p>
              
              {!nikeInStock ? (
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={onOpenSchedule}
                    className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <CalendarClock className="w-5 h-5" />
                    📋 QUERO AGENDAR O MEU
                  </button>
                  <p className="text-xs text-center text-zinc-500 font-medium">
                    Cadastre seus dados e garanta prioridade quando o estoque chegar
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <a 
                    href="https://app.coinzz.com.br/checkout/1-unidade-nike-0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors animate-pulse"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    🛒 COMPRAR AGORA — PAGAR NA ENTREGA
                  </a>
                  <p className="text-xs text-center text-zinc-500 font-medium">
                    Você paga somente quando o tênis chegar na sua porta
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Produto 2: Adidas */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-zinc-100 flex flex-col">
            <div className="relative aspect-square group">
              <img 
                src={ADIDAS_IMAGES[adidasIndex]} 
                alt="Adidas Adizero Drive RC" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  ✅ Em Estoque — Pronta Entrega
                </span>
              </div>
              
              {ADIDAS_IMAGES.length > 1 && (
                <>
                  <button onClick={() => prevImage(setAdidasIndex, ADIDAS_IMAGES.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors">
                    <ChevronLeft className="w-5 h-5 text-zinc-800" />
                  </button>
                  <button onClick={() => nextImage(setAdidasIndex, ADIDAS_IMAGES.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors">
                    <ChevronRight className="w-5 h-5 text-zinc-800" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {ADIDAS_IMAGES.map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i === adidasIndex ? 'bg-orange-500' : 'bg-white/50'}`} />
                    ))}
                  </div>
                </>
              )}
            </div>
            
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-zinc-900 mb-2">Tênis Masculino Adidas Adizero Drive RC</h3>
              <p className="text-3xl font-black text-orange-500 mb-4">R$ 278,90</p>
              <p className="text-zinc-600 mb-8 flex-grow">
                Leveza extrema, solado responsivo Lightstrike e design arrojado. Branco com detalhes laranja e amarelo neon. O padrão premium que seus pés merecem.
              </p>
              
              <div className="flex flex-col gap-3">
                <a 
                  href="https://app.coinzz.com.br/checkout/1-unidade-adidas-0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors animate-pulse shadow-lg shadow-orange-500/20"
                >
                  <ShoppingCart className="w-5 h-5" />
                  🛒 COMPRAR AGORA — PAGAR NA ENTREGA
                </a>
                <p className="text-xs text-center text-zinc-500 font-medium">
                  Você paga somente quando o tênis chegar na sua porta
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
