import { RequestHandler, setupWorker, SetupWorker, StartOptions } from "msw";

export interface MockProviderProps {
  enabled?: boolean;
  handlers: RequestHandler[];
  setupWorker?: typeof setupWorker;
  startOnMount?: boolean;
  startOptions?: StartOptions;
}

export type MockProviderContext = SetupWorker | null;
