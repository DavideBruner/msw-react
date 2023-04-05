import React, { PropsWithChildren } from "react";

import useWorker from "./useWorker";

export default function MswWorker({ children }: PropsWithChildren<any>) {
  const worker = useWorker();
  return <>{children(worker)}</>;
}
