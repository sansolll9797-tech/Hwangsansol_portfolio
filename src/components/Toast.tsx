import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl bg-[#0f0f12] border border-white/10 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-300"
          style={{
            borderColor: toast.type === 'success' ? 'var(--accent-color)' : undefined,
            boxShadow: toast.type === 'success' ? '0 0 20px -5px var(--accent-glow)' : undefined
          }}
        >
          <div className="flex items-center gap-3">
            {toast.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: 'var(--accent-color)' }} />
            )}
            {toast.type === 'error' && (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-sky-400 shrink-0" />
            )}
            <p className="text-sm font-medium text-slate-100">{toast.text}</p>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="p-1 text-slate-400 hover:text-white transition-colors"
            aria-label="알림 닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
