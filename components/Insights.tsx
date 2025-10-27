// components/InsightsPanel.tsx
import React, { ChangeEvent } from "react";

type InsightsPanelProps = {
  dataUploaded: boolean;
  setDataUploaded: (val: boolean) => void;
};

export const InsightsPanel: React.FC<InsightsPanelProps> = ({
  dataUploaded,
  setDataUploaded,
}) => {
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDataUploaded(true);
    }
  };

  return (
    <aside className="w-full md:w-96 bg-white rounded-xl shadow p-4 md:p-7 min-h-[240px] flex flex-col mt-4 md:mt-0">
      <div className="text-base md:text-xl font-semibold text-gray-700 mb-4">
        Suggestions & Insights
      </div>
      {!dataUploaded ? (
        <div className="flex flex-col items-center justify-center h-36">
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-violet-100 hover:bg-violet-200 text-violet-700 font-semibold py-2 px-6 rounded-lg shadow border border-violet-300"
          >
            Upload CSV to see insights
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleUpload}
          />
        </div>
      ) : (
        <>
          <div className="flex items-center mb-6">
            <div className="w-12 md:w-16 h-12 md:h-16 rounded-full border-8 border-violet-300 flex items-center justify-center text-lg md:text-2xl text-violet-700 font-bold">
              65.3%
            </div>
            <div className="ml-5">
              <div className="text-gray-700 font-medium">Analysis</div>
              <div className="text-xs text-gray-400">32.35%</div>
              <div className="text-gray-700 font-medium mt-2">Insights</div>
              <div className="text-xs text-gray-400">56%</div>
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-600 mb-2">Suggestion Insights</div>
            <ul className="text-gray-400 text-xs list-disc ml-5 space-y-1">
              <li>Suggest technology to speed manual student enriched estimates.</li>
              <li>Receive recommendations for missing reports.</li>
              <li>Summarize key research and access analytics faster.</li>
            </ul>
          </div>
        </>
      )}
    </aside>
  );
};
