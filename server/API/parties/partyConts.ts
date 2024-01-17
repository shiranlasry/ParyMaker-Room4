//parties controller  server side
import express from 'express';
import connection from "../../DB/database";
import fs from 'fs';
import { OkPacket, ResultSetHeader } from 'mysql2';

export const saveImgtoDB = async (req: express.Request, res: express.Response) => {
  try {
    const file = req.file as Express.Multer.File;

    if (!file) {
      throw new Error('No file uploaded.');
    }
    const file_name = `${Date.now()}_${file.originalname}`;
    const imagePath = `public/party-img/${file_name}`;
    fs.writeFileSync(imagePath, file.buffer);

    const query = `
      INSERT INTO party_maker.party_img (party_img_name)
      VALUES (?);
    `;
    
    connection.query(query, [file_name], (err, results: ResultSetHeader, fields) => {
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
    SELECT p.*, pc.category_description, pi.party_img_name
    FROM party_maker.parties p
    JOIN party_maker.party_categories pc ON p.party_category_id = pc.category_id
    LEFT JOIN party_maker.party_img pi ON p.party_image_id = pi.party_img_id;
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
      async (err, results: any, fields) => {
        try {
          if (err) throw err;
          const partyId = results.insertId;
          const selectQuery = `
            SELECT p.*, pc.category_description
            FROM party_maker.parties p
            JOIN party_maker.party_categories pc ON p.party_category_id = pc.category_id
            WHERE p.party_id = ?;
          `;
          connection.query(selectQuery, [partyId], (selectErr, selectResults, selectFields) => {
            try {
              if (selectErr) throw selectErr;
              res.send({ ok: true, incomingParty: selectResults[0] });
              
            } catch (error) {
              console.error(error);
              res.status(500).send({ ok: false, error });
              
            }
           
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


export const getPartyById = async (req: express.Request, res: express.Response) => {
  try {
    const { party_id } = req.params;

    const query = `
    SELECT p.*, pc.category_description, pi.party_img_name
    FROM party_maker.parties p
    JOIN party_maker.party_categories pc ON p.party_category_id = pc.category_id
    LEFT JOIN party_maker.party_img pi ON p.party_image_id = pi.party_img_id
    WHERE p.party_id = ?;
  `;

    connection.query(query, [party_id], (err, results:any, fields) => {
      try {
        if (err) throw err;
        if (results.length === 0) {
          res.status(404).send({ ok: false, error: "Party not found" });
        } else {
          res.send({ ok: true, result: results[0] });
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


