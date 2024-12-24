import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import * as SQLite from 'expo-sqlite';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeInUp, FadeOutDown, LayoutAnimationConfig } from 'react-native-reanimated';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import migrations from '@/db/migrations/migrations';
import { usersTable } from '@/db/schema';
import { Info } from '@/lib/icons/Info';

const expo = SQLite.openDatabaseSync('db.db');
const db = drizzle(expo);

const GITHUB_AVATAR_URI =
	'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg';

export default function Screen() {
	const [progress, setProgress] = React.useState(78);
	const { success, error } = useMigrations(db, migrations);
	const [items, setItems] = useState<(typeof usersTable.$inferSelect)[] | null>(null);

	function updateProgressValue() {
		setProgress(Math.floor(Math.random() * 100));
	}

	useEffect(() => {
		if (!success) return;
		(async () => {
			await db.delete(usersTable);
			await db.insert(usersTable).values([
				{
					name: 'Hayden Ngo',
					age: 30,
					email: 'hayden@example.com'
				}
			]);
			const users = await db.select().from(usersTable);
			setItems(users);
		})();
	}, [success]);

	if (error) {
		return (
			<View>
				<Text>Migration error: {error.message}</Text>
			</View>
		);
	}

	if (!success) {
		return (
			<View>
				<Text>Migration is in progress...</Text>
			</View>
		);
	}

	if (items === null || items.length === 0) {
		return (
			<View>
				<Text>Empty</Text>
			</View>
		);
	}

	return (
		<View className="flex-1 items-center justify-center gap-5 bg-secondary/30 p-6">
			<Card className="w-full max-w-sm rounded-2xl p-6">
				<CardHeader className="items-center">
					<Avatar alt="Rick Sanchez's Avatar" className="h-24 w-24">
						<AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
						<AvatarFallback>
							<Text>RS</Text>
						</AvatarFallback>
					</Avatar>
					<View className="p-3" />
					<CardTitle className="pb-2 text-center">{items[0].name}</CardTitle>
					<View className="flex-row">
						<CardDescription className="text-base font-semibold">{items[0].email}</CardDescription>
						<Tooltip delayDuration={150}>
							<TooltipTrigger className="px-2 pb-0.5 active:opacity-50">
								<Info size={14} strokeWidth={2.5} className="h-4 w-4 text-foreground/70" />
							</TooltipTrigger>
							<TooltipContent className="px-4 py-2 shadow">
								<Text className="native:text-lg">Freelance</Text>
							</TooltipContent>
						</Tooltip>
					</View>
				</CardHeader>
				<CardContent>
					<View className="flex-row justify-around gap-3">
						<View className="items-center">
							<Text className="text-sm text-muted-foreground">Dimension</Text>
							<Text className="text-xl font-semibold">C-137</Text>
						</View>
						<View className="items-center">
							<Text className="text-sm text-muted-foreground">Age</Text>
							<Text className="text-xl font-semibold">{items[0].age}</Text>
						</View>
						<View className="items-center">
							<Text className="text-sm text-muted-foreground">Species</Text>
							<Text className="text-xl font-semibold">Human</Text>
						</View>
					</View>
				</CardContent>
				<CardFooter className="flex-col gap-3 pb-0">
					<View className="flex-row items-center overflow-hidden">
						<Text className="text-sm text-muted-foreground">Productivity:</Text>
						<LayoutAnimationConfig skipEntering>
							<Animated.View
								key={progress}
								entering={FadeInUp}
								exiting={FadeOutDown}
								className="w-11 items-center">
								<Text className="text-sm font-bold text-sky-600">{progress}%</Text>
							</Animated.View>
						</LayoutAnimationConfig>
					</View>
					<Progress value={progress} className="h-2" indicatorClassName="bg-sky-600" />
					<View />
					<Button
						variant="outline"
						className="shadow shadow-foreground/5"
						onPress={updateProgressValue}>
						<Text>Update</Text>
					</Button>
				</CardFooter>
			</Card>
		</View>
	);
}
