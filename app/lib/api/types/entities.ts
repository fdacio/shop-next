
export type ApiUser = {
    id: string;
    nome: string;
    username: string,
    email: string;
    password: string;
    rules: Rule[];
  };
  
  export type Rule = {
    id: string,
    nome: string
  }
  
  export type Token = {
    token: string;
    expired: Date
  }
  
  export type Product = {
    id: string;
    nome: string;
    descricao: string;
    preco: Number;
    foto: string;
  };
  
  
  export type Customer = {
    id: string;
    nome: string;
    email: string;
  };
  
  export type Order = {
    id: string;
    customer: Customer;
    data: string;
    //status: 'pending' | 'paid';
  };

  export type ApiErrorType = {
    status : Number,
    message : string
  }

  export type Config = {
    id: string,
    chave: string,
    valor: string
  }