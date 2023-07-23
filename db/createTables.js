function createTables(dbPath){
    const createQueries = [
        `CREATE TABLE IF NOT EXISTS Workers(
            ID TEXT NOT NULL UNIQUE PRIMARY KEY, 
            name TEXT NOT NULL, 
            email TEXT UNIQUE NOT NULL, 
            password TEXT NOT NULL,
            imagePath TEXT
        )`,
    `CREATE TABLE IF NOT EXISTS Feedback(
            ID TEXT NOT NULL UNIQUE PRIMARY KEY,
            type TEXT NOT NULL,
            isRequired INTEGER NOT NULL,
            label TEXT NOT NULL,
            options TEXT,
            givenBy TEXT NOT NULL, 
            receivedBy TEXT NOT NULL,
            FOREIGN KEY (givenBy) REFERENCES Workers (ID),
            FOREIGN KEY (receivedBy) REFERENCES Workers (ID)
        )`
    ];

    const sqlite = require('sqlite3').verbose();
    const db = new sqlite.Database(
        dbPath, 
        sqlite.OPEN_READWRITE,
        (err) => {if(err) return console.error(err)}
    );

    createQueries.forEach(cQuery => {
        try{
            db.run(cQuery);
        }catch(err){
            console.error(err)
        }
    });
}

module.exports = { createTables };