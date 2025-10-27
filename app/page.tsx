"use client"
import React, { useState } from "react";
import { ChatBox } from '@/components/Chatbox';
import { InsightsPanel } from '@/components/Insights';
import { DashboardMain } from '@/components/DashboardMain';
import { Navbar } from "@/components/Navbar";
const Home: React.FC = () => {
  const [dataUploaded, setDataUploaded] = useState<boolean>(true);
  
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar/>
        <div className="flex flex-col md:flex-row">
          <DashboardMain showData={dataUploaded} />
          <InsightsPanel dataUploaded={dataUploaded} setDataUploaded={setDataUploaded} />
        </div>
        <ChatBox />
      </div>
    </> 
  );
};

export default Home;
