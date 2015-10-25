var express = require('express');
var superagent = require('superagent');
var consolidate = require('consolidate');


var app = express();

//Configure tempate engine
app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

//Set up static folder
app.use(express.static(__dirname + '/public'));

var user = 'storify';

app.get('/', function(req, res) {
    //Fetch elements from Storify API
    superagent.get("http://api.storify.com/v1/stories/" + user)
        .set({
            Accept: 'application/json'
        })
        .end(function(e, storifyResponse) {
            if (e) next(e);
            //Render template with story object in response body     
            return res.render('index', {
                user: user,
                content: storifyResponse.body.content
            });
        })

})

app.listen(3001);
