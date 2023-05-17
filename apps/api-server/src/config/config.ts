export default () => ({
  port: process.env.API_PORT,
  mongodb: {
    connectionString: process.env.MONGODB_CONNECTION_STRING,
    dbName: process.env.MONGODB_DB_NAME,
  },
  enableDebugMessage: process.env.ENABLE_DEBUG_MSGS || false,
});
