var express = require("express");
var createcon = require('./custom_modules/modconnection');
var tempCont = new createcon();
var path = require("path");
var fs = require("fs");
var m = require('mysql');
var bodyParser = require('body-parser');
var sessions = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();
var csrf = require('csurf');

app.use("/css", express.static(__dirname + "/webpage/stylecss"));
app.use("/js", express.static(__dirname + "/webpage/jsscript"));
app.use("/font", express.static(__dirname + "/webpage/font"));
app.use("/images", express.static(__dirname + "/webpage/images"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/webpage"));
app.use(sessions({
    secret: "bMebTAWEwIwfBijHkSAmEozIpKpDvGyXRqUwbjbL",
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.get('/', function(req, res, next) {
    session = req.session;
    session.uniqueID = "test"
    res.render('index',
        {
            'title': 'Jack Frost - Coming Soon!!',
            'csrfToken': req.csrfToken()
        }
    );
});

app.get('/dashboard', function(req, res, next){

    session = req.session;

    if (session.uniqueID){

        tempCont.query("SELECT * from uniquecontact order by date_created desc", function(error, rows, fields){

            if (error) {
                return res.sendStatus(500);
            }

            var rowdata = rows.length;

            //set default variables
            var totalRecord = rowdata,
                pageSize = 10,
                pageCount = Math.ceil(rowdata/10),
                currentPage = 1,
                encontact = rows,
                encontactArrays = [],
                encontactList = [];
            //split list into groups
            while (encontact.length) {
                encontactArrays.push(encontact.splice(0, pageSize));
            }

            //set current page if specifed as get variable (eg: /?page=2)
            if (typeof req.query.page !== 'undefined' && req.query.page == parseInt(req.query.page, 10)) {
                if (req.query.page <= encontactArrays.length) {
                    currentPage = +req.query.page;
                }
            }

            //show list of encontact from group
            encontactList = encontactArrays[+currentPage - 1];
            //render index.ejs view file

            res.render('dashboard',
                {
                    'title': 'Admin Dashboard',
                    'strcountry': countrybuf_tostring,
                    'encontact': encontactList,
                    'pageSize': pageSize,
                    'totalRecord': totalRecord,
                    'pageCount': pageCount,
                    'currentPage': currentPage,
                    'dateFormat': dateFormat,
                    'csrfToken': req.csrfToken(),
                    'csrfTokenSearch': req.csrfToken(),
                    'csrfTokenExport': req.csrfToken(),
                    'userlogin': session.userfullname,
                    'userstatus': session.userstatus
                }
            );
        });

    } else {
        res.redirect("/login");
    }
});

app.get('/detail/:id', function(req, res, next) {
    session = req.session;
    var reqparam = req.params['id'];
    var query = "SELECT * FROM uniquecontact WHERE id=";

    if (session.uniqueID){

        try {
            if (reqparam.indexOf(',') > 0){
                var ids = reqparam.split(',');
                reqparam = "0";
                for (var i=0; i<ids.length; i++){
                    query += tempCont.escape(m.raw(ids[i]));
                    query += " OR id="
                }
                query += "?";
            }else{
                query = "SELECT * FROM uniquecontact WHERE id=?"
            }
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
        console.log(query);
        tempCont.query(query, reqparam, function(error, rows, fields){

            if (error) {
                console.log(error);
                return res.sendStatus(500);
            }

            var rowdata = rows.length;

            if (rowdata == 0){
                res.render('404',
                    {
                        'title': 'Not found!',
                        'userlogin': session.userfullname
                    }
                );
            }else{
                res.render('detail',
                    {
                        'title': 'Detail Contact',
                        'encontact': rows,
                        'dateFormat': dateFormat,
                        'csrfToken': req.csrfToken(),
                        'userlogin': session.userfullname,
                        'userstatus': session.userstatus
                    }
                );
            }
        });
    }else{
        res.redirect("/login");
    }
});

app.listen("1155", function(req, res){
    console.log("Server listening on port 1155");
});