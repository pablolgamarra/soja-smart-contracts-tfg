import { Database } from "sqlite3";

const TABLE_NAMES = {
    'OTP_TABLE_NAME': 'otp',
}


const initializeDb = async (db:Database) => {
    try {
        console.log('Initializing Database...');

        const statements = [
            `CREATE TABLE IF NOT EXISTS ${TABLE_NAMES.OTP_TABLE_NAME}(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                contractId VARCHAR(255) NOT NULL,
                sellerAddress TEXT NOT NULL,
                contactNumber TEXT,
                email TEXT,
                otp VARCHAR(6) NOT NULL,
                expiresAt TEXT NOT NULL,
                used BOOLEAN NOT NULL DEFAULT 0
            );`
        ];

        for (const statement of statements) {
            await new Promise((resolve, reject) => {
                db.run(statement, (error) => {
                    if (error) {
                        console.log(`Error creating table. Statement -> ${statement}`);
                        reject(error);
                    } else {
                        console.log(`Table created`);
                        resolve(void 0);
                    }
                });
            });
        }

        // await insertInitialData(db);

        console.log('✅ Database initialization completed successfully');
        return true;
    } catch (error) {
        throw Error(`Error initializing Database. -> ${error}`)
    }
};

// const insertInitialData = async (db:Database) => {
//     try {
//         console.log(`Inserting initial data into database`);

//         const checkExistingChatTypes = await new Promise((resolve, reject) => {
//             db.all(`SELECT COUNT(*) as count FROM ${TABLE_NAMES.CHAT_TYPES_TABLE_NAME}`, (error, rows) => {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve((rows as unknown[])[ 0 ].count);
//                 }
//             });
//         });

//         if (checkExistingChatTypes === 0) {
//             const chatTypes = [
//                 [ 'Group', 'g.us' ],
//                 [ 'Contact', 'c.us' ],
//                 [ 'Broadcast', 'g.us' ]
//             ];

//             for (const [ name, postfix ] of chatTypes) {
//                 await new Promise((resolve, reject) => {
//                     db.run(
//                         `INSERT INTO ${TABLE_NAMES.CHAT_TYPES_TABLE_NAME} (name, postfix) VALUES (?, ?)`,
//                         [ name, postfix ],
//                         function (error) {
//                             if (error) {
//                                 console.log(`Error inserting chat type: ${name} -> ${error.message}`);
//                                 reject(error);
//                             } else {
//                                 console.log(`Inserted chat type: ${name} ${postfix}`);
//                                 resolve(void 0);
//                             }
//                         },
//                     );
//                 });
//             }
//         } else {
//             console.log(`Chat types already exists`);
//         }
//     } catch (e) {
//         console.error('Error inserting initial data:', e);
//         throw e;
//     };
// }

export { initializeDb, TABLE_NAMES };