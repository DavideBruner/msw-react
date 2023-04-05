import { setupWorker as setup } from "msw";
import React, { PropsWithChildren, useEffect, useState } from "react";

import Context from "./Context";
import { MockProviderContext, MockProviderProps } from "./types";

export default function MockProvider({
  children,
  handlers,
  startOptions,
  startOnMount = true,
  setupWorker = setup,
  enabled = process.env.NODE_ENV === "development", // Enable API mocking only in development
}: PropsWithChildren<MockProviderProps>) {
  const [worker, setWorker] = useState<MockProviderContext>(null);

  useEffect(() => {
    if (enabled) {
      const instance = setupWorker(...handlers);
      setWorker(instance);
      if (startOnMount) {
        instance.start({
          onUnhandledRequest: "warn",
          ...startOptions,
        });
      }
    }
  }, []);

  return <Context.Provider value={worker}>{children}</Context.Provider>;
}
