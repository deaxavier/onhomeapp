import { getDBConnection } from "./db";

/**
 * importar dados do usuario
 * @param {*} user 
 */
export const importUser = async (user) => {
    const db = await getDBConnection();
    const create = `CREATE TABLE IF NOT EXISTS USER (
            EMAIL TEXT NOT NULL,
            NAME TEXT NOT NULL,
            PROFILE TEXT NOT NULL
        );`;
    await db.executeSql(create);

    const drop = `DELETE FROM USER`;
    await db.executeSql(drop);

    const insert = `INSERT INTO USER (EMAIL, NAME, PROFILE) 
    VALUES ('${user.email}', '${user.name}', '${user.profile.name}');`;
    await db.executeSql(insert);
}

/**
 * Buscar dados do usuario
 * @returns user
 */
export const getUser = async () => {
    try {
        const db = await getDBConnection();
        const results = await db.executeSql('SELECT EMAIL, NAME FROM USER');
        const user = results[0].rows.item(0);
        return user;
    }
    catch (error) {
        console.error(error);
    }
}