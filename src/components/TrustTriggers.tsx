import { ShieldCheck, Truck, Award } from 'lucide-react';

export default function TrustTriggers() {
  return (
    <section className="bg-zinc-100 py-12 border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="bg-emerald-100 p-4 rounded-full mb-4">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="font-bold text-zinc-900 text-lg mb-2">Pagamento só na entrega</h3>
            <p className="text-zinc-600 text-sm">Você recebe, confere e só depois paga ao entregador.</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="bg-orange-100 p-4 rounded-full mb-4">
              <Truck className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-bold text-zinc-900 text-lg mb-2">Enviamos para todo o Brasil</h3>
            <p className="text-zinc-600 text-sm">Entrega rápida e segura direto na sua porta.</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-zinc-900 text-lg mb-2">Qualidade premium garantida</h3>
            <p className="text-zinc-600 text-sm">Acabamento impecável e conforto de alto padrão.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
