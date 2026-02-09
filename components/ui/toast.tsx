'use client';

import { useEffect, useState } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

let addToastFn: ((toast: Omit<Toast, 'id'>) => void) | null = null;

export function showToast(message: string, type: Toast['type'] = 'info') {
  addToastFn?.({ message, type });
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    addToastFn = (toast) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { ...toast, id }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    };
    return () => { addToastFn = null; };
  }, []);

  const colors = {
    success: 'bg-green-500/20 border-green-500/40 text-green-300',
    error: 'bg-red-500/20 border-red-500/40 text-red-300',
    info: 'bg-blue-500/20 border-blue-500/40 text-blue-300',
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg border text-sm animate-fade-in ${colors[toast.type]}`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
