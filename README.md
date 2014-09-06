Cyber Scout
============

Scouting application from Team 103 for the FIRST Robotics Competition.

## Setup
* Install Node (http://nodejs.org/download/)
  * It should by default install both Node and NPM
* Install PostgreSQL (http://www.enterprisedb.com/products-services-training/pgdownload)
* From the terminal run the following commands:
  * `npm install -g nodemon`
  * `npm install -g foreman`
  * `npm install -g pg`

## Developing/Running Cyber-Scout
* Fork this repository
* Clone your fork `git clone https://github.com/[YOUR-USERNAME]/cyber-scout`
* Open the location of the clone
  * Create a file called `local.env` 
    1. `DATABASE_URL=postgres://[POSTGRES-USERNAME]:[POSTGRES-PASSWORD]@localhost/[DATABASE-NAME]`
    2. save
  * Create a file called `DEV_Procfile`
    1. `web: nodemon app.js`
    2. save
  * Open config.json
    1. Change the username and password variables to your credentials. (default username is postgres and the pass is the pass you created upon installment of PostgresSQL
* From the command line/terminal
  * `cd` into the location of your clone
    1. `npm install -g sequelize-cli` 
         * (This step may actually no longer be necessary. Skip it unless `sequelize db:migrate` doesn't work)
    2. `npm install`
  * Open pgAdmin 
  * Connect to the autogen localhost server
  * Create a new database called `cyber-scout`
  * Open the command line/terminal and `cd` into clone location
    3. `sequelize db:migrate`
  * `nf start -f DEV_Procfile -e local.env`
  * *This says, node-forman start the processes in the file DEV_Procfile and lookup environment variable in local.env*
  * This is how you'll run the project every time for now.
  * Open the web browser and enter `localhost:5000` (Change the port if 5000 isn't the port in use, but that's the default)
  

  * You should be pushing your updates to your own fork and submitting pull requests to the main repo when you're ready
