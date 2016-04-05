var express = require('express');
var app = express();
var PORT = process.env.PORT || 1337;

app.get('/', function (req, res){
	res.send('To Do Root Route')
});

app.listen(PORT, function (){
	console.log('listening on port 1337')
})