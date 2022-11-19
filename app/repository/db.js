import { openDatabase, enablePromise } from 'react-native-sqlite-storage'

enablePromise(true);

/**
 * Busca conexão com BD
 */
export const getDBConnection = async () => {
  console.log('Carregando BD');
  return openDatabase({ name: 'onhome', location: 'default' })
}
