"use client"
import React, { useState } from "react";
import { ChatBar } from '@/components/ChatBar';
import { DashboardMain } from '@/components/DashboardMain';
import { Navbar } from "@/components/Navbar";
const Home: React.FC = () => {
  const [dataUploaded, setDataUploaded] = useState<boolean>(true);

  return (
    <>
      <div className="min-h-screen bg-gray-50 ">
        <Navbar />
        <div className="pt-13 flex flex-col md:flex-row  h-screen">
          <DashboardMain showData={dataUploaded}/>
          <ChatBar dataUploaded={dataUploaded} setDataUploaded={setDataUploaded}/>
        </div>
      </div>
    </>
  );
};

export default Home;
