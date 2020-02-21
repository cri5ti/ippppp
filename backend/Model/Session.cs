namespace IP5.Model
{
	public class Session
	{
		public string Code { get; set; }
		public string Description { get; set; }
		public int MinGamesRequired { get; set; }
		public bool IsActive { get; set; }
		//public List<Player> Players { get; set; }
	}
}