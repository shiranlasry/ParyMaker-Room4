
//usersCtrl.ts   server side    

import express from 'express';
import connection from "../../DB/database";
import { RowDataPacket } from 'mysql2';
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
        const query = `SELECT * FROM party_maker.users WHERE email = '${email}' AND password = '${password}';`;

        connection.query(query, (err, results: RowDataPacket[], fields) => {
            try {
                if (err) throw err;
                if (results.length === 0) {
                    // No user found with the provided credentials
                    res.status(401).send({ ok: false, error: "Invalid credentials" });
                } else {
                    // User found, send user data back to the client
                    const user = results[0];
                    res.send({ ok: true, user });
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
        const query = `
            INSERT INTO party_maker.users (email, password, username, firstName, lastName, phoneNumber, address, role)
            VALUES ('${email}', '${password}', '${username}', '${firstName}', '${lastName}', '${phoneNumber}', '${address}', '${role}');
        `;
        
        connection.query(query, (err, results: any, fields) => {  
            // Use 'any' type for results
            try {
                if (err) throw err;
                
                const insertedUserId = results.insertId;  
                // Get the ID of the inserted user
                
                // Retrieve the inserted user from the database
                const selectQuery = `SELECT * FROM party_maker.users WHERE user_id = ${insertedUserId};`;
                
                connection.query(selectQuery, (selectErr, selectResults: RowDataPacket[], selectFields) => {
                    if (selectErr)    throw selectErr;
                    
                    const user = selectResults[0] as User;
                    res.send({ ok: true, user });
                });
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
