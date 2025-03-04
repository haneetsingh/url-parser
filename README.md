# URL PARSER

Extracts the details of a user supplied URL. The extracted details include:

- count and total byte size of image types grouped by extension name (jpg, png, etc)

- all the nested links, spearate into internal and extenal link categories

**Limitations** 

The current implementaion is limited to extract the static page data from the page document of the supplied URL. Any dynamic data on the page would not be extracted.


## Dependencies

- Node.js version 18
- MongoDB

## Server (Node.js)

Go to `server` directory

```sh
cd  server
```

Create env variables

```sh
cp  example.env  .env
```

Edit `.env` file to set `PORT` and `MONGODB_URL` variables.

`MONGODB_URL` is the connection string for mongo database and should follow the format:

`mongodb://username:password@host:port1/databasename`


### Setup:

**Install npm dependencies:**

```sh
npm  install
```

**To start the server:**

```sh
npm  run  dev
```

**To run the tests:**

```sh
npm  run  test
```

## Client App (React)

Go to `client` directory

```sh
cd  client
```

Create env variables

```sh
cp  example.env  .env
```

Edit `.env` file to set `REACT_APP_API_URL` to connect to the server.

If server is running on **PORT**  `3030` then `REACT_APP_API_URL` should be `http://localhost:3030`


### Setup:

**Install npm dependencies:**

```sh
npm  install
```

**To start the app:**

```sh
npm  run  start
```

Runs the app in development mode.

Open http://localhost:3000/ to view it in the browser


## Using the app
  
- Open http://localhost:3000/ in the browser. The home page is divided in two sections.

- The left section contains input field to submit a URL to extract information and view the list of all the submitted URLs.

- The right section is used view the details extracted from the submitted URL.

- The list of submitted URLs can be also be used to navigate between the different URLs and view the extracted details.