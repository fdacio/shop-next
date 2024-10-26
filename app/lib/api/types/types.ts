// However, these types are generated automatically if you're using an ORM such as Prisma.
export type ApiUser = {
    id: string;
    nome: string;
    username: string,
    email: string;
    password: string;
    rules: Rule[];
    emailVerified: Date
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
  
  export type Orders = {
    id: string;
    customer_id: string;
    amount: number;
    date: string;
    // In TypeScript, this is called a string union type.
    // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
    status: 'pending' | 'paid';
  };

  export type ApiErrorType = {
    status : Number,
    message : string
  }