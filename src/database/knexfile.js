module.exports = { 
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        database: 'compasso',
        user: 'root',
        password: ''
    },
    migrations: {
        directory: './src/database/migrations',
        tableName: 'migrations'
    },
  };
  