const express = require('express')
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const { PORT } = process.env;

const app = express();


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})