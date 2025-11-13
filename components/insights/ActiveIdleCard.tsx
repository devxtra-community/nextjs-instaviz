import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function ActiveIdleCard() {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Active vs Idle Users
          <Users className="h-5 w-5 text-purple-600" />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between mb-2">
          <span>Active Users</span>
          <span className="font-bold text-green-600">7,420</span>
        </div>
        <div className="w-full h-2 rounded-full bg-gray-200 mb-3">
          <div className="h-full bg-green-500 rounded-full w-3/4"></div>
        </div>

        <div className="flex justify-between">
          <span>Idle Users</span>
          <span className="font-bold text-red-500">1,230</span>
        </div>
        <div className="w-full h-2 rounded-full bg-gray-200">
          <div className="h-full bg-red-500 rounded-full w-1/4"></div>
        </div>
      </CardContent>
    </Card>
  );
}
