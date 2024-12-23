
export type ApiUser = {
  id: string;
  nome: string;
  nomeSobrenome: string,
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
  token: string | undefined;
  expired: number | undefined 
}

export type Product = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  foto: string;
};


export type Customer = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
};

export type Order = {
  id: string;
  customer: Customer;
  data: string;
  total: number;
  //status: 'pending' | 'paid';
};

export type Config = {
  id: string,
  chave: string,
  valor: string
}

export type ApiResponseType = {
  data? : any | undefined,
  loading? : boolean,
  error? : ApiResponseError | undefined,
  success? : ApiResponseSuccess | undefined,
  handlePost?: any | undefined 
}

export type ApiResponse = {
  status: number | undefined,
  message: string | undefined,
}

export interface ApiResponseError extends ApiResponse {
  fields: string[]
}

export interface ApiResponseSuccess extends ApiResponse { }
