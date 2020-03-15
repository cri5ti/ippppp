import {API_URL} from "../../config";


export type Game = {
    code: string,
    playerOneCode: string,
    playerTwoCode: string,
    scoreOne: number,
    scoreTwo: number,
    isActive: boolean
}

export const gamesApi = {
    getAll: async (): Promise<Game[]> => await (await fetch(API_URL + "/games")).json()
};
