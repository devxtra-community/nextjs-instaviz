import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Monitor, Smartphone } from "lucide-react";

export default function DeviceUsageCard() {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Device Split</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Smartphone className="h-5 w-5 text-purple-600" /> Mobile
          </div>
          <span className="font-bold">68%</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Monitor className="h-5 w-5 text-purple-600" /> Desktop
          </div>
          <span className="font-bold">32%</span>
        </div>
      </CardContent>
    </Card>
  );
}
