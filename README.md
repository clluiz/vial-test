# take-home-assignment-B

## Getting Started
- copy the .env.example file into a .env file
- `docker compose build`
- `docker compose up`
- `npm run migrate`
- `npm run seed`
- if you view your database, you should be able to see a populated form data table
- running the following in your terminal will perform a GET request to fetch the form data
```bash
curl --location 'http://127.0.0.1:8080/form/{insert your generated form id here}' --header 'Content-Type: application/json'
```

- The app will available on the locahost:5173 address

## Introduction
The purpose of this project is to evaluate your full stack web development skills with an example project that closely resembles your day to day tasks at Vial. 

You will build a simple **Form App** where a user can build their own customized form and save data from that generated form.

**NOTE: Any images provided in the assignment are just examples, and the frontend does not need to look the same as the provided mock. Be creative with your design!**

## Tech stack
* [Node](https://nodejs.org/en/)
* [Typescript](www.google.com)
* [Fastify](https://www.fastify.io/)
* [Prisma ORM](https://www.prisma.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [Docker and Compose](https://www.docker.com/)
* [React](https://react.dev/)
* [Tailwindcss](https://tailwindcss.com/)
* [React query](https://tanstack.com/query/latest/docs/framework/react/overview)
* [React Router dom](https://reactrouter.com/)
* [Lucide React Icons](https://lucide.dev/guide/)