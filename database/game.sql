CREATE TABLE [dbo].[game](
	[id] [uniqueidentifier] NOT NULL,
	[player_one_id] [uniqueidentifier] NOT NULL,
	[player_two_id] [uniqueidentifier] NOT NULL,
	[score_one] [int] NULL,
	[score_two] [int] NULL,
	[is_active] [bit] NULL,
 CONSTRAINT [PK_game] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[game]  WITH CHECK ADD  CONSTRAINT [FK_game_player] FOREIGN KEY([player_one_id])
REFERENCES [dbo].[player] ([id])
GO

ALTER TABLE [dbo].[game] CHECK CONSTRAINT [FK_game_player]
GO

ALTER TABLE [dbo].[game]  WITH CHECK ADD  CONSTRAINT [FK_game_player1] FOREIGN KEY([player_two_id])
REFERENCES [dbo].[player] ([id])
GO

ALTER TABLE [dbo].[game] CHECK CONSTRAINT [FK_game_player1]
GO
