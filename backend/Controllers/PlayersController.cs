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
			var data = _playerService.GetPlayers();

			var list = data.ToList();

			if (!String.IsNullOrEmpty(code)) {
				return new[] { list.Find((item) => item.Code == code) };
			}

			return data;
		}
	}
}






