import { getDBConnection } from "./db";

/**
 * Importar medições
 * @param {*} events 
 */
export const importClockEvents = async (events) => {
    const db = await getDBConnection();

    const create = `CREATE TABLE IF NOT EXISTS EVENTS (
      DATE DATETIME  NOT NULL,
      KWH REAL NOT NULL,
      COST REAL NOT NULL
  );`;
    await db.executeSql(create);

    const drop = `DELETE FROM EVENTS`;
    await db.executeSql(drop);
    if (events.length > 0) {
        const insert = `INSERT INTO EVENTS (DATE, KWH, COST) VALUES` +
            events.map(item => `('${item.date}', ${item.kwh}, ${item.partial_cost})`).join(',');
        await db.executeSql(insert);
    }
}

/**
 * Buscar medições
 * @returns 
 */
export const getEvents = async () => {
    const data = [];
    const db = await getDBConnection();
    const results = await db.executeSql('SELECT DATE, COST,KWH FROM EVENTS ORDER BY DATE DESC');
    for (var i = 0; i < results[0].rows.length; i++) {
        data.push(results[0].rows.item(i));
    }
    return data;
}