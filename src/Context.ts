import { SetupWorker } from 'msw';
import { createContext } from 'react';

export default createContext<SetupWorker | null>(null);
