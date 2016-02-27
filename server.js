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
	res.json(todos);
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

// it can take data, send an json object along with the request and server takes the json and stores in the todos
//id is not added as it is generated after its added to the array
app.post('/todos', function(req, res) {

	var body = _.pick(req.body, 'description', 'completed'); //pareses json
	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();
	} 
	body.description = body.description.trim();
	body.id = todoNextId++;
	todos.push(body);
	res.json(body);

});


app.listen(PORT, function() {
	console.log('Express listening on port' + PORT + '!');
});