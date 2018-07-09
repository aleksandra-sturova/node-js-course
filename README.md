# node-js-course

## Run in console

```
run mongod on your machine

mongoimport --jsonArray --db mydb --collection users --file ./src/mock-data/users.json
mongoimport --jsonArray --db mydb --collection products --file ./src/mock-data/products.json
mongoimport --jsonArray --db mydb --collection cities --file ./src/mock-data/cities.json

npm start
```

use Postman and "Node Js. Task 7 - Middleware. Frameworks.postman_collection.json"

NOTE: generate token using "/auth" and add it's value to colletions variable. Then you can run collection.
