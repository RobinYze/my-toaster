import { CSSProperties } from 'react';
import { LucideIcon } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'loading' | 'blank';
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type Renderable = React.ReactElement | string | null;

export interface IconTheme {
  primary: string;
  secondary: string;
}

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
export type ValueOrFunction<TValue, TArg> =
  | TValue
  | ValueFunction<TValue, TArg>;

const isFunction = <TValue, TArg>(
  valOrFunction: ValueOrFunction<TValue, TArg>
): valOrFunction is ValueFunction<TValue, TArg> =>
  typeof valOrFunction === 'function';

export const resolveValue = <TValue, TArg>(
  valOrFunction: ValueOrFunction<TValue, TArg>,
  arg: TArg
): TValue => (isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction);

export interface Toast {
  type: ToastType;
  id: string;  
  icon?: LucideIcon
  duration?: number;
  pauseDuration: number;
  position?: ToastPosition;
  removeDelay?: number;

  title?: string;
  text?: string;
  content?: Renderable;
  closeButton?: boolean;
  progress?: "auto" | number;

  ariaProps: {
    role: 'status' | 'alert';
    'aria-live': 'assertive' | 'off' | 'polite';
  };

  style?: CSSProperties;
  className?: string;
  iconTheme?: IconTheme;

  createdAt: number;
  visible: boolean;
  dismissed: boolean;
  height?: number;
}

export type ToastOptions = Partial<Pick<Toast,
    | 'id'
    | 'type'
    | 'icon'
    | 'title'
    | 'text'
    | 'content'
    | 'closeButton'
    | 'duration'
    | 'progress'
    | 'ariaProps'
    | 'className'
    | 'style'
    | 'position'
    | 'iconTheme'
    | 'removeDelay'
  >
>;

export type DefaultToastOptions = ToastOptions & {
  [key in ToastType]?: ToastOptions;
};

export interface ToasterProps {
  position?: ToastPosition;
  toastOptions?: DefaultToastOptions;
  reverseOrder?: boolean;
  gutter?: number;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
  children?: (toast: Toast) => React.ReactElement;
}

export interface ToastWrapperProps {
  id: string;
  className?: string;
  style?: React.CSSProperties;
  onHeightUpdate: (id: string, height: number) => void;
  children?: React.ReactNode;
}