import { SetupWorker } from 'msw';
import { useContext } from 'react';

import Context from './Context';

export default function useWorker() {
  return useContext<SetupWorker | null>(Context);
}
