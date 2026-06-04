"use server";

import { setTheme } from "@/lib/theme";

export async function cambiarTema(formData: FormData): Promise<void> {
  const theme = formData.get("theme");

  if (theme !== "light" && theme !== "dark") {
    return;
  }

  await setTheme(theme);
}
