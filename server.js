var expres = require('express');
var bodyParser = require('body-parser');

var app = expres();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1; //increments id by 1

//express middleware 
//json requests comes in it express pareses it and we can access it via request.body
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('TODO API ROOT');
});

app.get('/todos', function(req, res) {
	res.json(todos);
});
app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10); // req is always in string so convert it to int 
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

// it can take data, send an json object along with the request and server takes the json and stores in the todos
//id is not added as it is generated after its added to the array
app.post('/todos', function(req, res) {
	var body = req.body;
	body.id = todoNextId++;
	todos.push(body);
	res.json(body);

});


app.listen(PORT, function() {
	console.log('Express listening on port' + PORT + '!');
});