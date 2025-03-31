import {
    Renderable,
    Toast,
    ToastOptions,
    ToastType,
    DefaultToastOptions,
    ValueOrFunction,
    resolveValue,
  } from './types';
  import { genId } from './utils';
  import { dispatch, ActionType } from './store';
    
  type ToastHandler = (options?: ToastOptions) => string;
  
  const createToast = (
    type: ToastType = 'blank',
    opts?: ToastOptions
  ): Toast => ({
    createdAt: Date.now(),
    visible: true,
    dismissed: false,
    type,
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
    pauseDuration: 0,
    ...opts,
    id: opts?.id || genId(),
  });
  
  const createHandler = (type?: ToastType): ToastHandler => (options) => {
    const toast = createToast(type, options);
    dispatch({ type: ActionType.UPSERT_TOAST, toast });
    return toast.id;
  };
  
  const toast = (opts?: ToastOptions) => createHandler(opts?.type || 'blank')(opts);
  
  toast.error = createHandler('error');
  toast.success = createHandler('success');
  toast.loading = createHandler('loading');
  
  toast.dismiss = (toastId?: string) => {
    dispatch({
      type: ActionType.DISMISS_TOAST,
      toastId,
    });
  };
  
  toast.remove = (toastId?: string) => dispatch({ type: ActionType.REMOVE_TOAST, toastId });
  
  toast.promise = async <T>(
    promise: Promise<T> | (() => Promise<T>), 
    msgs: {
        loading: Renderable;
        success?: ValueOrFunction<Renderable, T>;
        error?: ValueOrFunction<Renderable, any>;
    },
    opts?: DefaultToastOptions
  ) => {
    const id = toast.loading({ ...opts, ...opts?.loading });

    try {
        if (typeof promise === 'function') {
            promise = promise();
        }

        const p = await promise;

        const successMessage = msgs.success ? resolveValue(msgs.success, p) : undefined;

        if (successMessage) {
            toast.success({
                id,
                ...opts,
                ...opts?.success,
            });
        } else {
            toast.dismiss(id);
        }

        return p;

    } catch (e) {
        const errorMessage = msgs.error ? resolveValue(msgs.error, e) : undefined;

        if (errorMessage) {
            toast.error({
                id,
                ...opts,
                ...opts?.error,
            });
        } else {
            toast.dismiss(id);
        }

        // Rethrow the error if needed, or handle it differently
        // Depending on your requirements, you might want to return a default value or rethrow.
        // If you don't rethrow, the caller won't know the promise failed.
         throw e; // or return some default value.
    }
  };
  
  export { toast };