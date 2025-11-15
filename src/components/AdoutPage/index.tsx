import { Center, Paper, Stack, Text } from '@mantine/core';
import styles from './styles.module.css';

export default function AboutPage() {
  return (
    <Center py="xl">
      <Paper shadow="md" radius="lg" p="xl" withBorder className={styles.wrapper}>
        <Stack gap="md">
          <Text className={styles.name}>Иван Васильев</Text>
          <Text className={styles.description}>
            Привет! Я - Frontend-разработчик. Пишу приложения на React + TypeScript + Redux Toolkit.
          </Text>
        </Stack>
      </Paper>
    </Center>
  );
}

