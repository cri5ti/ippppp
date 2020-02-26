using System;
using System.Collections.Generic;

namespace IP5.Repositories
{
  public class DbPlayer
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }

    public List<DbSessionPlayer> SessionPlayers { get; set; }    

  }
}
