import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { api } from '~/utils/api';
import Head from 'next/head';
import { AppProps } from 'next/app';
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../theme';
import createEmotionCache from '../createEmotionCache';
// import "../src/style/global.css";
import '~/styles/globals.css';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
const clientSideEmotionCache = createEmotionCache();

const materialTheme = materialExtendTheme();

const MyApp: AppType<{
  session: Session | null;
}> = ({ Component, pageProps: { session, ...pageProps } }) => {
  const emotionCache = clientSideEmotionCache;
  return (
    <>
      <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        <JoyCssVarsProvider>
          <CacheProvider value={emotionCache}>
            <SessionProvider session={session}>
              <CssBaseline />
              <Component {...pageProps} />
            </SessionProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </CacheProvider>
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
