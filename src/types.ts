export interface Reservation {
  id: string;
  nome: string;
  whatsapp: string;
  endereco: string;
  tamanho: string;
  data: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}
