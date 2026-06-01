import { cookies } from "next/headers";

export type Theme = "light" | "dark";

const THEME_COOKIE_NAME = "theme";

export async function getTheme(): Promise<Theme> {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get(THEME_COOKIE_NAME);
  return (themeCookie?.value as Theme) || "light";
}

export async function setTheme(theme: Theme): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(THEME_COOKIE_NAME, theme, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  });
}
