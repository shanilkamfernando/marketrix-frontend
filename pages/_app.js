import React, { useEffect, useState } from "react";
import "@/styles/globals.scss";
import { config, dom } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { Provider } from "react-redux";
import { wrapper } from "@/store/store";
import LoadingGlobalOverlay from "@/components/LoadingGlobalOverlay/LoadingGlobalOverlay.js";
import { AuthProvider } from "@/auth/authContext";
import ProductTour from "@/components/ProductTour/ProductTour";
//import { SessionProvider } from "next-auth/react";

// Preload FontAwesome assets
config.autoAddCss = false;
dom.watch();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [iconsLoaded, setIconsLoaded] = useState(false);
  const { store } = wrapper.useWrappedStore(pageProps);

  useEffect(() => {
    // Load FontAwesome icons asynchronously
    import("@fortawesome/free-solid-svg-icons").then(() => {
      setIconsLoaded(true);
    });
  }, []);

  useEffect(() => {
    // Update the loaded state of FontAwesome icons
    dom.i2svg();
  }, [iconsLoaded]);
  return (
    <>
      <React.StrictMode>
          {/* <SessionProvider session={session}> */}
          <AuthProvider>
            <Provider store={store}>
              <LoadingGlobalOverlay />
              <ProductTour/>
              {/*  <MarketrixLive */}
              <Component {...pageProps} />
            </Provider>
          </AuthProvider>
          {/* </SessionProvider> */}

      </React.StrictMode>
      
    </>
  );
}
