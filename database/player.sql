CREATE TABLE [dbo].[player]
(
  [id] uniqueidentifier NOT NULL PRIMARY KEY DEFAULT newid(),
  [name] nvarchar(50)
)
GO
