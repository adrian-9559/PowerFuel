import type { AppProps } from "next/app";
import store from '../redux/store';
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { fontSans, fontMono } from "@/config/fonts";
import {useRouter} from 'next/router';
import { Provider } from "react-redux";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

	return (
			<NextUIProvider navigate={router.push}>
				<Provider store={store}>
					<NextThemesProvider>
						<Component {...pageProps} />
					</NextThemesProvider>
				</Provider>
			</NextUIProvider>
	);
}

export const fonts = {
	sans: fontSans.style.fontFamily,
	mono: fontMono.style.fontFamily,
};
