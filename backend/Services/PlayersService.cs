using IP5.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IP5.Services
{
    public interface IPlayersService : IPlayersRepository 
    {
    
    }

    public class PlayersService: PlayersRepository, IPlayersService
    {

    }
}
