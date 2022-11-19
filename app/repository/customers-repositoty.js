import { getDBConnection } from "./db";

/**
 * Importar os dados do cliente para a base de dados
 * @param {*} customer 
 */
export const importCustomer = async (customer) => {
    const db = await getDBConnection();
    const create = `CREATE TABLE IF NOT EXISTS CUSTOMER (
        NAME TEXT NOT NULL,
        ADDRESS TEXT NOT NULL,
        CITY TEXT NOT NULL,
        STATE TEXT NOT NULL,
        ZIPCODE TEXT NOT NULL
      );`;
    await db.executeSql(create);

    const drop = `DELETE FROM CUSTOMER`;
    await db.executeSql(drop);

    const insert = `INSERT INTO CUSTOMER (NAME, ADDRESS, CITY, STATE, ZIPCODE) 
                    VALUES ('${customer.name}', '${customer.address}', '${customer.city}', '${customer.state}','${customer.zipcode}');`;
    await db.executeSql(insert);

}

/**
 * Buscar dados do cliente
 * @returns customer
 */
export const getCustomer = async () => {
    try {
        const db = await getDBConnection();
        const results = await db.executeSql('SELECT NAME, ADDRESS, CITY, STATE, ZIPCODE FROM CUSTOMER');
        const customer = results[0].rows.item(0);
        return customer;
    }
    catch (error) {
        console.error(error);
    }
}
