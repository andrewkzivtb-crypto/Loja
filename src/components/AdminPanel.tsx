import React, { useState, useEffect } from 'react';
import { X, Download, Package, RefreshCcw, Lock } from 'lucide-react';
import { Reservation } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  nikeInStock: boolean;
  setNikeInStock: (val: boolean) => void;
}

export default function AdminPanel({ isOpen, onClose, nikeInStock, setNikeInStock }: AdminPanelProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      const data = JSON.parse(localStorage.getItem('agendamentos_nike') || '[]');
      setReservations(data);
    }
  }, [isOpen, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin2025') {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta');
    }
  };

  const exportCSV = () => {
    if (reservations.length === 0) return;
    
    const headers = ['Nome', 'WhatsApp', 'Endereço', 'Tamanho', 'Data'];
    const csvContent = [
      headers.join(','),
      ...reservations.map(r => 
        `"${r.nome}","${r.whatsapp}","${r.endereco}","${r.tamanho}","${new Date(r.data).toLocaleString()}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'agendamentos_nike.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleStock = () => {
    const newState = !nikeInStock;
    setNikeInStock(newState);
    localStorage.setItem('nike_in_stock', JSON.stringify(newState));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="bg-zinc-900 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Lock className="w-6 h-6" /> Painel Administrativo
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!isAuthenticated ? (
          <div className="p-12 flex flex-col items-center justify-center flex-1">
            <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-4">
              <label className="font-bold text-zinc-700">Senha de Acesso</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-zinc-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Digite a senha..."
              />
              <button type="submit" className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3 rounded-xl transition-colors">
                Entrar
              </button>
            </form>
          </div>
        ) : (
          <div className="p-6 flex flex-col flex-1 overflow-hidden">
            <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
              <div className="flex gap-4">
                <button 
                  onClick={exportCSV}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" /> Exportar CSV
                </button>
                
                <button 
                  onClick={toggleStock}
                  className={`${nikeInStock ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors`}
                >
                  {nikeInStock ? <RefreshCcw className="w-4 h-4" /> : <Package className="w-4 h-4" />}
                  {nikeInStock ? 'Reverter para Sem Estoque' : 'ESTOQUE CHEGOU (Ativar Venda)'}
                </button>
              </div>
              
              <div className="bg-zinc-100 px-4 py-2 rounded-lg font-mono text-sm">
                Status Nike: <strong className={nikeInStock ? 'text-emerald-600' : 'text-red-600'}>{nikeInStock ? 'EM ESTOQUE' : 'ESGOTADO'}</strong>
              </div>
            </div>

            <div className="flex-1 overflow-auto border border-zinc-200 rounded-xl">
              <table className="w-full text-left border-collapse">
                <thead className="bg-zinc-50 sticky top-0">
                  <tr>
                    <th className="p-4 border-b border-zinc-200 font-bold text-zinc-700">Data</th>
                    <th className="p-4 border-b border-zinc-200 font-bold text-zinc-700">Nome</th>
                    <th className="p-4 border-b border-zinc-200 font-bold text-zinc-700">WhatsApp</th>
                    <th className="p-4 border-b border-zinc-200 font-bold text-zinc-700">Tamanho</th>
                    <th className="p-4 border-b border-zinc-200 font-bold text-zinc-700">Endereço</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-zinc-500">Nenhum agendamento encontrado.</td>
                    </tr>
                  ) : (
                    reservations.map((r, i) => (
                      <tr key={i} className="hover:bg-zinc-50 border-b border-zinc-100 last:border-0">
                        <td className="p-4 text-sm text-zinc-600 whitespace-nowrap">{new Date(r.data).toLocaleDateString()}</td>
                        <td className="p-4 font-medium text-zinc-900">{r.nome}</td>
                        <td className="p-4 text-zinc-600">{r.whatsapp}</td>
                        <td className="p-4 font-bold text-orange-600">{r.tamanho}</td>
                        <td className="p-4 text-sm text-zinc-600 max-w-xs truncate" title={r.endereco}>{r.endereco}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


