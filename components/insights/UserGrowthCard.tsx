import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function UserGrowthCard() {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          User Growth
          <TrendingUp className="h-5 w-5 text-purple-600" />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-3xl font-bold">+12.4%</p>
        <p className="text-sm text-gray-500">Growth in the last 30 days</p>
        <div className="w-full h-2 rounded-full bg-gray-200">
          <div className="h-full bg-purple-600 rounded-full w-2/3"></div>
        </div>
      </CardContent>
    </Card>
  );
}
