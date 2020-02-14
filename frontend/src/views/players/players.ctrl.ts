class PlayersCtrl{

  public getAll = async (useProxy: boolean = true): Promise<any> => {
    const url = useProxy ? `/api/players` : `http://localhost:5000/players`;

    return await (await fetch(url)).json();
  }
}

export const playersCtrl = new PlayersCtrl();
