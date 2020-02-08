using System.Collections.Generic;
using System.Linq;
using IP5.Model;

namespace IP5.Repositories
{
    public interface IPlayersRepository
    {
        List<Player> GetAll();
        Player Get(string code);
        void Add(Player player);
        void Delete(string code);
    }

    public class PlayersRepository : IPlayersRepository
    {
        public List<Player> GetAll()
        {
            return _data;
        }

        public Player Get(string code)
        {
            return _data.First(i => i.Code == code);
        }

        public void Add(Player player)
        {
            _data.Add(player);
        }

        public void Delete(string code)
        {
            var index = _data.FindIndex(i => i.Code == code);
            _data.RemoveAt(index);
        }

        private readonly List<Player> _data = new List<Player>()
        {
            new Player {Code = "jl", Description = "Joel", Wins = 3, Losses = 6},
            new Player {Code = "jan", Description = "Jan", Wins = 5, Losses = 11, IsChampion = true},
            new Player {Code = "andy", Description = "Andy", Wins = 11, Losses = 9}
        };
    }
}
