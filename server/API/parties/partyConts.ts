//parties controller  server side
import express from 'express';
import connection from "../../DB/database";
import fs from 'fs';
import {  ResultSetHeader } from 'mysql2';
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

export const updatePartyImg = async (req: express.Request, res: express.Response) => {
  try {
    const file = req.file as Express.Multer.File;
    const { party_img_id } = req.params;
    if (!file) {
      throw new Error('No file uploaded. updatePartyImg()');
    }

    const file_data = file.buffer;
    const file_name = `${Date.now()}_${file.originalname}`;

    const query = `
      UPDATE party_maker.party_img
      SET party_img_name = ?, party_img_data = ?
      WHERE party_img_id = ?;
    `;

    connection.query(query, [file_name, file_data, party_img_id], (err, results: ResultSetHeader, fields) => {
      try {
        if (err) throw err;

        res.send({ ok: true });
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
console.log(`createNewParty() party_name: ${party_name}, party_date: ${party_date}, party_location: ${party_location}, party_category_id: ${party_category_id}, party_description: ${party_description}, party_price: ${party_price}, party_image_id: ${party_image_id}, party_creator_id: ${party_creator_id}, things_to_bring: ${things_to_bring}, created_time: ${created_time}`);
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
export const getPartiesByUserId = async (req: express.Request, res: express.Response) => {
  try {
    const { user_id } = req.params;
    const query = `
      SELECT p.*, pc.category_description, pi.party_img_name, pi.party_img_data
      FROM party_maker.parties p
      JOIN party_maker.party_categories pc ON p.party_category_id = pc.category_id
      LEFT JOIN party_maker.party_img pi ON p.party_image_id = pi.party_img_id
      WHERE p.party_creator_id = ?;
    `;

    connection.query(query, [user_id], (err, results: any[], fields) => {
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
}

export async function deleteParty(req, res) {
  try {
    
    const { party_id, role } = req.body;
    if (!party_id || !role) throw new Error("No PartyId or role provided for deleteParty()");
  
    if (role !== 'admin') {
      // get user id from token
      const selectByIdQuery = `
        SELECT party_creator_id FROM party_maker.parties WHERE party_id = ?;
      `;
      connection.query(selectByIdQuery, [party_id], (err, results: any[], fields) => {
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
    // delete from party_participants
    const deleteQuery = `
      DELETE FROM party_maker.party_participants WHERE party_id = ?;
    `;
    connection.query(deleteQuery, [party_id], (err, results: any[], fields) => {
      try {
        if (err) throw err;
       
        // delete from parties
        const deleteQuery = `
          DELETE FROM party_maker.parties WHERE party_id = ?;
        `;
        connection.query(deleteQuery, [party_id], (err, results: any[], fields) => {
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
    });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ ok: false, error });
  }
}

export async function updateParty(req: express.Request, res: express.Response) {
  try {
    const { party_id, party_name, party_date,  party_location,
      party_category_id,  party_description,  party_price,party_image_id,
      party_creator_id,  things_to_bring,created_time,
    } = req.body;

    if ( !party_id ||  !party_name ||   !party_date ||
      !party_location || !party_category_id || !party_description || !party_price ||!party_image_id ||
      !party_creator_id ||!things_to_bring || !created_time
    )
      throw new Error('Missing required fields');
      // check if user token is the same as party creator or admin
      const token = req.cookies.token;
    const secret = process.env.SECRET_KEY;
    if (!secret) throw new Error("no secret");
     
      if (!token) {
        res.status(401).send({ ok: false, error: 'No token updateUser()' });
        return;
      }
      const decoded = jwt.verify(token, secret) as { user_id: number };
      const user_id = decoded.user_id;
      const userSelectQuery = ` SELECT * FROM party_maker.users WHERE user_id = ?;`;
      connection.query(userSelectQuery, [user_id], (err, results: any[], fields) => {
        try {
          if (err) throw err;
          const userRole = results[0].role;
          console.log(`userRole: ${userRole}, user_id: ${user_id}, party_creator_id: ${party_creator_id}`);
          if (userRole !== 'admin' && user_id !== party_creator_id ){
            res.status(401).send({ ok: false, error: 'User can update only their own parties updateParty()' });
            return;
          }
        } catch (error) {
          console.error(error);
          res.status(500).send({ ok: false, error });
        }
      });

     
    const query = `
      UPDATE party_maker.parties
      SET party_name = ?, party_date = ?, party_location = ?, party_category_id = ?, party_description = ?, party_price = ?, party_image_id = ?, party_creator_id = ?, things_to_bring = ?, created_time = ?
      WHERE party_id = ?;
    `;

    connection.query(
      query,
      [ party_name, party_date,party_location,
        party_category_id,  party_description,  party_price,
        party_image_id,party_creator_id, things_to_bring,
        created_time, party_id,
      ],
      async (err, results: any, fields) => {
        try {
          if (err) throw err;
          const selectQuery =`
          SELECT p.*, pc.category_description, pi.party_img_name, pi.party_img_data
          FROM party_maker.parties p
          JOIN party_maker.party_categories pc ON p.party_category_id = pc.category_id
          LEFT JOIN party_maker.party_img pi ON p.party_image_id = pi.party_img_id;
        `;
          connection.query(selectQuery,  (selectErr, selectResults:any, selectFields) => {
            try {
              if (selectErr) throw selectErr;
              const partiesWithImageData = selectResults.map((party) => ({
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
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send({ ok: false, error });
  }
}

export async function addPartyParticipants(req: express.Request, res: express.Response) {
  try {
    
    const { party_id, user_id } = req.body;
    if (!party_id || !user_id) throw new Error("No party_id or user_id provided for addPartyParticipants()");
    // check if user exists in this party
    const selectQuery = `
      SELECT * FROM party_maker.party_participants WHERE party_id = ? AND user_id = ?;
    `;
    connection.query(selectQuery, [party_id, user_id], (err, results: any[], fields) => {
      try {
        if (err) throw err;
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
    const { party_id, user_id } = req.body;
    if (!party_id || !user_id) throw new Error("No party_id or user_id provided for IsPartyParticipants()");
    // check if user exists in this party
    const selectQuery = `
      SELECT * FROM party_maker.party_participants WHERE party_id = ? AND user_id = ?;
    `;
    connection.query(selectQuery, [party_id, user_id], (err, results: any[], fields) => {
      try {
        if (err) throw err;

        if (results.length > 0) {
          res.send({ ok: true, results });
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
export async function deletePartyParticipants(req: express.Request, res: express.Response) {
  try {

   
    const { party_id, user_id } = req.body;
    if (!party_id || !user_id) throw new Error("No party_id or user_id provided for deletePartyParticipants()");
    // delete if user exists in this party
    const deleteQuery = `
      DELETE FROM party_maker.party_participants WHERE party_id = ? AND user_id = ?;
    `;
    connection.query(deleteQuery, [party_id, user_id], (err, results: any[], fields) => {
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

}
export async function partiesByUserIdJoined(req: express.Request, res: express.Response) {
  try {
    const { user_id } = req.params;
    const query = `
      SELECT p.*, pc.category_description, pi.party_img_name, pi.party_img_data
      FROM party_maker.parties p
      JOIN party_maker.party_categories pc ON p.party_category_id = pc.category_id
      LEFT JOIN party_maker.party_img pi ON p.party_image_id = pi.party_img_id
      JOIN party_maker.party_participants pp ON p.party_id = pp.party_id
      WHERE pp.user_id = ?;
    `;

    connection.query(query, [user_id], (err, results: any[], fields) => {
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
}
  





