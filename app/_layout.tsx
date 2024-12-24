import '@/global.css';
import { ThemeProvider } from '@react-navigation/native';
import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';

import { ThemeToggle } from '@/components/ThemeToggle';

import { useInitializeApp } from '@/hooks/useInitializeApp';
import { NAV_THEME } from '@/lib/constants';
import { useColorScheme } from '@/lib/useColorScheme';

const LIGHT_THEME: Theme = {
	...DefaultTheme,
	colors: NAV_THEME.light
};
const DARK_THEME: Theme = {
	...DarkTheme,
	colors: NAV_THEME.dark
};

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const { isDarkColorScheme } = useColorScheme();
	const { isInitialized } = useInitializeApp();

	if (!isInitialized) {
		return null;
	}

	return (
		<ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
			<StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						title: 'Starter Base',
						headerRight: () => <ThemeToggle />
					}}
				/>
			</Stack>
			<PortalHost />
		</ThemeProvider>
	);
}
