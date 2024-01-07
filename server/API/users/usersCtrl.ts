
//usersCtrl.ts   server side    

import express from 'express';
import connection from "../../DB/database";
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcryptjs'; // Import bcrypt
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
interface User{
    user_id: number | null;
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    role: string;

}
const saltRounds = 10;
export const getAllUsers = async (req:express.Request, res:express.Response) => {
    try {
        const query = "SELECT * FROM  party_maker.users;"
        connection.query(query, (err, results, fields) => {
            try {
                if (err) throw err;
                res.send({ok: true, results})
            } catch (error) {
                console.error(error)
                res.status(500).send({ok: false, error})
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ok: false, error})
    }
}

export const getUserById = async (req:express.Request, res:express.Response) => {
    try {
        const query = `SELECT * FROM  party_maker.users WHERE user_id = ${req.params.id};`
        connection.query(query, (err, results, fields) => {
            try {
                if (err) throw err;
             
                res.send({ok: true, results})
            } catch (error) {
                console.error(error)
                res.status(500).send({ok: false, error})
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ok: false, error})
    }
}

export const loginUser = async (req: express.Request, res: express.Response) => {
    try {
      const { email, password } = req.body;
      const query = `SELECT * FROM party_maker.users WHERE email = ?;`;
  
      connection.query(query, [email], async (err, results: RowDataPacket[], fields) => {
        try {
          if (err) throw err;
  
          if (results.length === 0) {
            // No user found with the provided email
            res.status(401).send({ ok: false, error: 'Invalid credentials' });
          } else {
            // User found, compare passwords
            const user = results[0] as User;
  
            // Compare the entered password with the stored hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);
            const secret=process.env.SECRET_KEY
            if (passwordMatch) {
              const cookie = {user_id: user.user_id}
              const token = jwt.sign(cookie, secret, {
                expiresIn: '1h', // Set the expiration time as needed
            });
  
              // Set the token in a cookie
              res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
              console.log("token", token)
              // Passwords match, send user data back to the client
              res.send({ ok: true, user });
            } else {
              // Passwords don't match
              res.status(401).send({ ok: false, error: 'Invalid credentials' });
            }
          }
        } catch (error) {
          console.error(error);
          res.status(500).send({ ok: false, error });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ ok: false, error });
    }
  };

  export const registerUser = async (req: express.Request, res: express.Response) => {
    try {
      const { email, password, username, firstName, lastName, phoneNumber, address, role } = req.body;
  
      const secret = process.env.SECRET_KEY
      if (!secret) throw new Error("no secret")
      console.log("secret", secret)

      const hash = await bcrypt.hash(password, saltRounds)

  
      const query = `
        INSERT INTO party_maker.users (email, password, username, firstName, lastName, phoneNumber, address, role)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
      `;
  
      connection.query(
        query,
        [email, hash, username, firstName, lastName, phoneNumber, address, role],
        async (err, resultsAdd: any, fields) => {
          try {
            if (err) throw err;
  
            const insertedUserId = resultsAdd.insertId;
            if (!insertedUserId) throw new Error('No user ID returned');
            console.log("insertedUserId", insertedUserId)
  
            // Retrieve the inserted user from the database
            const selectQuery = `SELECT * FROM party_maker.users WHERE user_id = ?;`;
  
            connection.query(selectQuery, [insertedUserId], (selectErr, selectResults: RowDataPacket[], selectFields) => {
              if (selectErr) throw selectErr;
  
              const user = selectResults[0] as User;
              const secret=process.env.SECRET_KEY
              const cookie = { user_id: user.user_id };
              const token = jwt.sign(cookie, secret, {
                  expiresIn: '1h', // Set the expiration time as needed
              });
               // Set the token in a cookie
               res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
               res.send({ ok: true, user });
            });
          } catch (error) {
            console.error(error);
            res.status(500).send({ ok: false, error });
          }
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send({ ok: false, error });
    }
  };

  export const getUserFromToken = async (req: express.Request, res: express.Response) => {
    try {
      const token = req.cookies.token;
      const secret=process.env.SECRET_KEY
       console.log("token", token)
      if (!token) {
        res.status(401).send({ ok: false, error: 'no token getUserFromToken() ' });
      } else {
        const decodedToken =jwt.decode(token, secret)
        const user_id = decodedToken.user_id;
        console.log("decodedToken", decodedToken)
        console.log("user_id", user_id)
  
        const query = `SELECT * FROM users WHERE user_id = ?;`;
  
        connection.query(query, [user_id], (err, results: RowDataPacket[], fields) => {
          try {
            if (err) throw err;
  
            const user :User = results[0] as User;
            res.send({ ok: true, user });
          } catch (error) {
            console.error(error);
            res.status(500).send({ ok: false, error });
          }
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ ok: false, error });
    }
  }
