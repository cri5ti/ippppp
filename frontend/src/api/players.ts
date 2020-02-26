import {API_URL} from "../config";


export type TPlayer = {
  code: string;
  description: string;
  email: string;
  wins: number;
  losses: number;
}

export const playersApi = {
  getAll: async (): Promise<TPlayer[]> => await (await fetch(API_URL + "/players")).json(),
  getOne: async (code: string): Promise<TPlayer> => await (await fetch(`${API_URL}/players/${code}`)).json(),
  create: async (body: any): Promise<Response> => await fetch(`${API_URL}/players`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }}),
  remove: async (code: string): Promise<Response> => await fetch(`${API_URL}/players/${code}`, {method: "DELETE"})
};
