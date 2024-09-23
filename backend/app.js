const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); 

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const userRouter = require('./routes/users');
app.use('/users', userRouter);

const hotlineRouter = require('./routes/hotline');
app.use('/hotline', hotlineRouter);

const prepareRouter = require('./routes/prepare');
app.use('/prepare', prepareRouter);

const localnewsRouter = require('./routes/local');
app.use('/local', localnewsRouter);

const natnewsRouter = require('./routes/national');
app.use('/national', natnewsRouter);

const intnewsRouter = require('./routes/international');
app.use('/international', intnewsRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
