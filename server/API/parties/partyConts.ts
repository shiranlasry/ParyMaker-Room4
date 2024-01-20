//parties controller  server side
import express from 'express';
import connection from "../../DB/database";
import fs from 'fs';
import { OkPacket, ResultSetHeader } from 'mysql2';
import jwt from 'jsonwebtoken';
import { getUserById } from '../users/usersCtrl';

export const saveImgtoDB = async (req: express.Request, res: express.Response) => {
  try {
    const file = req.file as Express.Multer.File;
    if (!file) {
      throw new Error('No file uploaded. saveImgtoDB()');
    }

    const file_data = file.buffer;

    const file_name = `${Date.now()}_${file.originalname}`;

    const query = `
    INSERT INTO party_maker.party_img (party_img_name, party_img_data)
    VALUES (?, ?);
  `;
    
  connection.query(query, [file_name, file_data], (err, results: ResultSetHeader, fields) => {
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
      SELECT p.*, pc.category_description, pi.party_img_name, pi.party_img_data
      FROM party_maker.parties p
      JOIN party_maker.party_categories pc ON p.party_category_id = pc.category_id
      LEFT JOIN party_maker.party_img pi ON p.party_image_id = pi.party_img_id;
    `;

    connection.query(query, (err, results: any[], fields) => {
      try {
        if (err) throw err;

        // Convert image data to base64
        const partiesWithImageData = results.map((party) => ({
          ...party,
          party_img_data: party.party_img_data ? party.party_img_data.toString('base64') : null,
        }));

        res.send({ ok: true, results: partiesWithImageData });
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
// Modify the getPartyById controller to convert image data to base64
export const getPartyById = async (req: express.Request, res: express.Response) => {
  try {
    const { party_id } = req.params;

    const query = `
      SELECT p.*, pc.category_description, pi.party_img_name, pi.party_img_data
      FROM party_maker.parties p
      JOIN party_maker.party_categories pc ON p.party_category_id = pc.category_id
      LEFT JOIN party_maker.party_img pi ON p.party_image_id = pi.party_img_id
      WHERE p.party_id = ?;
    `;

    connection.query(query, [party_id], (err, results: any[], fields) => {
      try {
        if (err) throw err;
        if (results.length === 0) {
          res.status(404).send({ ok: false, error: "Party not found" });
        } else {
          const partyData = results[0];
          const partyWithImage = {
            ...partyData,
            party_img_data: partyData.party_img_data.toString('base64'),
          };
          res.send({ ok: true, result: partyWithImage });
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
// export const getPartiesByUserId = async (req: express.Request, res: express.Response) => {
//   try {
//     const { user_id } = req.params;
//     const query = `
//       SELECT p.*, pc.category_description, pi.party_img_name, pi.party_img_data
//       FROM party_maker.parties p
//       JOIN party_maker.party_categories pc ON p.party_category_id = pc.category_id
//       LEFT JOIN party_maker.party_img pi ON p.party_image_id = pi.party_img_id
//       WHERE p.party_creator_id = ?;
//     `;

//     connection.query(query, [user_id], (err, results: any[], fields) => {
//       try {
//         if (err) throw err;
//         const partiesWithImageData = results.map((party) => ({
//           ...party,
//           party_img_data: party.party_img_data ? party.party_img_data.toString('base64') : null,
//         }));
//         res.send({ ok: true, results: partiesWithImageData });
//       } catch (error) {
//         console.error(error);
//         res.status(500).send({ ok: false, error });
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ ok: false, error });
//   }
// }

export async function deleteParty(req, res) {
  try {
    
    const { partyId, role } = req.body;
    if (!partyId || !role) throw new Error("No PartyId or role provided for deleteParty()");

    if (role !== 'admin') {
      // get user id from token
      const selectByIdQuery = `
        SELECT party_creator_id FROM party_maker.parties WHERE party_id = ?;
      `;
      connection.query(selectByIdQuery, [partyId], (err, results: any[], fields) => {
        try {
          if (err) throw err;
          const token = req.cookies.token;
          const secret = process.env.SECRET_KEY;

          if (!secret) throw new Error("No secret");
          if (!token) {
            res.status(401).send({ ok: false, error: 'No token updatePassword()' });
            return;
          }

          const partyCreatorId = results[0].party_creator_id;
          const decodedToken = jwt.verify(token, secret) as { user_id: number };

          if (decodedToken.user_id !== partyCreatorId) {
            res.status(401).send({ ok: false, error: 'User can delete only their own parties deleteParty()' });
            return;
          }

          // If the user is the party creator, proceed with deletion
          performDeletion();
        } catch (error) {
          console.error(error);
          res.status(500).send({ ok: false, error });
        }
      });
    } else {
      // If the user is an admin, proceed with deletion
      performDeletion();
    }

    function performDeletion() {
      const query = `DELETE FROM party_maker.parties WHERE party_id = ?;`;
      connection.query(query, [partyId], (err, results) => {
        try {
          if (err) throw err;

          const selectAllquery = `
            SELECT p.*, pc.category_description, pi.party_img_name, pi.party_img_data
            FROM party_maker.parties p
            JOIN party_maker.party_categories pc ON p.party_category_id = pc.category_id
            LEFT JOIN party_maker.party_img pi ON p.party_image_id = pi.party_img_id;
          `;
          connection.query(selectAllquery, (err, results: any[], fields) => {
            try {
              if (err) throw err;

              const partiesWithImageData = results.map((party) => ({
                ...party,
                party_img_data: party.party_img_data ? party.party_img_data.toString('base64') : null,
              }));
              
              res.send({ ok: true, results: partiesWithImageData });
            } catch (error) {
              console.error(error);
              res.status(500).send({ ok: false, error });
            }
          });
        } catch (error) {
          res.status(500).send({ ok: false, error });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, error });
  }
}

export async function updateParty(req: express.Request, res: express.Response) {
  try {
    const { party_id } = req.params;
    const { party_name} = req.body;
    console.log(`partyId: ${party_id}, party_name: ${party_name}`);

    // Construct your update query based on the fields you want to update
    const query = `
      UPDATE party_maker.parties
      SET party_name = ?
      WHERE party_id = ?;
    `;

    connection.query(query, [party_name, party_id], (err, results) => {
      try {
        if (err) throw err;
        const selectAllquery = `
          SELECT p.*, pc.category_description, pi.party_img_name, pi.party_img_data
          FROM party_maker.parties p
          JOIN party_maker.party_categories pc ON p.party_category_id = pc.category_id
          LEFT JOIN party_maker.party_img pi ON p.party_image_id = pi.party_img_id;
        `;
        connection.query(selectAllquery, (err, results: any[], fields) => {
          try {
            if (err) throw err;

            const partiesWithImageData = results.map((party) => ({
              ...party,
              party_img_data: party.party_img_data ? party.party_img_data.toString('base64') : null,
            }));
            res.send({ ok: true, results: partiesWithImageData });
          } catch (error) {
            console.error(error);
            res.status(500).send({ ok: false, error });
          }
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
}

export async function addPartyParticipants(req: express.Request, res: express.Response) {
  try {
    console.log( `addPartyParticipants() ${req.body}`);
    const { party_id, user_id } = req.body;
    if (!party_id || !user_id) throw new Error("No party_id or user_id provided for addPartyParticipants()");
    // check if user exists in this party
    const selectQuery = `
      SELECT * FROM party_maker.party_participants WHERE party_id = ? AND user_id = ?;
    `;
    connection.query(selectQuery, [party_id, user_id], (err, results: any[], fields) => {
      try {
        if (err) throw err;
        console.log(`addPartyParticipants selectQuery results.length: ${results.length}`);
        if (results.length > 0) {
          res.status(400).send({ ok: false, error: 'User already exists in this party' });
          return;
        }
        else{
          const queryINSERT = `
          INSERT INTO party_maker.party_participants (party_id, user_id)
          VALUES (?, ?);
        `;
    
        connection.query(queryINSERT, [party_id, user_id], (err, resultsINSERT, fields) => {
          try {
            if (err) throw err;
            res.send({ ok: true, resultsINSERT });
    
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
    });
  
  } catch (error) {
    console.error(error);
    res.status(500).send({ ok: false, error });
  }
}
export async function IsPartyParticipants(req: express.Request, res: express.Response) {
  try {
    console.log( `IsPartyParticipants() ${req.body}`);
    const { party_id, user_id } = req.body;
    if (!party_id || !user_id) throw new Error("No party_id or user_id provided for IsPartyParticipants()");
    // check if user exists in this party
    const selectQuery = `
      SELECT * FROM party_maker.party_participants WHERE party_id = ? AND user_id = ?;
    `;
    connection.query(selectQuery, [party_id, user_id], (err, results: any[], fields) => {
      try {
        if (err) throw err;

        console.log(`IsPartyParticipants selectQuery results: ${results}`);
        if (results.length > 0) {
          res.send({ ok: true, results });
          return;
        }
        else{
          res.send({ ok: false, results });
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
}





