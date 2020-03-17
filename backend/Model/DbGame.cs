using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace IP5.Repositories
{
  public class DbGame
  {
        public Guid Id { get; set; }

        [Column("player_one_id")]
        public Guid PlayerOneId { get; set; }

        [Column("player_two_id")]
        public Guid PlayerTwoId { get; set; }

        [Column("score_one")]
        public int ScoreOne { get; set; }

        [Column("score_two")]
        public int ScoreTwo { get; set; }

        [Column("is_active")]
        public bool IsActive { get; set; }
    }
}
