class PlayersCtrl{

    public getAll = async (baseUrl?: string): Promise<any> => {
        return await (await fetch(baseUrl ? `${baseUrl}/api/players` : `/api/players`)).json();
    }

}


export const playersCtrl = new PlayersCtrl();
