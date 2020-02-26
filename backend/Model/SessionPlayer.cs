using System;
using System.Collections.Generic;

namespace IP5.Model
{
	public class SessionPlayer
	{
		public Guid SessionId { get; set; }
		public Guid PlayerId { get; set; }

		public Session Session { get; set; }
		public Player Player { get; set; }
	}
}