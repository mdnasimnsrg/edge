"use client";
import { Card, ProgressCircle } from "@tremor/react";

export function ProgressCircleUsageExample() {
  return (
    <Card className="w-full">
      <div className="flex justify-start space-x-5 items-center">
        <ProgressCircle value={75} size="md">
          <span className="text-xs font-medium text-slate-700">75%</span>
        </ProgressCircle>
        <div>
          <p className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
            Plan 1 (75%)
          </p>
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Spend management control
          </p>
        </div>
      </div>
    </Card>
  );
}
