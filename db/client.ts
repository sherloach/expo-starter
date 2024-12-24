import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as SQLite from 'expo-sqlite';

// Singleton instance
let db: ReturnType<typeof drizzle> | null = null;

export const getDB = () => {
	if (!db) {
		// Create SQLite database connection
		const expoDb = SQLite.openDatabaseSync('db.db');

		// Initialize Drizzle with SQLite connection
		db = drizzle(expoDb);
	}
	return db;
};
