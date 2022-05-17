import React from "react";

export function StateViewer({ data }: { data: any }) {
  return (
    <div className="state-viewer">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
