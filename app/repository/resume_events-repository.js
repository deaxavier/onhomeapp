import { getDBConnection } from "./db";

/**
 * Importar resumo das medições
 * @param {*} resume 
 */
export const importResume = async (resume) => {
    const db = await getDBConnection();

    const create = `CREATE TABLE IF NOT EXISTS RESUME_EVENTS (
      KWH REAL NOT NULL,
      COST REAL NOT NULL
  );`;
    await db.executeSql(create);

    const drop = `DELETE FROM RESUME_EVENTS`;
    await db.executeSql(drop);

    const insert = `INSERT INTO RESUME_EVENTS (KWH, COST) 
    VALUES (${resume.kwh}, ${resume.partial_cost});`;
    await db.executeSql(insert);
}

/**
 * Buscar resumo das medições
 * @returns 
 */
export const getResume = async () => {
    try {
        const db = await getDBConnection();
        const results = await db.executeSql('SELECT KWH, COST FROM RESUME_EVENTS');
        const resume = results[0].rows.item(0);
        return resume;
    }
    catch (error) {
        console.error(error);
    }
}