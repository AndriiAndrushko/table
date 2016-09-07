// 'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set('port', (process.env.PORT || 8080));
var server, data, addElement;
var a = {};
var fs = require('fs');
var namesJSON = './names.json';
var namesParsed = JSON.parse(fs.readFileSync(namesJSON, 'utf-8'));
var namesArr = namesParsed.manlist;
var backToObject = function (arr) {//_______________________________________retyping JSON
    var object = {manlist: arr};
    return object;
};

//__________________________________________________________Don't Use
var store = {
    home:{
        page: "About my home",
        content: " i live in"

    },
    about:{
        page: "About myself",
        content: "i love my life"

    },
    profile:{
        page: "my qse",
        content: "age my age"

    }
}
var storeKeys = Object.keys(store);
app.set('view engine', 'jade');
app.use(function(req,res,next){
    console.log('%s %s', req.method,req.url);
    next()
});
app.use(bodyParser.urlencoded({extended: true}));


//__________________________________________________________Don't Use
app.get('/edit/:id', function(req, res){
    var name = namesArr.forEach(function(item,i){
        if (item.id == req.params.id){
            a.id=item.id;
            a.lastName= item.lastName;
            a.firstName=item.firstName;
            console.log(a);
            }

            });

    res.render('edit', { a : a, namesArr : namesArr, id: req.params.id})});
app.post('/edit/:id', function(req,res){
    var edited=req.body;
    namesArr.forEach(function(item){
        if (item.id == edited.id){
            item.firstName = edited.firstName;
            item.lastName = edited.lastName;
            console.log(item);
        };
    });
        var futureJson = backToObject(namesArr);
        var convertedToJson = JSON.stringify(futureJson);
        fs.writeFileSync("names.json", convertedToJson, "utf8");
    res.render('table',{namesArr : namesArr, data : data});
    res.redirect('table');

});
app.get('/delete/:id', function(req, res){
    var name = namesArr.forEach(function(item,i){
        if (item.id == req.params.id){
            a.id=item.id;
            a.firstName=item.firstName;
            a.lastName= item.lastName;

            console.log(a);
        }

    });

    res.render('delete', { a : a, namesArr : namesArr, id: req.params.id})});
app.post('/delete/:id', function(req,res){
    var deleted=req.body;
    namesArr.forEach(function(item, i){
        if (item.id == deleted.id){
            namesArr.splice(item.id ,1);
            };
    });
    var futureJson = backToObject(namesArr);
    var convertedToJson = JSON.stringify(futureJson);
    fs.writeFileSync("names.json", convertedToJson, "utf8");
    res.render('table',{namesArr : namesArr, data : data});
    res.redirect('table');

});

app.route('/new')
    .get(function(req,res){
        res.render('new')
    })
   .post(function(req, res){
       addElement = req.body;
          if(!addElement.firstName == '' && !addElement.lastName == '') {
           namesArr.push(addElement);
           namesArr.forEach(function(item,i){
               item.id = i;
           });
           var futureJson = backToObject(namesArr);
           var convertedToJson = JSON.stringify(futureJson);
           fs.writeFileSync("names.json", convertedToJson, "utf8");
       };

      res.redirect('/table');
    });
app.get('/table', function(req, res){
    res.render('table',{namesArr : namesArr, data : data});
});


app.get('/ar', function  (req, res){
    res.render('table', {namesArr: namesArray});
});
server= app.listen(app.get('port'), function(){
    console.log('listen on port 8080 or another place');
});