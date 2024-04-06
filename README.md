# Installation
- clone the repo
- go to main folder
- create a file named ".env" or duplicate the ".env.example" file. 
- Edit it accordingly, especially setup the DB creds
- create a DB, a user for it and assign the user to DB in phpmyadmin. Be sure to use the creds you setup in ".env"
- run the following commands in termial
```
composer update
npm install
php artisan migrate:fresh
php artisan db:seed DatabaseSeeder
php artisan serve
```

- it will show you a url, go to that url in browser and you can test it.
