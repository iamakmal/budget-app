import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../global.css";
import { useEffect } from "react";
import { initDatabase } from "@/utils/database/dbConfig";

export default function RootLayout() {
  const queryClient = new QueryClient();

  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>
  );
}
