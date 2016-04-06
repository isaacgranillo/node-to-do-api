var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite.sqlite'
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 300]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
})

sequelize.sync({
	// force: true
}).then(function() {
	console.log('Synced Successfully');

	Todo.findById(4).then(function (todo){
		if(todo){
			console.log(todo.toJSON());
		}
		else{
			console.log('To do item not found')
		}
	});

	// Todo.create({
	// 	description: 'Eat',
	// 	completed: true
	// }).then(function(todo) {
	// 	console.log('Finished');
	// 	console.log(todo);
	// 	return Todo.create({
	// 		description: 'Clean House'
	// 	});
	// }).then(function () {
	// 	// return Todo.findById(1)
	// 	return Todo.findAll({
	// 		where: {
	// 			description: {
	// 				$like: '%eat%'
	// 			}
	// 		}
	// 	});
	// }).then(function (todos){
	// 	if(todos){
	// 		todos.forEach(function (todo){
	// 			console.log(todo.toJSON());	
	// 		});
	// 	}
	// 	else{
	// 		console.log('To Do not Found');
	// 	}
	// }).catch(function (e){
	// 	console.log(e);
	// })
});



