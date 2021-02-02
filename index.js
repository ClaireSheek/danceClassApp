const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4001;

app.use(bodyParser.json())
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended : true}));

app.listen(port, () => {
 console.log(`Web server is listening on port ${port}!`);
});
