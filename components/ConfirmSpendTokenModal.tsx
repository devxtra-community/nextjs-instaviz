import React from "react";

interface Props {
  open: boolean;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmSpendTokenModal({ open, message, onConfirm, onCancel }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
        <h3 className="text-lg font-semibold mb-3">Spend 1 token?</h3>
        <p className="text-sm text-gray-600 mb-5">{message || "Spend 1 token to unlock 2 more charts?"}</p>

        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg border">No</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-primary text-white">Yes — spend 1 token</button>
        </div>
      </div>
    </div>
  );
}
