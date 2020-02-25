﻿using IP5.Model;
using System;
using System.Collections.Generic;

namespace IP5.Repositories
{
    public class DbSession
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public int MinGamesRequired { get; set; }

        public List<DbSessionPlayer> SessionPlayers { get; set; }
    }
}
