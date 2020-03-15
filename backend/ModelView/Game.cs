namespace IP5.Model
{
	public class Game
	{
		public string Code { get; set; }
		public string PlayerOneCode { get; set; }
		public string PlayerTwoCode { get; set; }
		public int ScoreOne { get; set; }
		public int ScoreTwo { get; set; }
		public bool IsActive { get; set; }
	}
}