const sqlite = require('sqlite3').verbose();
const uuid = require('uuid');

function useDB(dbPath){
    const db = new sqlite.Database(
        dbPath, 
        sqlite.OPEN_READWRITE,
        (err) => {if(err) return console.error(err)}
    );

    return db;
}

function addNewWorker(db, name, email, password, imagePath){
    try{
        const ID = uuid.v4();

        let insertQuery;
        let values;

        if(typeof(imagePath) === 'string'){
            insertQuery = `INSERT INTO Workers(
                ID, 
                name, 
                email, 
                password, 
                imagePath
            ) VALUES (?,?,?,?,?)`;
            values = [ID, name, email, password, imagePath];
        }else{
            insertQuery = `INSERT INTO Workers(
                ID, 
                name, 
                email, 
                password
            ) VALUES (?,?,?,?)`;
            values = [ID, name, email, password];
        }

        console.log({insertQuery, values}, typeof(imagePath));
        db.run(insertQuery, values);

        return true;
    }catch(err){
        console.error(err);
        return false;
    }
}

module.exports = {useDB, addNewWorker};