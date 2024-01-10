//parties controller  server side

import express from 'express';
import connection from "../../DB/database";
import { RowDataPacket } from 'mysql2';

export const getAllParties = async (req: express.Request, res: express.Response) => {
  try {
    console.log("getAllParties")
    const query = "SELECT * FROM  party_maker.parties;"
    connection.query(query, (err, results, fields) => {
      try {
        console.log("err", err)
        if (err) throw err;
        console.log("results", results) 
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