import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { getDB } from '@/db/client';
import migrations from '@/db/migrations/migrations';
import { setAndroidNavigationBar } from '@/lib/android-navigation-bar';
import { useColorScheme } from '@/lib/useColorScheme';

export function useInitializeApp() {
	const { colorScheme, setColorScheme } = useColorScheme();
	const [isInitialized, setIsInitialized] = useState(false);

	const db = getDB();
	const { success: hasRunMigrations, error: runningMigrationError } = useMigrations(db, migrations);

	useEffect(() => {
		(async () => {
			if (runningMigrationError) throw runningMigrationError;

			const theme = await AsyncStorage.getItem('theme');
			if (Platform.OS === 'web') {
				document.documentElement.classList.add('bg-background');
			}
			const colorTheme = theme === 'dark' ? 'dark' : 'light';
			if (colorTheme !== colorScheme) {
				setColorScheme(colorTheme);
				setAndroidNavigationBar(colorTheme);
			} else {
				setAndroidNavigationBar(colorTheme);
			}

			if (hasRunMigrations) {
				setIsInitialized(true);
				SplashScreen.hideAsync();
			}
		})();
	}, [colorScheme, hasRunMigrations, runningMigrationError, setColorScheme]);

	return { isInitialized };
}
