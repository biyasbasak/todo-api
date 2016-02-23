var expres = require('express');
var app = expres();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'go to college',
	completed: false
}, {
	id: 2,
	description: 'complete lab work',
	completed: false
}, {
	id: 3,
	description: 'sleep',
	completed: false
}];

app.get('/', function(req, res) {
	res.send('TODO API ROOT');
});

app.get('/todos', function(req, res) {
	res.json(todos);
});
app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);  // req is always in string so convert it to int
	var matchedtodo;

	todos.forEach(function(todos) {
		if (todos.id === todoId) {
			matchedtodo = todos;
		}
	});

	if (matchedtodo) {
		res.json(matchedtodo);
	} else {
		res.status(404).send();
	}
});


app.listen(PORT, function() {
	console.log('Express listening on port' + PORT + '!');
});