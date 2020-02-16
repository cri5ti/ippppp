CREATE TABLE [player]
(
    [id] uniqueidentifier NOT NULL PRIMARY KEY DEFAULT newid(),
    [name] nvarchar(50) NOT NULL,
    [email] NVARCHAR(200) NOT NULL
)
GO
