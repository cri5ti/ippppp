using IP5.Repositories;

namespace IP5.Services
{
    public interface IPlayersService : IPlayersRepository
    {

    }

    public class PlayersService : PlayersRepository, IPlayersService
    {
        public PlayersService(PingPongContext db) : base(db)
        {
        }
    }
}