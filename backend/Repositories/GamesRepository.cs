using IP5.Extensions;
using IP5.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IP5.Repositories
{
    public interface IGamesRepository
    {
        IAsyncEnumerable<Game> GetAll();
        Task Add(Game game);
        Task Delete(string code);
        Task<Game> Get(string code);
    }

    public class GamesRepository : IGamesRepository
    {
        private PingPongContext _db;

        public GamesRepository(PingPongContext db)
        {
            _db = db;
        }

        public Task Add(Game game)
        {
            _db.Games.Add(new DbGame {
                Id = game.Code.ToGuid(),
                IsActive = game.IsActive,
                PlayerOneId = game.PlayerOneCode.ToGuid(),
                PlayerTwoId = game.PlayerOneCode.ToGuid()
            });

            return _db.SaveChangesAsync();
        }

        public Task Delete(string code)
        {
            var game = _db.Games.Where(i => i.Id == code.ToGuid());
            _db.Remove(game);
            return _db.SaveChangesAsync();
        }

        public Task<Game> Get(string code)
        {
            return _db.Games.Where(i => i.Id == code.ToGuid())
                .Select(i => new Game
                {
                    Code = i.Id.ToBase64(),
                    IsActive = i.IsActive,
                    PlayerOneCode = i.PlayerOneId.ToBase64(),
                    PlayerTwoCode = i.PlayerTwoId.ToBase64(),
                    ScoreOne = i.ScoreOne,
                    ScoreTwo = i.ScoreTwo
                }).FirstAsync();
        }

        public IAsyncEnumerable<Game> GetAll()
        {
            return _db.Games.Select(i => new Game
            {
                Code = i.Id.ToBase64(),
                IsActive = i.IsActive,
                PlayerOneCode = i.PlayerOneId.ToBase64(),
                PlayerTwoCode = i.PlayerTwoId.ToBase64(),
                ScoreOne = i.ScoreOne,
                ScoreTwo = i.ScoreTwo
            }).AsAsyncEnumerable();
        }
    }
}
