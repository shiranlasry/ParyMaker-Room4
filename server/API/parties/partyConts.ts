//parties controller  server side
import express from 'express';
import connection from "../../DB/database";
import fs from 'fs';
import { ResultSetHeader } from 'mysql2';

export const saveImgtoDB = async (req: express.Request, res: express.Response) => {
  try {
    const file = req.file as Express.Multer.File;

    if (!file) {
      throw new Error('No file uploaded.');
    }

    const imagePath = `public/party-img/_${Date.now()}_${file.originalname}`;
    fs.writeFileSync(imagePath, file.buffer);

    const query = `
      INSERT INTO party_maker.party_img (party_img_name)
      VALUES (?);
    `;

    connection.query(query, [file.originalname], (err, results: ResultSetHeader, fields) => {
      try {
        if (err) throw err;

        const imgId = results.insertId;
        res.send({ ok: true, img_id: imgId });
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
export const createNewParty = async (req: express.Request, res: express.Response) => {
  try {
    console.log(req.body); // Log the request body
    const {
      party_name,
      party_date,
      party_location,
      party_category_id,
      party_description,
      party_price,
      party_image_id,
      party_creator_id,
      things_to_bring,
      created_time,
    } = req.body;

    if (
      !party_name ||
      !party_date ||
      
      !party_location ||
      !party_category_id ||
      !party_description ||
      !party_price ||
      !party_image_id ||
      !party_creator_id ||
      !things_to_bring ||
      !created_time
    )
      throw new Error('Missing required fields');

    const formattedCreatedTime = new Date(created_time).toLocaleString('en-US', {
      timeZone: 'UTC',
    });

    const query = `
      INSERT INTO party_maker.parties 
      (party_name, party_date, party_location, party_category_id, party_description, party_price, party_image_id, party_creator_id, things_to_bring, created_time)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    connection.query(
      query,
      [ party_name,
        party_date,
        party_location,
        party_category_id,
        party_description,
        party_price,
        party_image_id,
        party_creator_id,
        things_to_bring,
        created_time,
      ],
      (err, results, fields) => {
        try {
          if (err) throw err;
          res.send({ ok: true, results });
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

