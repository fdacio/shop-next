/*
 * @author Vinnicius Gomes
 * @date Out/2021
 * @description
 * Esse código é para criar um RefreshToken com Axios e TypeScript, criando uma fila de requisições que falharam para serem executadas novamente.
 */
import axios, { AxiosError } from "axios";
//import { signOut } from "hooks/Auth";

// Variavel para informar se está acontecendo uma requisição de refresh token
let isRefreshing = false;
// Variavel para armazenar a fila de requisições que falharam por token expirado
let failedRequestQueue: {
  // Se a requisição der sucesso, chama o onSuccess
  onSuccess: (token: string) => void;
  // Se a requisição der erro, chama o onFailure
  onFailure: (err: AxiosError) => void;
}[] = [];

// Tipagem dos dados de response da api de autenticação
type AuthApiResponse = {
  token: string;
  refreshToken: string;
};

export function api() {
  // Cria as configurações iniciais do Axios
  const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // Cria um interceptor para interceptar todas as requisições que forem feitas
  api.interceptors.response.use(
    (response) => {
      // Se a requisição der sucesso, retorna a resposta
      return response;
    },
    (error: AxiosError) => {
      // Se a requisição der erro, verifica se o erro é de autenticação
      if (error.response?.status === 401) {
        // Se o erro for de autenticação, verifica se o erro foi de token expirado
        if (error.response.statusText === "token.expired") {
          // Recupera o refresh token do localStorage
          const refreshToken = localStorage.getItem("refreshToken");
          // Recupera toda a requisição que estava sendo feita e deu erro para ser refeita após o refresh token
          const originalConfig = error.config;

          // Verifica se já existe uma request de refreshToken acontecendo
          if (!isRefreshing) {
            // Se não existir, inicia a requisição de refreshToken
            isRefreshing = true;

            // Faz uma requisição de refreshToken
            api
              .post("/refresh", {
                refreshToken,
              })
              .then((response) => {
                // Recupera os dados do response e cria o newRefreshToken por que já está sendo utilizado a variável refreshToken
                const { token, refreshToken: newRefreshToken } =
                  response.data as AuthApiResponse;

                // Salva o token no localStorage
                localStorage.setItem("token", token);
                // Salva o refreshToken no localStorage
                localStorage.setItem("refreshToken", newRefreshToken);

                // Define novamente o header de autorização nas requisições
                api.defaults.headers["Authorization"] = `Bearer ${token}`;

                // Faz todas as requisições que estavam na fila e falharam
                failedRequestQueue.forEach((request) =>
                  request.onSuccess(token)
                );
                // Limpa a fila de requisições que falharam
                failedRequestQueue = [];
              })
              .catch((err) => {
                // Retorna os erros que estão salvos na fila de requisições que falharam
                failedRequestQueue.forEach((request) => request.onFailure(err));
                // Limpa a fila de requisições que falharam
                failedRequestQueue = [];

                // Caso der erro desloga o usuário
                //signOut();
              })
              .finally(() => {
                // Indica que a requisição de refreshToken acabou
                isRefreshing = false;
              });
          }

          // Usando a Promise no lugar do async await, para que a requisição seja feita após o refresh token
          return new Promise((resolve, reject) => {
            // Adiciona a requisição na fila de requisições que falharam com as informações necessárias para refazer a requisição novamente
            failedRequestQueue.push({
              // Se a requisição der sucesso, chama o onSuccess
              onSuccess: (token: string) => {
                // Adiciona o novo token gerado no refresh token no header de autorização
                originalConfig.headers["Authorization"] = `Bearer ${token}`;

                // Faz a requisição novamente passando as informações originais da requisição que falhou
                resolve(api(originalConfig));
              },
              // Se a requisição der erro, chama o onFailure
              onFailure: (err: AxiosError) => {
                // Se não for possivel refazer a requisição, retorna o erro
                reject(err);
              },
            });
          });
        } else {
          // Caso der erro desloga o usuário
          signOut();
        }
      }

      // Se não cair em nenhum if retorna um error padrão
      return Promise.reject(error);
    }
  );

  return api;
}