using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IP5.Extensions;
using IP5.Model;
using Microsoft.EntityFrameworkCore;

namespace IP5.Repositories
{
    public interface ISessionPlayersRepository
    {
        Task Add(SessionPlayer SessionPlayer);
        IAsyncEnumerable<SessionPlayer> GetAll();
    }

    public class SessionPlayersRepository : ISessionPlayersRepository
    {
        private readonly PingPongContext _db;

        public SessionPlayersRepository(PingPongContext db)
        {
            _db = db;
        }

        public IAsyncEnumerable<SessionPlayer> GetAll()
        {
            return _db.SessionPlayers
                .Select(i => new SessionPlayer
                {
                    SessionId = i.SessionId,
                    PlayerId = i.PlayerId
                })
                .AsAsyncEnumerable();
        }

        public Task Add(SessionPlayer SessionPlayer)
        {
            _db.SessionPlayers.Add(new DbSessionPlayer
            {
                SessionId = SessionPlayer.SessionId,
                PlayerId = SessionPlayer.PlayerId
            });
            return _db.SaveChangesAsync();
        }
    }
}