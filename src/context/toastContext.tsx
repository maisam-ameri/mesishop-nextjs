"use client"

import React, { createContext, useContext } from "react"
import { ToastModel } from "@/components/toast/toastModel";
import Toast from "@/components/toast/toast";

interface ToastContextType {
  toasts: ToastModel[],
  showToast: (toastModel: ToastModel) => void,
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastModel[]>([]);

  const showToast = (toastModel: ToastModel) => {
    setToasts(prev => [...prev,
    {
      id: toastModel.id,
      message: toastModel.message
    }
    ]);
  }

  React.useEffect(() => {

    if (toasts.length === 0) return;

    const timer = setTimeout(() => {
      setToasts(prev => prev.slice(1));
    }, 2000);

    return () => { clearTimeout(timer) }
  }
    , [toasts]);



  return (
    <ToastContext.Provider value={{ toasts, showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) =>
          <Toast key={toast.id} toastModel ={toast} />
        )}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context)
    throw new Error("useToast must be used inside ToastProvider");

  return context;
}


