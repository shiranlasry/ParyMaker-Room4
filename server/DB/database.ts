import mysql from "mysql2";


const sqlPassword = process.env.SQLPASSWORD;

//@ts-ignore
const connection = mysql.createConnection({
  host: "sql11678324",
  port: "3306",
  user: "sql11678324",
  password: sqlPassword,
  database: "sql11678324"
})

connection.connect((err) => {
  try {
    if (err) throw err;
    console.log("connected to party maker 🎉")
  } catch (error) {
    console.error(error)
  }
})

export default connection