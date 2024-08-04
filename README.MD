# My Application

## Getting Started

1. Set up the server:
   cd server
   `npm install`
   `npm run dev`

2. Set up the client:
   `cd ../client`
  ` npm install`
   `npm run dev`

## Requirements

- A running PostgreSQL database
- Node.js and npm installed

## Database Configuration

Ensure you have a PostgreSQL database running with the following configuration:

- Host: localhost
- Port: 5432
- Username: postgres
- Password: password
- Database name: myapp

You may need to adjust these settings in the \`server/config/database.js\` file:

```javascript
const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "myapp",
  // ... other configurations
});
```

The application uses TypeORM with the following entities:

- User
- Employee
- CarModel
- Sale

Ensure your database is set up to accommodate these models.

## Running the Application

Once everything is set up, you can run both the server and client concurrently:

In the server directory:
`npm run dev`


In a separate terminal, in the client directory:
`npm run dev`

