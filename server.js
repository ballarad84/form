var express=require('express');
var app=express();
var fs1=require('fs');
var bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));// parse application/x-www-form-urlencoded 
 
app.use(bodyParser.json());// parse application/json

app.use(express.static(__dirname));//встановлення каталогу для статичного контенту підключка css
app.get('/',function(req,res){ //  '/'-127.0.0.1:8080
	res.sendFile(__dirname+'/index.html');	//"test!"
});

app.get('/form',function(req,res){ 
	res.sendFile(__dirname+'/form.html');
});

app.get('/list',function(req,res){ 
	res.sendFile(__dirname+'/data.json');
});
app.get("/formget",function(req,res){
	//req.query перетворює висланий файл в обєкт виводить на сервері обєкт
	//res.send("test");
	var file=require("./data.json");//./data.jsonдля текучої папки
	file.push(req.query);
	var str=JSON.stringify(file);
	fs1.writeFileSync('data.json',str);
	res.send("data vas memorized on server");
})
/*app.get("/formdell",function(req,res){
	//console.log(req.query.id);
	var file=require("./data.json");
	file.splice(req.query.id,1);
	var str=JSON.stringify(file);
	fs1.writeFileSync('data.json',str);
	res.send(file);
})*/
app.post("/formdellpost",function(req,res){//для POST запиту
	console.log(req.body);
	var file=require("./data.json");
	file.splice(req.body.id,1);
	var str=JSON.stringify(file);
	fs1.writeFileSync('data.json',str);
	res.send(file);
})
app.post("/postsend",function(req,res){
	console.log(req.body);
	res.send(req.body.myinput);
})
/*app.get("/myget",function(req,res){
	console.log(req.query);
	res.send(req.query);
})*/
app.post("/myget",function(req,res){
	console.log(req.body);
	res.send(req.body);
})
app.listen(8080);
console.log("server is running!!!!");
