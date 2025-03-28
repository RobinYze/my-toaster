import * as React from 'react';
import {
  ToasterProps,
  ToastPosition,
  ToastWrapperProps,
} from '../core/types';
import { useToaster } from '../core/use-toaster';
import { cn, prefersReducedMotion } from '../core/utils';
import { ToastBar } from './toast-bar';

const ToastWrapper = ({
  id,
  className,
  style,
  onHeightUpdate,
  children,
}: ToastWrapperProps) => {
  const ref = React.useCallback(
    (el: HTMLElement | null) => {
      if (el) {
        const updateHeight = () => {
          const height = el.getBoundingClientRect().height;
          onHeightUpdate(id, height);
        };
        updateHeight();
        new MutationObserver(updateHeight).observe(el, {
          subtree: true,
          childList: true,
          characterData: true,
        });
      }
    },
    [id, onHeightUpdate]
  );

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};

const getPositionStyle = (
  position: ToastPosition,
  offset: number
): React.CSSProperties => {
  const top = position.includes('top');
  const verticalStyle: React.CSSProperties = top ? { top: 0 } : { bottom: 0 };
  const horizontalStyle: React.CSSProperties = position.includes('center')
    ? {
        justifyContent: 'center',
      }
    : position.includes('right')
    ? {
        justifyContent: 'flex-end',
      }
    : {};
  return {
    left: 0,
    right: 0,
    display: 'flex',
    position: 'absolute',
    transition: prefersReducedMotion()
      ? undefined
      : `all 230ms cubic-bezier(.21,1.02,.73,1)`,
    transform: `translateY(${offset * (top ? 1 : -1)}px)`,
    ...verticalStyle,
    ...horizontalStyle,
  };
};

const DEFAULT_OFFSET = 20;

export const Toaster: React.FC<ToasterProps> = ({
  reverseOrder,
  position = 'top-right',
  toastOptions,
  gutter,
  children,
  containerStyle,
  containerClassName,
}) => {
  const { toasts, handlers } = useToaster(toastOptions);

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 9999,
        top: DEFAULT_OFFSET,
        left: DEFAULT_OFFSET,
        right: DEFAULT_OFFSET,
        bottom: DEFAULT_OFFSET,
        pointerEvents: 'none',
        ...containerStyle,
      }}
      className={`${containerClassName}`}
      onMouseEnter={handlers.startPause}
      onMouseLeave={handlers.endPause}
    >
      {toasts.map((t, i) => {
        const toastPosition = t.position || position;
        const offset = handlers.calculateOffset(t, {
          reverseOrder,
          gutter,
          defaultPosition: position,
        });
        const positionStyle = getPositionStyle(toastPosition, offset);

        return (
          <ToastWrapper
            id={t.id}
            key={t.id}
            onHeightUpdate={handlers.updateHeight}
            className={cn("", 
              t.visible ? '[&>*]:pointer-events-auto' : '')
            }
            style={{
              ...positionStyle,
              zIndex: 999 - i
            }}
          > 
            {children ? (
              children(t)
            ) : (
              <ToastBar toast={t} position={toastPosition} />
            )}
          </ToastWrapper>
        );
      })}
    </div>
  );
};