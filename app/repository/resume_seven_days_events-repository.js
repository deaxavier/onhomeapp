import { getDBConnection } from "./db";

/**
 * Importar medições
 * @param {*} events 
 */
export const importClockEventsSevenDaysResume = async (events) => {
    const db = await getDBConnection();

    const create = `CREATE TABLE IF NOT EXISTS SEVENDAYSEVENTS (
      DATE DATETIME  NOT NULL,
      KWH REAL NOT NULL,
      COST REAL NOT NULL
  );`;
    await db.executeSql(create);

    const drop = `DELETE FROM SEVENDAYSEVENTS`;
    await db.executeSql(drop);
    if (events.length > 0) {
        const insert = `INSERT INTO SEVENDAYSEVENTS (DATE, KWH, COST) VALUES` +
            events.map(item => `('${item.day}', ${item.kwh}, ${item.cost})`).join(',');
        await db.executeSql(insert);
    }
}

/**
 * Buscar medições
 * @returns 
 */
export const getEventsSevenDaysResume = async () => {
    const data = [];
    const db = await getDBConnection();
    const results = await db.executeSql('SELECT DATE, COST, KWH FROM SEVENDAYSEVENTS ORDER BY DATE DESC');
    for (var i = 0; i < results[0].rows.length; i++) {
        data.push(results[0].rows.item(i));
    }
    return data;
}