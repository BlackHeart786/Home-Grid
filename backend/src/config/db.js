import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "griddb",
});

const promisePool = pool.promise();

// Define and export the execute function
export const execute = async (query, params) => {
  const [results] = await promisePool.execute(query, params);
  return results;
};

// Export the promisePool if needed elsewhere
export default promisePool;
