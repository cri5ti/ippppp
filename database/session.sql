CREATE TABLE [session]
(
    [id] uniqueidentifier NOT NULL PRIMARY KEY DEFAULT newid(),
    [description] NVARCHAR(200) NOT NULL,
    [is_active] bit default 1,
    [min_games_required] int
)
GO

CREATE TABLE [dbo].[session_player](
	[session_id] [uniqueidentifier] NOT NULL,
	[player_id] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_session_player] PRIMARY KEY CLUSTERED 
(
	[session_id] ASC,
	[player_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO