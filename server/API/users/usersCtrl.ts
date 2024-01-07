
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
  
            if (passwordMatch) {
              const token = jwt.sign({ user_id: user.user_id, email: user.email }, 'your-secret-key', {
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
  
      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, 10);
      //console.log('Hashed Password:', hashedPassword);
  
      const query = `
        INSERT INTO party_maker.users (email, password, username, firstName, lastName, phoneNumber, address, role)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
      `;
  
      connection.query(
        query,
        [email, hashedPassword, username, firstName, lastName, phoneNumber, address, role],
        async (err, results: any, fields) => {
          try {
            if (err) throw err;
  
            const insertedUserId = results.insertId;
  
            // Retrieve the inserted user from the database
            const selectQuery = `SELECT * FROM party_maker.users WHERE user_id = ?;`;
  
            connection.query(selectQuery, [insertedUserId], (selectErr, selectResults: RowDataPacket[], selectFields) => {
              if (selectErr) throw selectErr;
  
              const user = selectResults[0] as User;
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
  
      if (!token) {
        res.status(401).send({ ok: false, error: 'no token getUserFromToken() ' });
      } else {
        const {user_id} = jwt.verify(token, secret) as { user_id: number};
  
        const query = `SELECT * FROM party_maker.users WHERE user_id = ?;`;
  
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
