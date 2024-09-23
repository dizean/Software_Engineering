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
  { name: 'img', maxCount: 1 }
]), (req, res) => {
  const  {
    title, description,date,link
  } = req.body;

  const img = req.files['img'] ? req.files['img'][0].path : null;
 
  const sql = `
    INSERT INTO tbl_natnews (
        title, description,date,link,img
    ) 
    VALUES (
       ?, ?,
       ?, ?, ?)
  `;

  const values = [
    title, description,date,link,img
  ];

  db.query(sql, values, (err, results) => {
    if (err) throw err;
    res.json({
      id: results.insertId, ...req.body,
      img
    });
  });
});

// View
router.get('/', (req, res) => {
  db.query('SELECT * FROM tbl_natnews', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//seatch
router.post('/search', (req, res) => {
  const searchTerm = req.body.searchTerm;
  const sql = `
    SELECT * FROM tbl_natnews
    WHERE title LIKE ?`; 

  const params = [`%${searchTerm}%`];

  db.query(sql, params, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//delete                                   
router.delete('/:id', (req, res) => {
  const natid = req.params.id;
  db.query('DELETE FROM tbl_natnews WHERE id = ?', [natid], (err, results) => {
    if (err) throw err;
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ id: natid, message: 'User deleted successfully' });
    }
  });
});


//update
router.put('/:id',upload.fields([
  { name: 'img', maxCount: 1 }
]), (req, res) => {
  const natid = req.params.id;
  const  {
    title, description,date,link
  } = req.body;

  const img = req.files['img'] ? req.files['img'][0].path : null;
 
  const sql = `
        UPDATE tbl_natnews
        SET
        title = ?, img = ?, description = ?,
        date = ?, link = ?
        WHERE id = ?
      `;

  const values = [
    title,img ,description,date,link,natid
  ];

  db.query(sql, values, (err, results) => {
    if (err) throw err;
    res.json({
      id: results.natid, ...req.body,
      img
    });
  });
});

module.exports = router;
