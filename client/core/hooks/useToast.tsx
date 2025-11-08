import type { Renderable, ToastOptions } from "react-hot-toast";
// eslint-disable-next-line no-duplicate-imports
import { toast as defaultToast } from "react-hot-toast";

export const useToast = () => {
  const showSuccess = (message: Renderable, options?: ToastOptions) => {
    defaultToast.success(message, options);
  };
  const showLoading = (message: Renderable, options?: ToastOptions) => {
    defaultToast.loading(message, options);
  };

  const showError = (message: Renderable, options?: ToastOptions) => {
    defaultToast.error(message, options);
  };

  const showInfo = (message: Renderable, options?: ToastOptions) => {
    defaultToast(message, options);
  };

  const showPromise = <T,>(
    promise: Promise<T> | (() => Promise<T>),
    msgs: {
      loading: Renderable;
      success?: Renderable;
      error?: Renderable;
    },
    opts?: ToastOptions
  ) => {
    defaultToast.promise<T>(promise, msgs, opts);
  };

  const dismissToast = (toastId?: string) => {
    defaultToast.dismiss(toastId);
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showPromise,
    showLoading,
    dismissToast,
  };
};
