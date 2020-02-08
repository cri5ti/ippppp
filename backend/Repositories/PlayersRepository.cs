using IP5.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IP5.Repositories
{
    public interface IPlayersRepository
    {
        List<Player> GetAll();
        Player Get(string code);
        void Add(Player player);
        void Delete(string code);
    }

    public class PlayersRepository: IPlayersRepository
    {
        public List<Player> GetAll()
        {
            return this.data;
        }

        public Player Get(string code)
        {
            return this.data.Find(i => i.Code == code);
        }

        public void Add(Player player)
        {
            this.data.Add(player);
        }

        public void Delete(string code)
        {
            var data = this.data;

            var index = data.FindIndex(i => i.Code == code);
            this.data.RemoveAt(index);
        }

        protected List<Player> data = new List<Player>()
            {
                new Player {Code = "jl" , Description = "Joel", Wins = 3, Losses = 6},
                new Player {Code = "jan", Description = "Jan", Wins = 5, Losses = 11, IsChampion = true},
                new Player {Code = "andy" , Description = "Andy", Wins = 11, Losses = 9}
            };
        }
}
