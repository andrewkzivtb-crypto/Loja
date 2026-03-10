import { Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export default function Footer({ onOpenAdmin }: FooterProps) {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-800 relative">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-8">
          <h3 className="text-white font-bold text-xl mb-4">Loja Premium de Tênis</h3>
          <p className="max-w-md mx-auto text-sm">
            Especialistas em conforto e qualidade de alto padrão. O único lugar onde você paga somente quando receber o produto em mãos.
          </p>
        </div>
        
        <div className="text-xs border-t border-zinc-800 pt-8 mt-8 flex flex-col items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Loja Premium de Tênis. Todos os direitos reservados.</p>
          <p>CNPJ: 00.000.000/0001-00 | Rua Fictícia, 123 - São Paulo, SP</p>
        </div>
      </div>
      
      <button 
        onClick={onOpenAdmin}
        className="absolute bottom-4 right-4 p-2 text-zinc-800 hover:text-zinc-600 transition-colors focus:outline-none"
        aria-label="Acesso Administrativo"
      >
        <Lock className="w-4 h-4" />
      </button>
    </footer>
  );
}
