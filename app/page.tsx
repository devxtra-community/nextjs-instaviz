"use client"
import React, { useState } from "react";
import { InsightsPanel } from '@/components/ChatBar';
import { DashboardMain } from '@/components/DashboardMain';
import { Navbar } from "@/components/Navbar";
const Home: React.FC = () => {
  const [dataUploaded, setDataUploaded] = useState<boolean>(false);

  return (
    <>
      <div className="min-h-screen bg-gray-50 ">
        <Navbar />
        <div className="pt-20 flex flex-col md:flex-row min-h-[calc(100vh)] h-full">
          <DashboardMain showData={dataUploaded} />
          <InsightsPanel dataUploaded={dataUploaded} setDataUploaded={setDataUploaded} />
        </div>
      </div>
    </>
  );
};

export default Home;
