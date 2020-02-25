using IP5.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace IP5.Repositories
{
    public class DbSession
    {
        public Guid Id { get; set; }
        public string Description { get; set; }

        [Column("is_active")]
        public bool IsActive { get; set; }

        [Column("min_games_required")]
        public int MinGamesRequired { get; set; }

        public List<DbSessionPlayer> SessionPlayers { get; set; }
    }
}
