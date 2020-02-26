# ippppp
[Iplicit Ping Pong Personal Project](https://storageaccountip5b68a.z33.web.core.windows.net/)


## Dev


## Database setup

The `P5` connection string should be set in your user secrets file.

```
{
  "ConnectionStrings": {
    "P5": "Server=sqlserver; Database=####; Integrated Security=true;"
  }
}
```


## Install .NET CLI EF Tools

```
dotnet tool install --global dotnet-ef
```


## Apply migrations

* Update database to latest:

  ```
  dotnet database update
  ```


* Use `dotnet ef migrations add` to create a new migration.

  Read more:
   * https://docs.microsoft.com/en-us/ef/core/managing-schemas/migrations/


## Links
* See [spec](spec.md)
* See [project board](https://github.com/cri5ti/ippppp/projects/1)
