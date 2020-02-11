using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IP5.Extensions;
using IP5.Model;
using Microsoft.EntityFrameworkCore;

namespace IP5.Repositories
{
    public interface IPlayersRepository
    {
        IAsyncEnumerable<Player> GetAll();
        Task<Player> Get(string code);
        Task Add(Player player);
        Task Delete(string code);
    }

    public class PlayersRepository : IPlayersRepository
    {
        private readonly PingPongContext _db;

        public PlayersRepository(PingPongContext db)
        {
            _db = db;
        }

        public IAsyncEnumerable<Player> GetAll()
        {
            return _db.Players
                .Select(i => new Player
                {
                    Code = i.Id.ToBase64(),
                    Description = i.Name,
                    Email = i.Email
                })
                .AsAsyncEnumerable();
        }
        
        public Task<Player> Get(string code)
        {
            var id = code.ToGuid();
            return _db.Players
                .Where(i => i.Id == id)
                .Select(i => new Player
                {
                    Code = i.Id.ToBase64(),
                    Description = i.Name,
                    Email = i.Email
                })
                .FirstAsync();
        }

        public Task Add(Player player)
        {
            _db.Players.Add(new DbPlayer
            {
                Name = player.Description,
                Email = player.Email
            });
            return _db.SaveChangesAsync();
        }

        public Task Delete(string code)
        {
            var player = new DbPlayer {Id = code.ToGuid()};
            _db.Players.Remove(player);
            return _db.SaveChangesAsync();
        }
    }
}