
//usersCtrl.ts   server side    

import express from 'express';
import connection from "../../DB/database";
import { RowDataPacket } from 'mysql2';

export const getAllUsers = async (req:express.Request, res:express.Response) => {
    try {
        const query = "SELECT * FROM  party_maker.users;"
        connection.query(query, (err, results, fields) => {
            try {
                if (err) throw err;
                console.log(results)
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
                console.log(results)
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