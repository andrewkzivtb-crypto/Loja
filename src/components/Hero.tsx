import { ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-zinc-900 text-white pt-24 pb-16 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
          Tênis de Alto Padrão.<br />
          <span className="text-orange-500">Você Só Paga Quando Receber.</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
          Conforto absoluto, qualidade premium e segurança total. Escolha o seu modelo e pague somente ao entregador.
        </p>
        
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2 bg-zinc-800/80 border border-zinc-700 rounded-full px-6 py-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <span className="font-medium text-emerald-50">Pagamento 100% na Entrega</span>
          </div>
        </div>

        <a 
          href="#produtos" 
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-10 py-4 rounded-xl shadow-lg shadow-orange-500/30 transition-all hover:scale-105 active:scale-95 animate-pulse"
        >
          VER MODELOS DISPONÍVEIS
        </a>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
    </section>
  );
}
