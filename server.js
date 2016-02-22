var expres = require('express');
var app=expres();
var PORT = process.env.PORT || 3000;

app.get('/', function(req,res){
	res.send('TODO API ROOT');
});

app.listen(PORT, function(){
	console.log('Express listening on port' + PORT + '!');
})