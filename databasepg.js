// 접속은 됨 - 회사 PC에서... 
// 다른 PC에서 하려면 ... npm install pg --force 해야 하는데 시간이 상당히 걸림

const { Client} = require('pg');

const client = new Client({
    host : 'localhost',
    user : 'ADMIN',
    port : 5432,
    password : 'ADMIN',
    database : 'ADMIN',
});

    client.connect();

    client.query('SELECT * FROM user_mst', (err, res) => {
        if (!err){
            console.log(res.rows);
        } else {
            console.log(err.message);
        }

        client.end();
    });

