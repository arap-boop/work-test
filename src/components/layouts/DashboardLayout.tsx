import * as React from "react";

interface Props extends React.PropsWithChildren {}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex h-screen bg-gradient-to-bl from-[#1F4247] to-[#0D1D23]">
      <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-hidden">
        {children}
      </div>
    </div>
  );
}
