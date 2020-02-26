using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IP5.Extensions;
using IP5.Model;
using Microsoft.EntityFrameworkCore;

namespace IP5.Repositories
{
    public interface ISessionsRepository
    {
        IAsyncEnumerable<Session> GetAll();
        Task<Session> Get(string code);
        Task Add(Session Session);
        Task Delete(string code);
    }

    public class SessionsRepository : ISessionsRepository
    {
        private readonly PingPongContext _db;

        public SessionsRepository(PingPongContext db)
        {
            _db = db;
        }

        public IAsyncEnumerable<Session> GetAll()
        {
            //todo get include paths for session players
            return _db.Sessions
                .Select(i => new Session
                {
                    Code = i.Id.ToBase64(),
                    Description = i.Description,
                    MinGamesRequired = i.MinGamesRequired,
                    IsActive = i.IsActive,
                    SessionPlayers = i.SessionPlayers.Select(j => new SessionPlayer { 
                        Player = new Player
                        {
                            Code = j.Player.Id.ToBase64(),
                            Description = j.Player.Name
                        }
                    }).ToList()
                })
                .AsAsyncEnumerable();
        }
        
        public Task<Session> Get(string code)
        {
            var id = code.ToGuid();
            return _db.Sessions
                .Where(i => i.Id == id)
                .Select(i => new Session
                {
                    Code = i.Id.ToBase64(),
                    Description = i.Description,
                    MinGamesRequired = i.MinGamesRequired,
                    IsActive = i.IsActive,
                    SessionPlayers = i.SessionPlayers.Select(j => new SessionPlayer
                    {
                        Player = new Player
                        {
                            Code = j.Player.Id.ToBase64(),
                            Description = j.Player.Name
                        }
                    }).ToList()
                })
                .FirstAsync();
        }

        public Task Add(Session Session)
        {
            _db.Sessions.Add(new DbSession
            {
                Description = Session.Description,
                MinGamesRequired = Session.MinGamesRequired,
                IsActive = Session.IsActive
            });
            return _db.SaveChangesAsync();
        }

        public Task Delete(string code)
        {
            var Session = new DbSession {Id = code.ToGuid()};
            _db.Sessions.Remove(Session);
            return _db.SaveChangesAsync();
        }
    }
}