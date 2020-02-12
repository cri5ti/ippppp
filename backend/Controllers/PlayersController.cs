using System.Collections.Generic;
using System.Threading.Tasks;
using IP5.Model;
using IP5.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace IP5.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class PlayersController : ControllerBase
	{
		private readonly IPlayersRepository _playerRepository;
		private readonly ILogger<PlayersController> _logger;

		public PlayersController(IPlayersRepository playersRepository, ILogger<PlayersController> logger)
		{
			_playerRepository = playersRepository;
			_logger = logger;
		}

		[HttpGet]
		public async IAsyncEnumerable<Player> GetAll()
		{
			await foreach (var player in _playerRepository.GetAll())
				yield return player;
		}
		
		[HttpGet("{code}")]
		public Task<Player> GetByCode([FromRoute] string code)
		{
			return _playerRepository.Get(code);
		}

		[HttpPut]
		public void Create(Player player)
		{
			_playerRepository.Add(player);
		}

		[HttpDelete]
		public void Delete(string code)
		{
			_playerRepository.Delete(code);
		}
	}
}






