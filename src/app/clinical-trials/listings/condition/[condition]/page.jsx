import Clinical from "../../../../../components/searchpage";
import React, { Suspense } from "react";

export default function ConditionPage() {
  return (
    <Suspense>
      <div>
        <Clinical />
      </div>
    </Suspense>
  );
}
