import React from 'react';
import { motion } from 'framer-motion';
import { Toast } from '../core/types';
import * as LucideReact from 'lucide-react';

export const ToastIcon: React.FC<{
  toast: Toast;
}> = ({ toast }) => {
  const { icon, type } = toast;

  if (icon !== undefined) {
    if (typeof icon === 'string') {
      const LucideIconComponent = LucideReact[icon];

      if(LucideIconComponent) {
        const ReactLucideIcon = LucideIconComponent as LucideReact.LucideIcon

        return (
          <motion.div
            initial={{ scale: 0.6, opacity: 0.4 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.12, ease: [0.175, 0.885, 0.32, 1.275] }}
            className="relative min-w-[20px]"
          >
            <i className='w-4 h-4'><ReactLucideIcon size="20"/></i>
          </motion.div>
        );
      } else {
        console.error(`Lucide icon "${icon}" not found.`)
        return null;
      }

    } else if (typeof icon === 'object' && icon) {
      const IconComponent = icon as LucideReact.LucideIcon
      return (
        <motion.div
          initial={{ scale: 0.6, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.12, ease: [0.175, 0.885, 0.32, 1.275] }}
          className="relative min-w-[20px]"
        >
          <i className='w-4 h-4'><IconComponent size="20"/></i>
        </motion.div>
      );
    }

    console.error(`Invalid icon type: ${typeof icon}`);
    return null;  // No valid icon provided
  }

  if (type === 'blank') {
    return null;
  }

  return (
    <div className="relative flex justify-center items-center min-w-[20px] min-h-[20px]">
      {type === 'loading'
      ? <LucideReact.Loader2 className='animate-spin'/>
      : type === 'error'
        ? <LucideReact.AlertTriangle />
        : type === 'success'
          ? <LucideReact.Check />
          : null
      }
    </div>
  );
};