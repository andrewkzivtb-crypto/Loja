import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "É seguro comprar online aqui?",
      a: "Sim, totalmente seguro! A principal diferença da nossa loja é que você NÃO paga nada antecipado. O pagamento é feito 100% na entrega, direto para o entregador, após você receber o produto em mãos."
    },
    {
      q: "Como funciona a entrega?",
      a: "Enviamos para todo o Brasil via transportadora parceira. O prazo médio varia de 3 a 10 dias úteis dependendo da sua região. Você receberá o código de rastreio para acompanhar."
    },
    {
      q: "E se eu não gostar do produto?",
      a: "Sua satisfação é nossa prioridade. Se o produto não servir ou você não gostar, temos uma política de devolução facilitada em até 7 dias após o recebimento. Resolvemos tudo de forma rápida e humana."
    },
    {
      q: "O produto é de qualidade?",
      a: "Trabalhamos apenas com a linha premium de altíssimo padrão. Nosso foco é entregar um acabamento impecável, durabilidade e o máximo de conforto para os seus pés."
    },
    {
      q: "Como faço para agendar o Nike?",
      a: "Como o modelo Nike Vomero Premium está esgotado devido à alta demanda, criamos um sistema de agendamento. Basta clicar no botão 'QUERO AGENDAR O MEU' e preencher seus dados. Você não paga nada agora e garante prioridade na próxima remessa."
    }
  ];

  return (
    <section className="py-20 bg-zinc-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-zinc-900">
          Dúvidas Frequentes
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button 
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-bold text-zinc-900 text-lg pr-8">{faq.q}</span>
                {openIndex === i ? (
                  <ChevronUp className="w-5 h-5 text-orange-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === i && (
                <div className="px-6 pb-5 text-zinc-600 leading-relaxed border-t border-zinc-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
