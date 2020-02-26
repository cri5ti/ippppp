import {API_URL} from "../config";

export type Session = {
    code: string,
    description: string,
    minGamesRequired: number,
    isActive: boolean,
    sessionPlayers: Array<any> //todo sessionPlayer
}

export const sessionApi = {
    getAll: async (): Promise<Session[]> => await (await fetch(API_URL + "/sessions")).json(),
    getOne: async (code: string): Promise<Session> => await (await fetch(`${API_URL}/sessions/${code}`)).json(),
    create: async (body: Partial<Session>): Promise<Response> => await fetch(`${API_URL}/sessions`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }}),
    remove: async (code: string): Promise<Response> => await fetch(`${API_URL}/sessions/${code}`, {method: "DELETE"})
};
