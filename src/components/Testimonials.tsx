import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Carlos Eduardo",
      city: "São Paulo, SP",
      text: "Recebi em casa, conferi na hora e fiquei impressionado com a qualidade. Paguei só depois de ver o produto. Muito seguro!",
      avatar: "https://i.pravatar.cc/150?u=carlos"
    },
    {
      name: "Marcos Silva",
      city: "Belo Horizonte, MG",
      text: "Achei que era golpe mas resolvi arriscar. Chegou em 3 dias. Recomendo demais, o conforto é absurdo.",
      avatar: "https://i.pravatar.cc/150?u=marcos"
    },
    {
      name: "Rafael Oliveira",
      city: "Curitiba, PR",
      text: "Já é o segundo par que compro. O conforto é incrível e o pagamento na entrega dá total segurança. Top demais.",
      avatar: "https://i.pravatar.cc/150?u=rafael"
    }
  ];

  return (
    <section className="py-20 bg-zinc-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          O que dizem nossos clientes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-zinc-800 p-8 rounded-3xl border border-zinc-700 relative">
              <div className="flex gap-1 mb-6 text-orange-500">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-zinc-300 mb-8 italic text-lg leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-zinc-600" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <p className="text-sm text-zinc-400">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
