import {API_URL} from "../../config";


export type Player = {
  description: string;
  email: string;
  code: string;
}

export const playersApi = {
  getAll: async (): Promise<Player[]> => await (await fetch(API_URL + "/players")).json()
};
