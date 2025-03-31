import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toast, ToastPosition } from '../core/types';
import { ToastIcon } from './toast-icon';
import { prefersReducedMotion } from '../core/utils';
import { CloseButton } from './close-button';
import { ProgressBar } from './progress-bar';

interface ToastBarProps {
  toast: Toast;
  position?: ToastPosition;
  style?: React.CSSProperties
}

const ToastBar: React.FC<ToastBarProps> = React.memo(
  ({ toast, position, style }) => {
    const top = (toast.position || position || 'top-right').includes('top');
    const factor = top ? 1 : -1;

    const initial = prefersReducedMotion()
      ? { opacity: 0 }
      : { opacity: 0.5, y: factor * -200, scale: 0.6 };

    const animate = { opacity: 1, y: 0, scale: 1 };

    const exit = prefersReducedMotion()
      ? { opacity: 0 }
      : { opacity: 0, y: factor * -150, scale: 0.6 };

      const successColor = 'rgb(74 222 128)'; // Tailwind green-500
      const errorColor = 'rgb(248 113 113)';   // Tailwind red-500
      const defaultColor = 'rgb(255 255 255)';  // Tailwind white
  
      const [backgroundColor, setBackgroundColor] = React.useState(
        toast.type === 'success'
          ? successColor
          : toast.type === 'error'
          ? errorColor
          : defaultColor
      );
  
      React.useEffect(() => {
        setBackgroundColor(
          toast.type === 'success'
            ? successColor
            : toast.type === 'error'
            ? errorColor
            : defaultColor
        );
      }, [toast.type]);

    return (
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={initial}
            animate={{ ...animate, backgroundColor: backgroundColor }}
            exit={exit}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 20,
              duration: prefersReducedMotion() ? 0.2 : 0.35,
              backgroundColor: { duration: 0.35 },
              layout: { duration: 0.35 },
            }}
            
            className={`relative flex items-center leading-5 shadow-lg max-w-sm pointer-events-auto p-4 gap-4 rounded-2xl overflow-hidden ${toast.className}`}
            style={{
              ...style,
              ...toast.style,
              color: toast.type === 'success' || toast.type === 'error' ? 'white' : 'rgb(55 65 81)'
            }}
            {...toast.ariaProps}
            layout
          >
            <CloseButton toast={toast} />
            <ToastIcon toast={toast} />
            <div className="flex flex-col">
              <p className='font-semibold leading-6 mb-1'>{toast?.title}</p>
              <p className='text-sm'>{toast?.text}</p>
            </div>
            <ProgressBar toast={toast} />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

export { ToastBar };