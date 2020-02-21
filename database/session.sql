CREATE TABLE [session]
(
    [id] uniqueidentifier NOT NULL PRIMARY KEY DEFAULT newid(),
    [description] NVARCHAR(200) NOT NULL,
    [is_active] bit,
    [min_games_required] int
)
GO