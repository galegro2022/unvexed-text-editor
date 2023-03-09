import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Export a function we will use to Put something in the database.
export const putDb = async (content) => {
// Create a connection to the database database and version we want to use.
  const jateDb = await openDB("jate", 1);
  // Create a transaction to the database.
  const tx = jateDb.transaction("jate", "readwrite");
  // Create a store to the database.
  const store = tx.objectStore("jate");
  // Add the content to the database.
  const request = store.put({id: 1, value: content});
  // Wait for the request to complete.
  const result = await request;

  console.log("updated text saved", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');
    // Check if a variable is defined and if it is, return it.
  return result?.value;
};

initdb();
