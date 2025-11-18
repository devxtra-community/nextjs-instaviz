"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

import axiosAdmin from "@/lib/axiosAdmin";

export default function MostUsedFeaturesCard() {
  const [features, setFeatures] = useState<
    { feature: string; percentage: number }[]
  >([]);

  useEffect(() => {
    async function fetchFeatureStats() {
      try {
        const res = await axiosAdmin.get("/admin/featurestats");
        setFeatures(res.data.result || res.data);
      } catch (err) {
        console.log("Error fetching feature stats:", err);
      }
    }
    fetchFeatureStats();
  }, []);

  // Mapping DB feature keys to human-readable text
  const featureNames: Record<string, string> = {
    file_upload: "File Upload",
    download_report: "Download Reports",
    user_analytics: "User Analytics",
  };

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Feature Usage
          <Sparkles className="h-5 w-5 text-purple-600" />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* If no data */}
        {features.length === 0 ? (
          <p className="text-xs text-gray-500">No usage yet</p>
        ) : (
          features.map((f) => (
            <div key={f.feature} className="flex justify-between text-sm">
              <span>{featureNames[f.feature] || f.feature}</span>
              <span className="font-semibold">{f.percentage}%</span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
