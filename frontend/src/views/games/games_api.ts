import {API_URL} from "../../config";


export type Game = {
    // code: string;
    // description: string;
    // email: string;
    // wins: number;
    // losses: number;
}

export const gamesApi = {
    getAll: async (): Promise<Game[]> => await (await fetch(API_URL + "/games")).json()
};
