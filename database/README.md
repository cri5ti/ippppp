

# Start SQL Server in Docker:

## Install Docker

 Docker for Windows: https://docs.docker.com/docker-for-windows/install/



### Using linux containers
You can use Windows or Linux containers with Docker. 
I chose to use Unix, so you will need to switch your Docker for Windows to unix containers: https://docs.docker.com/docker-for-windows/#switch-between-windows-and-linux-containers


## Pull the SQL Server:

 * `docker pull mcr.microsoft.com/mssql/server:2019-GA-ubuntu-16.04`
 

## Start SQL Server:

### First time:

 * `docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=F00bar1234" -p 1433:1433 --name sql1 -d mcr.microsoft.com/mssql/server:2019-GA-ubuntu-16.04`

 Note the SA password (you will need it later).


### Start:
 * `docker start sql1`


### Run the scripts
Connect to the database and run the sql scripts.
