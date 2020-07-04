const uniqid = require('uniqid');
const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abcde12345#####',
    database: 'tasks_db'
});

db.connect(err => {
    if (err) {
        console.log('Error conecting to MYSQL');
    }
    else {
        console.log('Connected to MYSQL');
    }
});

exports.getAllTasks = (req, res) => {
    const query = 'select * from tasks_table'
    db.query(query, (error, results, fields) => {
        if (error) {
            console.log('Hubo un error procesando el siguiente query', query);
            console.log(error);
        }
        else {
            tasks_table = results.map(row => {
                return {
                    "id": row.id,
                    "item": row.item,
                    "description": row.description
                }
            });
            res.status(200).json({
                status: 'success',
                body: tasks_table
            });
        }
    });
};

exports.getTask = (req, res) => {
    const query = "select * from tasks_table where id='" + req.params.id + "'";
    db.query(query, (error, results, fields) => {
        if (error) {
            console.log('Hubo un error procesando el siguiente query', query);
            console.log(error);
        }
        else {
            res.status(200).json({
                status: 'success',
                body: {
                    "id": results[0].id,
                    "item": results[0].item,
                    "description": results[0].description
                }
            });
        }
    });
};

exports.createTask = (req, res) => {
    const newId = uniqid();
    const query = "insert into tasks_table (id,item,description) values ('" + newId + "','" + req.body.item + "','" + req.body.description + "')";
    db.query(query, (error, results, fields) => {
        if (error) {
            console.log('Hubo un error procesando el siguiente query', query);
            console.log(error);
        }
        else {
            res.status(200).json({
                status: 'success',
                body: {
                    "id": newId,
                    "item": req.body.item,
                    "description": req.body.description
                }
            });
        }
    });
};

exports.updateTask = (req, res) => {
    const query = "update tasks_table set item='" + req.body.item + "',description='" + req.body.description + "' where id='" + req.params.id + "'";
    db.query(query, (error, results, fields) => {
        if (error) {
            console.log('Hubo un error procesando el siguiente query', query);
            console.log(error);
        }
        else {
            res.status(200).json({
                status: 'success',
                body: {
                    "id": req.params.id,
                    "item": req.body.item,
                    "description": req.body.description
                }
            });
        }
    });
};

exports.deleteTask = (req, res) => {
    const query = "delete from tasks_table where id='" + req.params.id + "'";
    db.query(query, (error, results, fields) => {
        if (error) {
            console.log('Hubo un error procesando el siguiente query', query);
            console.log(error);
        }
        else {
            res.status(200).json({
                status: 'success',
                body: {
                    "id": req.params.id,
                    "item": req.body.item,
                    "description": req.body.description
                }
            });
        }
    });
};