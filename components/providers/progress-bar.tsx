"use client";

import { AppProgressBar } from "next-nprogress-bar";
import { Suspense } from "react";

export function ProgressBar() {
  return (
    <Suspense>
      <AppProgressBar height="3px" color="#00a494" options={{ showSpinner: false }} />
    </Suspense>
  );
}
