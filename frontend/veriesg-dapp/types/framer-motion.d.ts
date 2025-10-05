declare module "framer-motion" {
  import { ComponentProps } from "react";
  
  export interface MotionProps {
    initial?: any;
    animate?: any;
    transition?: any;
    whileHover?: any;
    whileTap?: any;
    variants?: any;
    custom?: any;
    inherit?: boolean;
    layout?: boolean | string;
    layoutId?: string;
    layoutDependency?: any;
    layoutScroll?: boolean;
    layoutRoot?: boolean;
    drag?: boolean | string | "x" | "y";
    dragConstraints?: any;
    dragElastic?: number;
    dragMomentum?: boolean;
    dragPropagation?: boolean;
    dragSnapToOrigin?: boolean;
    dragTransition?: any;
    dragValues?: any;
    onDrag?: any;
    onDragStart?: any;
    onDragEnd?: any;
    onDirectionLock?: any;
    onDragTransitionEnd?: any;
    onAnimationStart?: any;
    onAnimationComplete?: any;
    onUpdate?: any;
    onHoverStart?: any;
    onHoverEnd?: any;
    onTap?: any;
    onTapStart?: any;
    onTapCancel?: any;
    onPan?: any;
    onPanStart?: any;
    onPanEnd?: any;
    onViewportEnter?: any;
    onViewportLeave?: any;
    onLayoutAnimationStart?: any;
    onLayoutAnimationComplete?: any;
    onBeforeLayoutMeasure?: any;
    onLayoutMeasure?: any;
    style?: any;
    transformTemplate?: any;
    transformValues?: any;
    custom?: any;
    static?: boolean;
    dragListener?: boolean;
    dragControls?: any;
    dragSnapToOrigin?: boolean;
    dragElastic?: number;
    dragMomentum?: boolean;
    dragPropagation?: boolean;
    dragTransition?: any;
    dragValues?: any;
    onDrag?: any;
    onDragStart?: any;
    onDragEnd?: any;
    onDirectionLock?: any;
    onDragTransitionEnd?: any;
    onAnimationStart?: any;
    onAnimationComplete?: any;
    onUpdate?: any;
    onHoverStart?: any;
    onHoverEnd?: any;
    onTap?: any;
    onTapStart?: any;
    onTapCancel?: any;
    onPan?: any;
    onPanStart?: any;
    onPanEnd?: any;
    onViewportEnter?: any;
    onViewportLeave?: any;
    onLayoutAnimationStart?: any;
    onLayoutAnimationComplete?: any;
    onBeforeLayoutMeasure?: any;
    onLayoutMeasure?: any;
    style?: any;
    transformTemplate?: any;
    transformValues?: any;
    custom?: any;
    static?: boolean;
    dragListener?: boolean;
    dragControls?: any;
  }

  export const motion: {
    [K in keyof JSX.IntrinsicElements]: React.ComponentType<
      ComponentProps<JSX.IntrinsicElements[K]> & MotionProps
    >;
  };
  
  export const AnimatePresence: React.ComponentType<any>;
}
