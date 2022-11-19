import { getDBConnection } from "./db";

/**
 * Importar pagamentos para a base local
 * @param {*} payments 
 */
export const importPayments = async (payments) => {
    const db = await getDBConnection();

    const create = `CREATE TABLE IF NOT EXISTS PAYMENT (
      REFERENCE TEXT NOT NULL,
      COST REAL NOT NULL,
      DUE_DATE DATETIME  NOT NULL,
      PAYMENT_DATE DATETIME NULL,
      STATUS TEXT NOT NULL
  );`;

    await db.executeSql(create);

    const drop = `DELETE FROM PAYMENT`;
    await db.executeSql(drop);

    if (payments.length > 0) {
        const insert = `INSERT INTO PAYMENT (REFERENCE, COST, DUE_DATE, PAYMENT_DATE, STATUS) VALUES` +
            payments.map(item => `('${item.reference}', ${item.cost}, '${item.dueDate}', ${(item.paymentAt != null ? "'" + item.paymentAt + "'" : null)}, '${item.status}')`).join(',');
        await db.executeSql(insert);
    }

}

/**
 * Buscar pagamentos
 * @returns 
 */
export const getPayments = async () => {
    const data = [];
    const db = await getDBConnection();
    const results = await db.executeSql('SELECT REFERENCE, COST, DUE_DATE, PAYMENT_DATE, STATUS FROM PAYMENT ORDER BY DUE_DATE DESC');
    for (var i = 0; i < results[0].rows.length; i++) {
        data.push(results[0].rows.item(i));
    }
    return data;
}