const express = require('express');
const router= express.Router();
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

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

  //newuser
  router.post('/', (req, res) => {
    const { username,password,email } = req.body;
    const sql = 'INSERT INTO tbl_users ( username,password,email) VALUES (?, ?, ?)';
  
    db.query(sql, [username,password,email], (err, results) => {
      if (err) throw err;
      res.json({ id: results.insertId, username,password,email });
    });
  });
  
  
  // view
  router.get('/', (req, res) => {
    db.query('SELECT * FROM tbl_users', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  
  router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM tbl_users WHERE username = ? AND password = ?';
  
    db.query(sql, [username, password], (err, results) => {
      if (err) throw err;
  
      if (results.length > 0) {
        // User exists, login successful
        res.json({ message: 'Login successful' });
      } else {
        // User not found or invalid credentials
        res.status(401).json({ error: 'Invalid username or password' });
      }
    });
  });
  //seatch
  // router.post('/search', (req, res) => {
  //   const searchTerm = req.body.searchTerm;
  //   const sql = `
  //     SELECT * FROM tbl_borrowers
  //     WHERE room LIKE ? OR admin_assigned LIKE ? OR status LIKE ? OR name_borrower LIKE ?
  //   `;
  //   const params = Array(4).fill(`%${searchTerm}%`);
  
  //   db.query(sql, params, (err, results) => {
  //     if (err) throw err;
  //     res.json(results);
  //   });
  // });

  //delete                                   
  // router.delete('/:id', (req, res) => {
  //   const borrowerId = req.params.id;
  //   db.query('DELETE FROM tbl_borrowers WHERE id = ?', [borrowerId], (err, results) => {
  //     if (err) throw err;
  //     if (results.affectedRows === 0) {
  //       res.status(404).json({ error: 'User not found' });
  //     } else {
  //       res.json({ id: borrowerId, message: 'User deleted successfully' });
  //     }
  //   });
  // });
  
  //update
  // router.put('/:id', (req, res) => {
  //   const borrowerId = req.params.id;
  //   const { date, room, name_borrower, time_borrowed, time_returned, admin_assigned, status } = req.body;
  
  //   db.query('UPDATE tbl_borrowers SET date = ?, room = ?, name_borrower = ?, time_borrowed = ?, time_returned = ?, admin_assigned = ?, status = ? WHERE id = ?',
  //     [date, room, name_borrower, time_borrowed, time_returned, admin_assigned, status, borrowerId], (err, results) => {
  //       if (err) throw err;
  //       if (results.affectedRows === 0) {
  //         res.status(404).json({ error: 'User not found' });
  //       } else {
  //         res.json({ id: borrowerId, message: 'User updated successfully' });
  //       }
  //     });
  // });

module.exports = router;