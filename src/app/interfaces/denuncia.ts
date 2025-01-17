export interface Denuncia {
    id: number;
    relato: string;
    conselheiro: number;
    pessoa: {id: number, nome: string};
  }