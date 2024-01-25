import mysql from "mysql2";


const sqlPassword = process.env.SQLPASSWORD;

//@ts-ignore
const connection = mysql.createConnection({
  host: "sql11.freemysqlhosting.net",
  port: "3306",
  user: "sql11679758",
  password: sqlPassword,
  database: "sql11679758"
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