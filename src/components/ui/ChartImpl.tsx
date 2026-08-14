import React from "react";
import * as Recharts from "recharts";
import { cn } from "@/lib/utils";

export default function ChartImpl({ id, config, children, className, ...props }: any) {
  const colorConfig = Object.entries(config || {}).filter(([, c]: any) => c.theme || c.color);

  return (
    <>
      {colorConfig.length ? (
        <style
          dangerouslySetInnerHTML={{
            __html: Object.entries({ light: "", dark: ".dark" })
              .map(([theme, prefix]) =>
                `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]: any) => {
    const color = itemConfig.theme?.[theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
              )
              .join("\n"),
          }}
        />
      ) : null}

      <Recharts.ResponsiveContainer {...props} className={cn(className)}>
        {children}
      </Recharts.ResponsiveContainer>
    </>
  );
}
