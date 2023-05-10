<!-- USAGE EXAMPLES -->
## Run App With GNU Make (UNIX Based OS: MacOS, Linux)

- `make run-app-with-setup` : build docker and start all docker container with laravel setup
- `make run-app-with-setup-db` : build docker and start all docker container with laravel setup + database migration and seeder
- `make run-app` : start all docker container
- `make kill-app` : kill all docker container
- `make enter-nginx-container` : enter docker nginx container
- `make enter-php-container` : enter docker php container
- `make enter-mysql-container` : enter docker mysql container
- `make flush-db` : run php migrate fresh command


<!-- USAGE EXAMPLES -->
## Run App Manually

- Create .env file for laravel environment from .env.example on src folder
- Run command ```docker-compose build``` on your terminal
- Run command ```docker-compose up -d``` on your terminal
- Run command ```composer install``` on your terminal after went into php container on docker
- Run command ```docker exec -it php /bin/sh``` on your terminal
- Run command ```chmod -R 777 storage``` on your terminal after went into php container on docker
- If app:key still empty on .env run ```php artisan key:generate``` on your terminal after went into php container on docker
- To run artisan command like migrate, etc. go to php container using ```docker exec -it php /bin/sh```
- Go to http://localhost:8001 or any port you set to open laravel

**Note: if you got a permission error when running docker, try running it as an admin or use sudo in linux**