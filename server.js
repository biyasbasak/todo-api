var expres = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = expres();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1; //increments id by 1

//express middleware 
//json requests comes in it express parses it and we can access it via req.body
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('TODO API ROOT');
});

app.get('/todos', function(req, res) {
	var queryParams = req.query;
	var filteredTodos = todos;

	if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
		filteredTodos = _.where(filteredTodos, {
			completed: true
		});
	} else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
		filteredTodos = _.where(filteredTodos, {
			completed: false
		});
	}

	res.json(filteredTodos);
});
app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10); // req is always in string so convert it to int 
	var matchedtodo = _.findWhere(todos, {
		id: todoId
	}); // it takes an array and object to search

	if (matchedtodo) {
		res.json(matchedtodo);
	} else {
		res.status(404).send();
	}
});

// it can take data, send a json object along with the request and server takes the json and stores in the todos
//id is not added as it is generated after its added to the array
app.post('/todos', function(req, res) {

	//validating,anything other than the required will give an error
	var body = _.pick(req.body, 'description', 'completed'); //pareses json

	//validating the input, so the user inputs what we want 
	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();
	}
	body.description = body.description.trim();
	body.id = todoNextId++;
	todos.push(body);
	res.json(body);

});

app.delete('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedtodo = _.findWhere(todos, {
		id: todoId
	}); // it takes an array and object to search

	if (!matchedtodo) {
		res.status(404).json({
			"error": "no todo found with that id"
		});
	} else {
		todos = _.without(todos, matchedtodo);
		res.json(matchedtodo);
	}


});

app.put('/todos/:id', function(req, res) {

	var todoId = parseInt(req.params.id, 10);
	var matchedtodo = _.findWhere(todos, {
		id: todoId
	});

	var body = _.pick(req.body, 'description', 'completed');
	var validAttributes = {};

	if (!matchedtodo) {
		return res.status(404).send();
	}
	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;

	} else if (body.hasOwnProperty('completed')) {
		return res.status.status(400).send();

	} else {
		// Never provided attribute, no problem here
	}
	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		validAttributes.description = body.description;
	} else if (body.hasOwnProperty('description')) {
		return res.status(400).send();
	}
	_.extend(matchedtodo, validAttributes);
	res.json(matchedtodo);

});



app.listen(PORT, function() {
	console.log('Express listening on port' + PORT + '!');
});