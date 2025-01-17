import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const promisePool = pool.promise();

export const execute = async (query, params) => {
  const [results] = await promisePool.execute(query, params);
  return results;
};

export default promisePool;
