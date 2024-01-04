const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_database_user',
  password: 'your_database_password',
  database: 'budget.db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the pool to be used in other parts of your application
module.exports = pool;
