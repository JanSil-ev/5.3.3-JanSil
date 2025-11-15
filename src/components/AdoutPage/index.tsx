import { Center, Chip, Paper, Stack, Tabs, Text } from '@mantine/core';
import styles from './styles.module.css';

export default function AboutPage() {
  return (
    <Center py="xl">
      <Paper shadow="md" radius="lg" p="xl" withBorder className={styles.wrapper}>
        <Stack gap="md">
          <Text className={styles.name}>Жан Силантьев</Text>
          <Text className={styles.description}>
           Я - Frontend-разработчик. Пишу приложения на React + TypeScript + Redux Toolkit.
          Учусь в школе программирования "Kata-academy".
          </Text>
          <Chip size="lg">Посмотрел</Chip>
        </Stack>
      </Paper>
    </Center>
  );
}

