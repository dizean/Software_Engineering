const express = require('express');
const router= express.Router();
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

  //newuser
    router.post('/', upload.fields([
      { name: 'img', maxCount: 1 }
    ]), (req, res) => {
      const  {
        city, description, bfp1, bfp2, pnp, cdrrmo1, cdrrmo2, redcross
      } = req.body;
    
      const img = req.files['img'] ? req.files['img'][0].path : null;
     
      const sql = `
        INSERT INTO tbl_hotline (
          city, img, description, bfp1, bfp2, pnp, cdrrmo1, cdrrmo2, redcross
        ) 
        VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?,?)
      `;
    
      const values = [
        city, img, description, bfp1, bfp2, pnp, cdrrmo1, cdrrmo2, redcross
      ];
    
      db.query(sql, values, (err, results) => {
        if (err) throw err;
        res.json({
          id: results.insertId, ...req.body,
          img
        });
      });
    });
  
  // view
  router.get('/', (req, res) => {
    db.query('SELECT * FROM tbl_hotline', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  
  //seatch
  router.post('/search', (req, res) => {
    const searchTerm = req.body.searchTerm;
    const sql = `
      SELECT * FROM tbl_hotline
      WHERE city LIKE ?`; 
  
    const params = [`%${searchTerm}%`];
  
    db.query(sql, params, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  //delete                                   
  router.delete('/:id', (req, res) => {
    const cityid = req.params.id;
    db.query('DELETE FROM tbl_hotline WHERE id = ?', [cityid], (err, results) => {
      if (err) throw err;
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json({ id: cityid, message: 'User deleted successfully' });
      }
    });
  });
  

  //update
  router.put('/:id',upload.fields([
    { name: 'img', maxCount: 1 }
  ]), (req, res) => {
    const cityid = req.params.id;
    const  {
      city, description, bfp1, bfp2, pnp, cdrrmo1, cdrrmo2, redcross
    } = req.body;
  
    const img = req.files['img'] ? req.files['img'][0].path : null;

    const sql = `
          UPDATE tbl_hotline
          SET
          city = ?, img = ?, description = ?,
          bfp1 = ?, bfp2 = ?, pnp = ?,
          cdrrmo1 = ?, cdrrmo2 = ?, redcross=?
          WHERE id = ?
        `;
  
        const values = [
          city, img,description, bfp1, bfp2, pnp, cdrrmo1, cdrrmo2, redcross,cityid
        ];
  
    db.query(sql, values, (err, results) => {
      if (err) throw err;
      res.json({
        id: results.cityid, ...req.body,
        img
      });
    });
  });
  

module.exports = router;