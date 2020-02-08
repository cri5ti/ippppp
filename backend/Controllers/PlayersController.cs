using System.Collections.Generic;
using IP5.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Linq;
using System;
using IP5.Services;

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

		[HttpGet("{code?}")]
		public IEnumerable<Player> Get([FromRoute] string code)
		{
			if (!String.IsNullOrEmpty(code)) {
				return new[] { _playerService.Get(code)};
			}

			return _playerService.GetAll();
		}

		[HttpPut]
		public void Create(Player player)
		{
			_playerService.Add(player);
			//return _playerService.GetAll();
		}

		[HttpDelete]
		public void Delete(string code)
		{
			_playerService.Delete(code);
			//return _playerService.GetAll();
		}
	}
}






