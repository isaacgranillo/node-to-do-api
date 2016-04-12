var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var bcrypt = require('bcrypt');

var app = express();
var PORT = process.env.PORT || 1337;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('To Do Root Route')
});

app.get('/todos', function(req, res) {
	var query = req.query;
	var where = {};

	if (query.hasOwnProperty('completed') && query.completed === 'true') {
		where.completed = true;
	} else if (query.hasOwnProperty('completed') && query.completed === 'false') {
		where.completed = false;
	}

	if (query.hasOwnProperty('d') && query.d.length > 0) {
		where.description = {
			$like: '%' + query.d + '%'
		};
	}

	db.todo.findAll({
		where: where
	}).then(function(todos) {
		res.json(todos);
	}, function(e) {
		res.status(500).send();
	});
	// var filteredTodos = todos;

	// if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
	// 	filteredTodos = _.where(filteredTodos, {
	// 		completed: true
	// 	});
	// } else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
	// 	filteredTodos = _.where(filteredTodos, {
	// 		completed: false
	// 	})
	// }

	// if (queryParams.hasOwnProperty('d') && queryParams.d.length > 0) {
	// 	filteredTodos = _.filter(filteredTodos, function(todo) {
	// 		return todo.description.toLowerCase().indexOf(queryParams.d.toLowerCase()) > -1;
	// 	})
	// }

	// res.json(filteredTodos);
});

app.get('/todos/:id', function(req, res) {
	var todoID = parseInt(req.params.id, 10);

	db.todo.findById(todoID).then(function(todo) {
		if (!!todo) {
			res.json(todo.toJSON());
		} else {
			res.status(404).send();
		}
	}, function(e) {
		res.status(500).send();
	});
	// var matchedTodo = _.findWhere(todos, {
	// 	id: todoID
	// });
	/* replaced with underscore
		// var matchedTodo;

		// todos.forEach(function (todo){
		// 	if (todoID === todo.id){
		// 		matchedTodo = todo;
		// 	}
		// });
	*/
	// if (matchedTodo) {
	// 	res.json(matchedTodo);
	// } else {
	// 	res.status(404).send();
	// }
});

app.post('/todos', function (req, res) {
	var body = _.pick(req.body, 'description', 'completed'); //does not allow for unwanted fields to be stored

	db.todo.create(body).then(function(todo) {
		res.json(todo.toJSON())
	}, function(e) {
		res.status(400).json(e);
	});
	// if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
	// 	return res.status(400).send();
	// }

	// body.description = body.description.trim();

	// body.id = todoNextId;
	// todoNextId++;
	// todos.push(body);

	// res.json(body);
});

app.delete('/todos/:id', function(req, res) {
	var todoID = parseInt(req.params.id, 10);

	db.todo.destroy({
			where: {
				id: todoID
			}
		}).then(function(delRows) {
			if (delRows === 0) {
				res.status(404).json({
					error: 'To do not found'
				});
			} else {
				res.status(204).send();
			}
		}, function(e) {
			res.status(500).send();
		})
		// var matchedTodo = _.findWhere(todos, {
		// 	id: todoID
		// });
		// if (matchedTodo) {
		// 	todos = _.without(todos, matchedTodo);
		// 	res.json(matchedTodo);
		// } else {
		// 	res.status(404).send();
		// }
});

app.put('/todos/:id', function(req, res) {
	var todoID = parseInt(req.params.id, 10);
	// var matchedTodo = _.findWhere(todos, {
	// 	id: todoID
	// });
	var body = _.pick(req.body, 'description', 'completed');
	var attrs = {};

	// if (!matchedTodo) {
	// 	return res.status(404).send();
	// }

	if (body.hasOwnProperty('completed')) {
		attrs.completed = body.completed;
	};

	// } else if (body.hasOwnProperty('completed')) {
	// 	return res.status(400).send();
	// } else {
	// 	// never gave attribute
	// };

	if (body.hasOwnProperty('description')) {
		attrs.description = body.description;
	}
	// } else if (body.hasOwnProperty('description')) {
	// 	return res.status(400).send();
	// }

	// _.extend(matchedTodo, validAttrs);
	// res.json(matchedTodo);

	db.todo.findById(todoID).then(function(todo) {
		if (todo) {
			todo.update(attrs).then(function(todo) {
				res.json(todo.toJSON());
			}, function(e) {
				res.status(400).json(e);
			});
		} else {
			res.status(404).send();
		}
	}, function() {
		res.status(500).send();
	});

});

app.post('/users', function (req, res){
	var body = _.pick(req.body, 'email', 'password');
	db.user.create(body).then(function (user){
		res.json(user.toPublicJSON())
	}, function(e){
		res.status(400).json(e);
	});
});

app.post('/users/login', function (req, res){
	var body = _.pick(req.body, 'email', 'password');

	db.user.authenticate(body).then(function (user){
		res.json(user.toPublicJSON());
	}, function(){
		res.status(401).send();
	});

});

db.sequelize.sync({force: true}).then(function() {
	app.listen(PORT, function() {
		console.log('listening on port 1337')
	});

});




