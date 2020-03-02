using System;
using System.Collections.Generic;

namespace IP5.Model
{
	public class SessionPlayer
	{
		public string SessionCode { get; set; }
		public string PlayerCode { get; set; }
		public Session Session { get; set; }
		public Player Player { get; set; }
	}
}