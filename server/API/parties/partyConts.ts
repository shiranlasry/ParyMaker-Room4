//parties controller  server side

import express from 'express';
import connection from "../../DB/database";
import { RowDataPacket } from 'mysql2';

export const getAllParties = async (req: express.Request, res: express.Response) => {
  try {
    const query = `
      SELECT p.*, pc.category_description
      FROM party_maker.parties p
      JOIN party_maker.party_categories pc ON p.party_category_id = pc.category_id;
    `;

    connection.query(query, (err, results, fields) => {
      try {
        if (err) throw err;
        res.send({ ok: true, results });
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

export const getAllCategories = async (req: express.Request, res: express.Response) => {
    try {
      const query = `
        SELECT *
        FROM party_maker.party_categories;
      `;
      connection.query(query, (err, results, fields) => {
        try {
          if (err) throw err;
          res.send({ ok: true, results });
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
