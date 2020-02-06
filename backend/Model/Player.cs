namespace IP5.Model
{
	public class Player
	{
		public string Code { get; set; }
		public string Description { get; set; }
		public string? Email { get; set; }
		public int Wins { get; set; }
		public int Losses { get; set; }
		public bool IsChampion { get; set; }
	}
}