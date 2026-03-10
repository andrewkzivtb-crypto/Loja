import { ShieldCheck, Lock, Star, HeadphonesIcon, RefreshCcw } from 'lucide-react';

export default function ExpandedTrust() {
  const benefits = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: "Pagamento na entrega",
      desc: "Você recebe, confere, depois paga."
    },
    {
      icon: <Lock className="w-6 h-6 text-orange-500" />,
      title: "Sem risco de golpe",
      desc: "O dinheiro fica com você até a entrega."
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      title: "Qualidade premium",
      desc: "Acabamento e conforto de alto padrão."
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6 text-blue-500" />,
      title: "Atendimento humano",
      desc: "Equipe disponível para tirar dúvidas."
    },
    {
      icon: <RefreshCcw className="w-6 h-6 text-purple-500" />,
      title: "Devolveu? Resolvemos.",
      desc: "Sua satisfação em primeiro lugar."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-zinc-900">
          Por que comprar com a gente?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-zinc-50 border border-zinc-100 hover:shadow-md transition-shadow">
              <div className="bg-white p-3 rounded-xl shadow-sm">
                {benefit.icon}
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 text-lg mb-1">{benefit.title}</h3>
                <p className="text-zinc-600 text-sm">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
