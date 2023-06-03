var express = require("express");
var fs = require("fs");
const createError = require("http-errors");
const jsonParser = express.json();
const ajv = require("ajv");
var eajv = new ajv();
var debug = false;

var app = express();
var server = app.listen(8081, function(){

    var host = "localhost";
    server.address().address = host;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);

})

// Обработка GET/getMailList
app.get("/getMailList", function(req, res){
    let Result = "";
    console.log(req.query);
    let action = req.query.action;
    switch(action) {
        case "filter":
            console.log(req.query.filter);
            console.log("\n-_-\n");
            Result = makeFilter(req.query.filter);
            break;
        default:
            Result = getAllDate();
            break;
    }

    res.end(makeHTML(Result));
})

// обработка GET запроса

app.get("/addMail", function(req, res){
    let Result = "<hr>"+JSON.stringify(req.query)+"<hr>"+req.body
    console.log(req.query);
    console.log(req.body);

    res.end(makeHTML("<b>GET Success</b>"+Result));
})

// Обработка PUT 

app.put("/addMail", jsonParser, function(req, res){
    /*
    Образец запроса
    curl --header "Content-Type: application/json" --request PUT
    --data {\"datatime\":\"d.m.Y&nbsp;H:i:s\",\"subject\":\"string\",\"from\":\"email\",\"message\":\"string\"}
    http://localhost:8081/addMail?action=add
    Сокращенный запрос
    curl -H "Content-Type: application/json" PUT
    -d {\"datatime\":\"d.m.Y&nbsp;H:i:s\",\"subject\":\"string\",\"from\":\"email\",\"message\":\"string\"}
    http://localhost:8081/addMail?action=add
    */

    try {
        increment = addNewMailToDB(req.body);

        let Result = "id:mail_"+increment+"<hr>"+JSON.stringify(req.query)+"<hr>"+JSON.stringify(req.body);
        console.log(req.query);
        console.log(req.body);

        res.end(makeHTML("<b>PUT Success</b>" + Result));
    } catch(e){
        sendErr(e);
    }
})

// Метод добавляет новое письмо в ДБ

function addNewMailToDB(mail) {
    try {
        // Проверяем входные данные
        var valid = eajv.validate(JSON.parse(fs.readFileSync(__dirname+'/mailShema.json', utf8)), mail);
        if (!valid) {throw new createError(500, 'Error validation input data');}

        let mailList = JSON.parse(getAllDate());
        let increment = mailList.header.increment*1 + 1;
        mailList.body["mail_"+increment] = mail;
        mailList.header.increment = increment;
        saveAllDate(JSON.stringify(mailList, null, 4));

        return increment;
    } catch(e) {
        throw e;
    }
}

//Метод создает HTML с ответом
function makeHTML(data) {
    let Result = '<html><head><meta charset="utf-8"></head><body>'+data+'</body></html>';
    return Result;
}
    //Выполнение фильтрации по subject
function makeFilter(param) {
    let Result = "makeFilter";
    let filter = JSON.parse(param);
    let data = JSON.parse(getAllDate());
    data = data.body;

    //Поиск по названию
    if( filter.subject != undefined ) {
        for (key in data) {
            console.log(data[key].subject+" "+filter.subject);
            let temp = data[key].subject;
            if( temp.indexOf(filter.subject) >= 0 ) {
                Result += JSON.stringify(data[key]);
            }
        }
    }
    return Result;
}
//Метод загружает данные из БД
function getAllDate() {
    let Result;
    try {
        Result = fs.readFileSync(__dirname+'/maillist.json', "utf8");
        return Result;
    } catch (e) {
        sendErr(e, `Error BD access`);
    }
}
    //Метод сохраняет данные в БД
function saveAllDate(data) {
    fs.writeFile(__dirname+'/maillist.json', data, function(error){
        if(error) sendErr(e, `Error BD access`); // если возникла ошибка
    });
    return true;
}

//Метод канализирует обработку и отправку ошибок
function sendErr(e, msg, code) {
    if( !debug && e.stack != undefined ) e.stack = ''; //если не режим отладки - очищаем информацию о стеке
    if( msg != undefined ) e.message = msg;
    if( code != undefined ) e.code = code;
    throw createError(e.code, e);
}