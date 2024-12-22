import * as React from "react";

import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface Props extends React.PropsWithChildren {}

export default function Content({ children }: Props) {
  return (
    <ScrollArea className="flex-1">
      {children}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
