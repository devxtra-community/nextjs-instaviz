import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function MostUsedFeaturesCard() {
  const features = [
    { name: "File Upload", percentage: "45%" },
    { name: "Download Reports", percentage: "28%" },
    { name: "User Analytics", percentage: "27%" },
  ];

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Feature Usage
          <Sparkles className="h-5 w-5 text-purple-600" />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {features.map((f) => (
          <div key={f.name} className="flex justify-between text-sm">
            <span>{f.name}</span>
            <span className="font-semibold">{f.percentage}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
