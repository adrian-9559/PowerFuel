import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { fontSans, fontMono } from "@config/fonts";
import {useRouter} from 'next/router';
import { AppProvider } from "@context/AppContext";
import "@styles/globals.css";
require('dotenv').config();
import DefaultLayout from '@layouts/default';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

toastr.options = {
	positionClass: "toast-bottom-right",
	timeOut: 2000,
	extendedTimeOut: 1000,
  }

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();


  
	return (
	  <NextUIProvider navigate={router.push}>
		  <NextThemesProvider>
			<AppProvider>
				<DefaultLayout>
			  		<Component {...pageProps} />
			  	</DefaultLayout>
			</AppProvider>
		  </NextThemesProvider>
	  </NextUIProvider>
	);
  }

export const fonts = {
	sans: fontSans.style.fontFamily,
	mono: fontMono.style.fontFamily,
};
