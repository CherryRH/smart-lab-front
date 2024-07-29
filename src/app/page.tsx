'use client';

import LabSideBar from "@src/app/components/LabSideBar";
import DashBoard from "@src/app/components/DashBoard";

export default function Home() {

  return (
    <main className="flex w-screen h-screen flex-row justify-between p-3 gap-3">
      <LabSideBar/>

      <DashBoard/>
    </main>
  );
}
