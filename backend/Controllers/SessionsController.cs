using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IP5.Model;
using IP5.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace IP5.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class SessionsController : ControllerBase
	{
		private readonly ISessionsRepository _sessionRepository;
		private readonly ISessionPlayersRepository _sessionPlayersRepository;
		private readonly ILogger<SessionsController> _logger;

		public SessionsController(ISessionsRepository sessionRepository, ISessionPlayersRepository sessionPlayersRepository, ILogger<SessionsController> logger)
		{
			_logger = logger;
			_sessionRepository = sessionRepository;
			_sessionPlayersRepository = sessionPlayersRepository;
		}

		//todo pass a list of players on session creation
		[HttpPut]
		public void Create(Session session)
		{
			_sessionRepository.Add(session);
		}

		//sessions/players
		[HttpPut("players")]
		public void AddPlayers([FromBody] SessionPlayer[] sessionPlayers)
		{
			_sessionPlayersRepository.Add(sessionPlayers.ToList());
		}

		//sessions/players
		[HttpDelete("players")]
		public void DeletePlayers([FromBody] SessionPlayer[] sessionPlayers)
		{
			_sessionPlayersRepository.Delete(sessionPlayers.ToList());
		}

		[HttpGet]
		public async IAsyncEnumerable<Session> GetAll()
		{
			await foreach (var session in _sessionRepository.GetAll())
				yield return session;
		}

		[HttpGet("{code}")]
		public Task<Session> GetByCode([FromRoute] string code)
		{
			return _sessionRepository.Get(code);
		}
	}
}