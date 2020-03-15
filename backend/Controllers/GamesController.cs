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
	public class GamesController : ControllerBase
	{
		private readonly ILogger<GamesController> _logger;
		private readonly IGamesRepository _gamesRepository;	

		public GamesController(IGamesRepository gamesRepository, ILogger<GamesController> logger)
		{
			_logger = logger;
			_gamesRepository = gamesRepository;
		}

		[HttpGet]
		public async IAsyncEnumerable<Game> GetAll()
		{
			await foreach (var game in _gamesRepository.GetAll())
				yield return game;
		}

		[HttpGet("{code}")]
		public Task<Game> Get([FromRoute] string code)
		{
			return _gamesRepository.Get(code);
		}

		[HttpPut]
		public void Create(Game game)
		{
			_gamesRepository.Add(game);
		}

		[HttpDelete("{code}")]
		public void Delete(string code)
		{
			_gamesRepository.Delete(code);
		}
	}
}