using Microsoft.EntityFrameworkCore;

namespace IP5.Repositories
{
  public class PingPongContext : DbContext
  {
    public DbSet<DbPlayer> Players { get; set; }
    public DbSet<DbSession> Sessions { get; set; }

        public PingPongContext(DbContextOptions<PingPongContext> options) : base(options)
    { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DbPlayer>()
              .ToTable("player");

            modelBuilder.Entity<DbSession>()
                .ToTable("session");
        }
  }


}
