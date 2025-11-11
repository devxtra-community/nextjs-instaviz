"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function ActivityTabs() {
  return (
    <Tabs defaultValue="month" className="w-full">
      <TabsList className="bg-white shadow-sm border rounded-xl mb-4">
        <TabsTrigger value="week">Weekly</TabsTrigger>
        <TabsTrigger value="month">Monthly</TabsTrigger>
        <TabsTrigger value="year">Yearly</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
