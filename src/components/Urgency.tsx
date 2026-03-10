import { useState, useEffect } from 'react';
import { AlertTriangle, Clock } from 'lucide-react';

export default function Urgency() {
  const [timeLeft, setTimeLeft] = useState(2 * 3600 + 47 * 60 + 33); // 02:47:33 in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) return 2 * 3600 + 47 * 60 + 33; // reset
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-16 bg-orange-50 border-y border-orange-200">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-orange-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-red-500" />
          
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-4 rounded-full">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-6 leading-tight">
            Atenção: golpes na internet existem e você tem razão em desconfiar.
          </h2>
          
          <p className="text-lg text-zinc-700 mb-8 max-w-2xl mx-auto">
            Por isso trabalhamos <strong className="text-zinc-900">exclusivamente com pagamento na entrega</strong>. Você não paga nada antecipado. Zero risco.
          </p>
          
          <div className="inline-flex flex-col items-center bg-zinc-900 text-white px-8 py-4 rounded-2xl shadow-xl">
            <div className="flex items-center gap-2 mb-2 text-orange-400 font-medium uppercase tracking-wider text-sm">
              <Clock className="w-4 h-4" />
              Promoção encerra em:
            </div>
            <div className="text-4xl md:text-5xl font-mono font-bold tracking-tight">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
