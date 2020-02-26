using System;
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
        Task Add(List<SessionPlayer> SessionPlayer);
    }

    public class SessionPlayersRepository : ISessionPlayersRepository
    {
        private readonly PingPongContext _db;

        public SessionPlayersRepository(PingPongContext db)
        {
            _db = db;
        }

        public Task Add(List<SessionPlayer> SessionPlayer)
        {
            SessionPlayer.ForEach(i =>
                _db.SessionPlayers.Add(new DbSessionPlayer
                {
                    SessionId = i.SessionCode.ToGuid(),
                    PlayerId = i.PlayerCode.ToGuid()
                })
            );
            
            return _db.SaveChangesAsync();
        }
    }
}