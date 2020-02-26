import {API_URL} from "../config";

export type TSessionPlayers = {
    sessionCode: string,
    playerCode: string
}

export type TSession = {
    code: string,
    description: string,
    minGamesRequired: number,
    isActive: boolean,
    sessionPlayers: Array<any> //todo sessionPlayer
}

export const sessionApi = {
    getAll: async (): Promise<TSession[]> => await (await fetch(API_URL + "/sessions")).json(),
    getOne: async (code: string): Promise<TSession> => await (await fetch(`${API_URL}/sessions/${code}`)).json(),
    addPlayer: async (players: Array<TSessionPlayers>): Promise<Response> => await fetch(`${API_URL}/session/players`, {
        method: "PUT",
        body: JSON.stringify(players),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
    }}),
    create: async (body: Partial<TSession>): Promise<Response> => await fetch(`${API_URL}/sessions`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }}),
    remove: async (code: string): Promise<Response> => await fetch(`${API_URL}/sessions/${code}`, {method: "DELETE"})
};
