using System.Collections.Generic;
using System.Threading.Tasks;
using IP5.Model;
using IP5.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace IP5.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class PlayersController : ControllerBase
	{
		private readonly IPlayersService _playerService;
		private readonly ILogger<PlayersController> _logger;

		public PlayersController(IPlayersService playerService, ILogger<PlayersController> logger)
		{
			_playerService = playerService;
			_logger = logger;
		}

		[HttpGet]
		public async IAsyncEnumerable<Player> GetAll()
		{
			await foreach (var player in _playerService.GetAll())
				yield return player;
		}
		
		[HttpGet("{code}")]
		public Task<Player> GetByCode([FromRoute] string code)
		{
			return _playerService.Get(code);
		}

		[HttpPut]
		public void Create(Player player)
		{
			_playerService.Add(player);
		}

		[HttpDelete]
		public void Delete(string code)
		{
			_playerService.Delete(code);
		}
	}
}






