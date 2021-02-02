const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 4001;

app.use(bodyParser.json())
app.use(express.static('public'))

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(req, res) {
	const email = req.body.email;
	const password = req.body.password;
	if (username && password) {
		pool.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.email = email;
				res.redirect('/home');
			} else {
				res.send('Incorrect Email and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Email and Password!');
		res.end();
	}
});

app.get('/home', function(req, res) {
	if (req.session.loggedin) {
		res.send('Welcome back, ' + req.session.name + '!');
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});

app.listen(port, () => {
 console.log(`Web server is listening on port ${port}!`);
});
