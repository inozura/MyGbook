# MyGbook API

## Table of Contents

- [MyGbook API](#mygbook-api)
  - [Table of Contents](#table-of-contents)
  - [Technology](#technology)
  - [Install](#install)
  - [Usage](#usage)
  - [API Documentation](#api-documentation)

## Technology
Required Node.js 18 above Installed on Device
(Because we will use fetch for searching data from Google API)

- Node.js 18
- MySQL
- JWT

## Install

Install all packages using NPM or YARN
```bash
npm i
```

```bash
yarn
```

## Usage

Setup ENV
Copy .env.example with this command
```bash
cp .env.example .env
```

Replace existing variables
```bash
MYSQL_PORT=3306
MYSQL_USER=user
MYSQL_PASSWORD=password
MYSQL_DB_NAME=mygbook

GOOGLE_APIKEY=apikey
```

Migration and Seed data
```bash
node ace migration:run;
node ace db:seed;
```

Run Local Server
```bash
npm run dev
```

Your ready to go 🎉

## API Documentation
Documentation for API already publish with [Postman Documenter](https://documenter.getpostman.com/view/12641389/2s9YsT6oLB).