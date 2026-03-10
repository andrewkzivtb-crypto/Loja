import { useState, useEffect, useRef } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { generateChatResponse } from '../services/ai';
import { Reservation, Message } from '../types';

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SchedulingModal({ isOpen, onClose }: SchedulingModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // State for the reservation flow
  const [step, setStep] = useState(0);
  const [reservationData, setReservationData] = useState<Partial<Reservation>>({});

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: Date.now().toString(),
          text: "Oi! 😊 Que ótimo que você quer garantir o seu Nike! Esse modelo está sendo muito procurado. Me passa seus dados rapidinho e já deixo seu pedido na fila de prioridade, tá bom?\n\nQual é o seu nome completo?",
          sender: 'bot',
          timestamp: Date.now()
        }
      ]);
      setStep(1);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Handle the specific flow
    let botResponse = "";
    let nextStep = step;

    if (step === 1) {
      setReservationData(prev => ({ ...prev, nome: userMsg.text }));
      botResponse = `Prazer, ${userMsg.text.split(' ')[0]}! Agora, qual é o seu número de WhatsApp com DDD?`;
      nextStep = 2;
    } else if (step === 2) {
      setReservationData(prev => ({ ...prev, whatsapp: userMsg.text }));
      botResponse = "Anotado! Qual é o seu endereço completo para entrega? (Rua, número, bairro, cidade, estado e CEP)";
      nextStep = 3;
    } else if (step === 3) {
      setReservationData(prev => ({ ...prev, endereco: userMsg.text }));
      botResponse = "Perfeito. E qual é a numeração do seu tênis?";
      nextStep = 4;
    } else if (step === 4) {
      const finalData = { ...reservationData, tamanho: userMsg.text, data: new Date().toISOString(), id: Date.now().toString() } as Reservation;
      
      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem('agendamentos_nike') || '[]');
      localStorage.setItem('agendamentos_nike', JSON.stringify([...existing, finalData]));
      
      botResponse = "🎉 Perfeito! Seu agendamento foi confirmado com sucesso! Assim que o estoque chegar você será um dos primeiros avisados. Fique de olho no seu WhatsApp!";
      nextStep = 5;
    } else {
      // If flow is done or user asks something else, use AI
      const history = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      })) as any;
      
      botResponse = await generateChatResponse(history, userMsg.text);
    }

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: Date.now()
      }]);
      setStep(nextStep);
      setIsTyping(false);
    }, 1500); // Simulate typing delay
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[90vh] animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-zinc-900 text-white p-4 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold text-lg">
              V
            </div>
            <div>
              <h3 className="font-bold">Vendedor Premium</h3>
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> Online
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-zinc-50 flex flex-col gap-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-orange-500 text-white rounded-tr-sm' 
                  : 'bg-white border border-zinc-200 text-zinc-800 rounded-tl-sm'
              }`}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                <span className={`text-[10px] mt-2 block ${msg.sender === 'user' ? 'text-orange-200' : 'text-zinc-400'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-zinc-200 p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
                <span className="text-sm text-zinc-500 font-medium">digitando...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-zinc-200">
          <div className="flex items-center gap-2 bg-zinc-100 rounded-full p-1 pr-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-transparent px-4 py-3 focus:outline-none text-zinc-800"
              disabled={isTyping}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-300 text-white p-3 rounded-full transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
