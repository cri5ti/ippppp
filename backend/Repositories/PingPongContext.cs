using Microsoft.EntityFrameworkCore;

namespace IP5.Repositories
{
  public class PingPongContext : DbContext
  {
    public DbSet<DbPlayer> Players { get; set; }


    public PingPongContext(DbContextOptions<PingPongContext> options) : base(options)
    { }
  }


}
