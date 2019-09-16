const express = require('express');
const app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'keepintouch_db'
});

//connection.connect();


app.get('/', function (req, res) {

    var q = 'SELECT COUNT(*) AS count FROM users';

    connection.query(q, function (error, results, fields) {
        if (error) throw error;
        var number = results[0].count;
        console.log('The number of users who have subscribed is', number);
        //res.send('ciao')
        res.render('home', {data: number});
    });

});

app.post('/register', function(req, res){

    var person = {email: req.body.email};

    connection.query('INSERT INTO users SET ?', person, function(err, results, fields){
        if(err) throw err;
        console.log('the email address has been inserted into the DB');
        res.send('Thank you for subscribing!');
    });


});


//connection.end();

app.listen(3000, function (){
    console.log('Server is serving your app!')
    }
);