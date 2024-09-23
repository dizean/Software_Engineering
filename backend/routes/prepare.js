  const express = require('express');
  const router = express.Router();
  const mysql = require('mysql');
  const bodyParser = require('body-parser');
  const multer = require('multer');
  const path = require('path');

  // Create MySQL connection
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_software',
  });

  // Connect to MySQL
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL as id ' + db.threadId);
  });

  router.use(bodyParser.json());

  const storage = multer.diskStorage({
    destination: path.join( 'uploads'),
    filename: function (req, file, cb) {
      cb(null, file.originalname); 
    },
  });
  
  
  const upload = multer({ storage: storage });

  router.post('/', upload.fields([
    { name: 'imgprep', maxCount: 1 },
    { name: 'prep1img', maxCount: 1 },
    { name: 'prep2img', maxCount: 1 },
    { name: 'prep3img', maxCount: 1 },
    { name: 'prep4img', maxCount: 1 },
    { name: 'prep5img', maxCount: 1 },
    { name: 'dur1img', maxCount: 1 },
    { name: 'dur2img', maxCount: 1 },
    { name: 'dur3img', maxCount: 1 },
    { name: 'dur4img', maxCount: 1 },
    { name: 'dur5img', maxCount: 1 },
    { name: 'aft1img', maxCount: 1 },
    { name: 'aft2img', maxCount: 1 },
    { name: 'aft3img', maxCount: 1 },
    { name: 'aft4img', maxCount: 1 },
    { name: 'aft5img', maxCount: 1 },
  ]), (req, res) => {
    const  {
      name, description,
      prep1, prep1d, 
      prep2, prep2d, 
      prep3, prep3d,
      prep4, prep4d, 
      prep5, prep5d, 
      dur1, dur1d, 
      dur2, dur2d, 
      dur3, dur3d, 
      dur4, dur4d, 
      dur5, dur5d, 
      aft1, aft1d, 
      aft2, aft2d, 
      aft3, aft3d, 
      aft4, aft4d, 
      aft5, aft5d
    } = req.body;

    const imgprep = req.files['imgprep'] ? req.files['imgprep'][0].path : null;
    const prep1img = req.files['prep1img'] ? req.files['prep1img'][0].path : null;
    const prep2img = req.files['prep2img'] ? req.files['prep2img'][0].path : null;
    const prep3img = req.files['prep3img'] ? req.files['prep3img'][0].path : null;
    const prep4img = req.files['prep4img'] ? req.files['prep4img'][0].path : null;
    const prep5img = req.files['prep5img'] ? req.files['prep5img'][0].path : null;
    const dur1img = req.files['dur1img'] ? req.files['dur1img'][0].path : null;
    const dur2img = req.files['dur2img'] ? req.files['dur2img'][0].path : null;
    const dur3img = req.files['dur3img'] ? req.files['dur3img'][0].path : null;
    const dur4img = req.files['dur4img'] ? req.files['dur4img'][0].path : null;
    const dur5img = req.files['dur5img'] ? req.files['dur5img'][0].path : null;
    const aft1img = req.files['aft1img'] ? req.files['aft1img'][0].path : null;
    const aft2img = req.files['aft2img'] ? req.files['aft2img'][0].path : null;
    const aft3img = req.files['aft3img'] ? req.files['aft3img'][0].path : null;
    const aft4img = req.files['aft4img'] ? req.files['aft4img'][0].path : null;
    const aft5img = req.files['aft5img'] ? req.files['aft5img'][0].path : null;



    const sql = `
      INSERT INTO tbl_prepare (
        name, imgprep, description,
        prep1, prep1d, prep1img,
        prep2, prep2d, prep2img,
        prep3, prep3d, prep3img,
        prep4, prep4d, prep4img,
        prep5, prep5d, prep5img,
        dur1, dur1d, dur1img,
        dur2, dur2d, dur2img,
        dur3, dur3d, dur3img,
        dur4, dur4d, dur4img,
        dur5, dur5d, dur5img,
        aft1, aft1d, aft1img,
        aft2, aft2d, aft2img,
        aft3, aft3d, aft3img,
        aft4, aft4d, aft4img,
        aft5, aft5d, aft5img
      ) 
      VALUES (
         ?, ?, ?,
         ?, ?, ?, 
         ?, ?, ?, 
         ?, ?, ?, 
         ?, ?, ?, 
         ?, ?, ?, 
         ?, ?, ?, 
         ?, ?, ?, 
         ?, ?, ?, 
         ?, ?, ?, 
         ?, ?, ?, 
         ?, ?, ?, 
         ?, ?, ?, 
         ?, ?, ?, 
         ?, ?, ?,
         ?, ?, ?)
    `;
  
    const values = [
      name, imgprep, description,
      prep1, prep1d, prep1img,
      prep2, prep2d, prep2img,
      prep3, prep3d, prep3img,
      prep4, prep4d, prep4img,
      prep5, prep5d, prep5img,
      dur1, dur1d, dur1img,
      dur2, dur2d, dur2img,
      dur3, dur3d, dur3img,
      dur4, dur4d, dur4img,
      dur5, dur5d, dur5img,
      aft1, aft1d, aft1img,
      aft2, aft2d, aft2img,
      aft3, aft3d, aft3img,
      aft4, aft4d, aft4img,
      aft5, aft5d, aft5img
    ];
  
    db.query(sql, values, (err, results) => {
      if (err) throw err;
      res.json({
        id: results.insertId, ...req.body,
        imgprep,prep1img, prep2img, prep3img, prep4img, prep5img,
        dur1img, dur2img, dur3img, dur4img, dur5img,
        aft1img, aft2img, aft3img, aft4img, aft5img
      });
    });
  });

  //seatch
  router.post('/search', (req, res) => {
    const searchTerm = req.body.searchTerm;
    const sql = `
      SELECT * FROM tbl_prepare
      WHERE name LIKE ?`; 
  
    const params = [`%${searchTerm}%`];
  
    db.query(sql, params, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  //delete                                   
  router.delete('/:id', (req, res) => {
    const disasterid = req.params.id;
    db.query('DELETE FROM tbl_prepare WHERE id = ?', [disasterid], (err, results) => {
      if (err) throw err;
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json({ id: disasterid, message: 'Disaster deleted successfully' });
      }
    });
  });

  //update
  router.put('/:id', upload.fields([
    { name: 'imgprep', maxCount: 1 },
    { name: 'prep1img', maxCount: 1 },
    { name: 'prep2img', maxCount: 1 },
    { name: 'prep3img', maxCount: 1 },
    { name: 'prep4img', maxCount: 1 },
    { name: 'prep5img', maxCount: 1 },
    { name: 'dur1img', maxCount: 1 },
    { name: 'dur2img', maxCount: 1 },
    { name: 'dur3img', maxCount: 1 },
    { name: 'dur4img', maxCount: 1 },
    { name: 'dur5img', maxCount: 1 },
    { name: 'aft1img', maxCount: 1 },
    { name: 'aft2img', maxCount: 1 },
    { name: 'aft3img', maxCount: 1 },
    { name: 'aft4img', maxCount: 1 },
    { name: 'aft5img', maxCount: 1 },
  ]), (req, res) => {
    const disasterid = req.params.id;
    const {
        name, description,
        prep1, prep1d,
        prep2, prep2d,
        prep3, prep3d,
        prep4, prep4d,
        prep5, prep5d,
        dur1, dur1d,
        dur2, dur2d,
        dur3, dur3d,
        dur4, dur4d,
        dur5, dur5d,
        aft1, aft1d,
        aft2, aft2d,
        aft3, aft3d,
        aft4, aft4d,
        aft5, aft5d
    } = req.body;

    const imgprep = req.files['imgprep'] ? req.files['imgprep'][0].path : null;
    const prep1img = req.files['prep1img'] ? req.files['prep1img'][0].path : null;
    const prep2img = req.files['prep2img'] ? req.files['prep2img'][0].path : null;
    const prep3img = req.files['prep3img'] ? req.files['prep3img'][0].path : null;
    const prep4img = req.files['prep4img'] ? req.files['prep4img'][0].path : null;
    const prep5img = req.files['prep5img'] ? req.files['prep5img'][0].path : null;
    const dur1img = req.files['dur1img'] ? req.files['dur1img'][0].path : null;
    const dur2img = req.files['dur2img'] ? req.files['dur2img'][0].path : null;
    const dur3img = req.files['dur3img'] ? req.files['dur3img'][0].path : null;
    const dur4img = req.files['dur4img'] ? req.files['dur4img'][0].path : null;
    const dur5img = req.files['dur5img'] ? req.files['dur5img'][0].path : null;
    const aft1img = req.files['aft1img'] ? req.files['aft1img'][0].path : null;
    const aft2img = req.files['aft2img'] ? req.files['aft2img'][0].path : null;
    const aft3img = req.files['aft3img'] ? req.files['aft3img'][0].path : null;
    const aft4img = req.files['aft4img'] ? req.files['aft4img'][0].path : null;
    const aft5img = req.files['aft5img'] ? req.files['aft5img'][0].path : null;

    const sql = `
        UPDATE tbl_prepare
        SET
        name = ?, imgprep = ?, description = ?,
        prep1 = ?, prep1d = ?, prep1img = ?,
        prep2 = ?, prep2d = ?, prep2img = ?,
        prep3 = ?, prep3d = ?, prep3img = ?,
        prep4 = ?, prep4d = ?, prep4img = ?,
        prep5 = ?, prep5d = ?, prep5img = ?,
        dur1 = ?, dur1d = ?, dur1img = ?,
        dur2 = ?, dur2d = ?, dur2img = ?,
        dur3 = ?, dur3d = ?, dur3img = ?,
        dur4 = ?, dur4d = ?, dur4img = ?,
        dur5 = ?, dur5d = ?, dur5img = ?,
        aft1 = ?, aft1d = ?, aft1img = ?,
        aft2 = ?, aft2d = ?, aft2img = ?,
        aft3 = ?, aft3d = ?, aft3img = ?,
        aft4 = ?, aft4d = ?, aft4img = ?,
        aft5 = ?, aft5d = ?, aft5img = ?
        WHERE id = ?
    `;

    const values = [
        name, imgprep, description,
        prep1, prep1d, prep1img,
        prep2, prep2d, prep2img,
        prep3, prep3d, prep3img,
        prep4, prep4d, prep4img,
        prep5, prep5d, prep5img,
        dur1, dur1d, dur1img,
        dur2, dur2d, dur2img,
        dur3, dur3d, dur3img,
        dur4, dur4d, dur4img,
        dur5, dur5d, dur5img,
        aft1, aft1d, aft1img,
        aft2, aft2d, aft2img,
        aft3, aft3d, aft3img,
        aft4, aft4d, aft4img,
        aft5, aft5d, aft5img,
        disasterid
    ];

    db.query(sql, values, (err, results) => {
        if (err) throw err;
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Prepare not found' });
        } else {
            res.json({ id: disasterid, message: 'Prepare updated successfully' });
        }
    });
});


  // View
  router.get('/', (req, res) => {
    db.query('SELECT * FROM tbl_prepare', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  module.exports = router;
