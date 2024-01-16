
//usersCtrl.ts   server side    

import express from 'express';
import connection from "../../DB/database";
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcryptjs'; // Import bcrypt
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
interface User {
  user_id: number | null;
  email: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  role: string;

}
const saltRounds = 10;
export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const query = "SELECT * FROM  party_maker.users;"
    connection.query(query, (err, results, fields) => {
      try {
        if (err) throw err;
        res.send({ ok: true, results })
      } catch (error) {
        console.error(error)
        res.status(500).send({ ok: false, error })
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({ ok: false, error })
  }
}

export const getUserById = async (req: express.Request, res: express.Response) => {
  try {
    const query = `SELECT * FROM  party_maker.users WHERE user_id = ${req.params.id};`
    connection.query(query, (err, results, fields) => {
      try {
        if (err) throw err;

        res.send({ ok: true, results })
      } catch (error) {
        console.error(error)
        res.status(500).send({ ok: false, error })
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({ ok: false, error })
  }
}

export const loginUser = async (req: express.Request, res: express.Response) => {
  try {
    console.log("test")
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({ ok: false, error: 'Missing email or password loginUser()' });
      return;
    }
    const query = `SELECT * FROM party_maker.users WHERE email = ?;`;

    connection.query(query, [email], async (err, results: RowDataPacket[], fields) => {
      try {
        if (err) throw err;

        if (results.length === 0) {
          // No user found with the provided email
          res.status(401).send({ ok: false, error: 'no mach email loginUser()' });
        } else {
          // User found, compare passwords
          const user = results[0] as User;

          // Compare the entered password with the stored hashed password
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            const secret = process.env.SECRET_KEY
            const cookie = { user_id: user.user_id }
            const token = jwt.sign(cookie, secret, {
              expiresIn: '1h', // Set the expiration time as needed
            });

            // Set the token in a cookie
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
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
    const { email, password, username, first_name, last_name, phone_number, address, role } = req.body;
    if (!email || !password || !username || !first_name || !last_name || !phone_number || !address || !role) {
      res.status(400).send({ ok: false, error: 'Missing detais registerUser()' });
      return;
    }
    const secret = process.env.SECRET_KEY
    if (!secret) throw new Error("no secret")

    const hash = await bcrypt.hash(password, saltRounds)
    if (!hash) throw new Error("no hash password registerUser()")

    const query = `
        INSERT INTO party_maker.users (email, password, username, first_name, last_name, phone_number, address, role)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
      `;
    connection.query(
      query,
      [email, hash, username, first_name, last_name, phone_number, address, role],
      async (err, resultsAdd: any, fields) => {
        try {
          if (err) throw err;

          const insertedUserId = resultsAdd.insertId;
          if (!insertedUserId) throw new Error('No user ID returned registerUser()');
          

          // Retrieve the inserted user from the database
          const selectQuery = `SELECT * FROM party_maker.users WHERE user_id = ?;`;

          connection.query(selectQuery, [insertedUserId], (selectErr, selectResults: RowDataPacket[], selectFields) => {
            if (selectErr) throw selectErr;

            const user = selectResults[0] as User;
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
    if (!token) {
      //res.status(401).send({ ok: false, error: 'No token getUserFromToken()' });
      console.log("no token from getUserFromToken() ", token)
    } else {
      const secret = process.env.SECRET_KEY;
      if (!secret) throw new Error("no secret")
      const decoded = jwt.verify(token, secret) as { user_id: number };
      const { user_id } = decoded;
      console.log("user_id from getUserFromToken() ", user_id)
      const query = `SELECT * FROM party_maker.users WHERE user_id = ?;`;
      connection.query(query, [user_id], (err, results: RowDataPacket[], fields) => {
        try {
          if (err) throw err;
          const user = results[0] as User;
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

export const deleteToken = async (req: express.Request, res: express.Response) => {
  try {
    res.clearCookie('token');
    res.send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ ok: false, error });
  }
}
export const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    const {user_id, email, username, first_name, last_name, phone_number, address } = req.body;
    if (!email  || !username || !first_name || !last_name || !phone_number || !address ) {
      res.status(400).send({ ok: false, error: 'Missing detais updateUser()' });
      return;
    }
   console.log("user_id from updateUser() ", user_id)
    const query = `
        UPDATE party_maker.users SET email = ?, username = ?, first_name = ?, last_name = ?, phone_number = ?, address = ?
        WHERE user_id = ?;
      `;
    connection.query(
      query,
      [email, username, first_name, last_name, phone_number, address,user_id],
      async (err, resultsAdd: any, fields) => {
        try {
          if (err) throw err;

          const insertedUserId = resultsAdd.insertId;
          if (!insertedUserId) throw new Error('No user ID returned updateUser()');
          

          // Retrieve the inserted user from the database
          const selectQuery = `SELECT * FROM party_maker.users WHERE user_id = ?;`;

          connection.query(selectQuery, [insertedUserId], (selectErr, selectResults: RowDataPacket[], selectFields) => {
            if (selectErr) throw selectErr;

            const user = selectResults[0] as User;
            const cookie = { user_id: user.user_id };
            const secret = process.env.SECRET_KEY;
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