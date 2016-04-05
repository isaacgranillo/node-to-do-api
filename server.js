var express = require('express');
var app = express();
var PORT = process.env.PORT || 1337;
var todos = [{
	id: 1,
	description: 'Get groceries',
	completed: false,
}, { 
	id: 2,
	description: 'Eat lunch',
	completed: false,
}, {
	id: 3,
	description: 'Oil change',
	completed: true

}];

app.get('/', function (req, res){
	res.send('To Do Root Route')
});

app.get('/todos', function (req, res){
	res.json(todos);
});

app.get('/todos/:id', function (req, res){
	var todoID = parseInt(req.params.id, 10);
	var matchedTodo;

	todos.forEach(function (todo){
		if (todoID === todo.id){
			matchedTodo = todo;
		}
	});
	if (matchedTodo){
		res.json(matchedTodo);
	}
	else{
		res.status(404).send();
	}
});

app.listen(PORT, function (){
	console.log('listening on port 1337')
});



