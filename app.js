var http = require('http');
var express = require('express');
var ig = require('instagram-node').instagram();
var app = express();
var request = require('request');
 
app.use(express.static(__dirname + 'public'));

app.set('port', 3000);
app.set('view engine','ejs');

ig.use({
  client_id: '25c59086986040a482d8348512648986',
  client_secret: '70ef730c15324cf59c0103a5a6cf6818'
});
 
var redirect_uri = 'http://localhost:3000' + '/handleauth';

app.get('/authorize', function(req, res){
  // set the scope of our application to be able to access likes and public content
  res.redirect(ig.get_authorization_url(redirect_uri, { scope : ['public_content','likes']}) );
});

app.get('/handleAuth', function(req, res){
  //retrieves the code that was passed along as a query to the '/handleAuth' route and uses this code to construct an access token
  ig.authorize_user(req.query.code, redirect_uri, function(err, result){
      if(err) res.send( err );
  // store this access_token in a global variable called accessToken
    exports.access_token = result.access_token;
  // After getting the access_token redirect to the '/' route 
      res.redirect('/');
  });
})
 
app.get('/', function(req, res){
  var access_token = exports.access_token;
  var userId = access_token.split('.')[0];
  console.log(userId);
  request('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + 
  access_token, function (error, response, body) {
    if(error){
      console.log('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + access_token);
      res.send(error);
    }else{
      console.log('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + access_token);
      res.send(body);
    }
  });
});

app.get('/locations/search', function(req, res){
  var access_token = exports.access_token;
  var userId = access_token.split('.')[0];
  console.log(userId);
  request('https://api.instagram.com/v1/locations/search?lat=37.72338562&lng=-121.94412298&access_token=' + 
  access_token, function (error, response, body) {
    if(error){
      console.log('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + access_token);
      res.send(error);
    }else{
      console.log('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + access_token);
      res.send(body);
    }
  });
});

//california = 212913952
//recife = 213762864
app.get('/locations/id', function(req, res){
  var access_token = exports.access_token;
  var userId = access_token.split('.')[0];
  console.log(userId);
  request('https://api.instagram.com/v1/locations/212913952?access_token=' + 
  access_token, function (error, response, body) {
    if(error){
      console.log('https://api.instagram.com/v1/locations/212913952?access_token=' + 
      access_token);
      res.send(error);
    }else{
      console.log('https://api.instagram.com/v1/locations/212913952?access_token=' + 
      access_token);
      res.send(body);
    }
  });
});

app.get('/locations/id/mediarecent', function(req, res){
  console.log(req.query.id);
  var access_token = exports.access_token;
  var userId = access_token.split('.')[0];
  console.log(userId);
  request('https://api.instagram.com/v1/locations/213762864/media/recent?access_token=' + 
  access_token, function (error, response, body) {
    if(error){
      console.log('https://api.instagram.com/v1/locations/213762864/media/recent?access_token=' + 
      access_token);
      res.send(error);
    }else{
      console.log('https://api.instagram.com/v1/locations/213762864/media/recent?access_token=' + 
      access_token);
      res.send(body);
    }
  });
});


app.get('/tags/tagname/mediarecent', function(req, res){
  console.log(req.query.id);
  var access_token = exports.access_token;
  var userId = access_token.split('.')[0];
  console.log(userId);
  var tagName = "haddad";
  request('https://api.instagram.com/v1/tags/' + tagName + '/media/recent?access_token=' + 
  access_token, function (error, response, body) {
    if(error){
      console.log('https://api.instagram.com/v1/tags/' + tagName + '/media/recent?access_token=' + 
      access_token);
      res.send(error);
    }else{
      console.log('https://api.instagram.com/v1/tags/' + tagName + '/media/recent?access_token=' + 
      access_token);
      res.send(body);
    }
  });
});

app.get('/tags/tagname', function(req, res){
  console.log(req.query.id);
  var access_token = exports.access_token;
  var userId = access_token.split('.')[0];
  console.log(userId);
  request('https://api.instagram.com/v1/tags/{tag-name}?access_token=' + 
  access_token, function (error, response, body) {
    if(error){
      console.log('https://api.instagram.com/v1/tags/{tag-name}?access_token=' + 
      access_token);
      res.send(error);
    }else{
      console.log('https://api.instagram.com/v1/tags/{tag-name}?access_token=' + 
      access_token);
      res.send(body);
    }
  });
});



 
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});