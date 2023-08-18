import React, {
  FC,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  AnimatedComponent,
  AnimatedProps,
  animated,
  useSpring,
  useTransition,
} from "@react-spring/web";
import clsxm from "../../utils/clsxm";
import { ClassValue } from "clsx";
import Portal from "../Portal";
import { safeVoid } from "../../utils/common";
import ModalHeader, { ModalHeaderProps } from "./ModalHeader";
import ModalFooter, { ModalFooterProps } from "./ModalFooter";

export type ModalProps = {
  open?: boolean;
  theme?: "light" | "dark";
  headerTitle?: string | ReactNode;
  disableAnimation?: boolean;
  blur?: boolean;
  containerStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  as?: React.ElementType;
  overrides?: {
    backdropClassName?: ClassValue;
    header?: {
      className: ClassValue;
      closeIcon?: React.ElementType;
    };
  };
  close: (
    e:
      | React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>
      | KeyboardEvent
      | MouseEvent
  ) => void;
} & AnimatedProps<AnimatedComponent<"div">> &
  React.PropsWithChildren &
  HTMLAttributes<HTMLElement>;

export type ModalContext = {
  close: ModalProps["close"];
  getFooterClass: (alignment: ModalFooterProps["alignment"]) => string;
  getHeaderClass: (alignment: ModalHeaderProps["alignment"]) => string;
};

export type ModalComposition = {
  Header: FC<ModalHeaderProps>;
  Footer: FC<ModalFooterProps>;
};

const ModalContext = React.createContext<ModalContext | undefined>(undefined);

const Modal = (props: ModalProps) => {
  const {
    open,
    close,
    headerTitle,
    overrides,
    disableAnimation = false,
    blur = true,
    containerStyle = {},
    contentStyle = {},
    as,
    ...rest
  } = props;
  const Component = as || animated["div"];
  const ChildComponent = animated["div"];

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? close(e) : null;
    document.body.addEventListener("keydown", (e) => closeOnEscapeKey(e));
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [close]);

  useEffect(() => {
    if (open && modalRef.current) {
      if (safeVoid(close)) {
        modalRef.current.onclick = (e) => {
          if (e.target === modalRef.current) {
            close(e);
          }
        };
      }
    }
  }, [open, modalRef]);

  const backdropAnimation = useSpring({
    opacity: open ? 1 : 0,
    scale: open ? 1.1 : 1.1,
    backdropFilter: open ? "blur(0.5rem)" : "blur(0rem)",
  });

  const blurAnimation = useSpring({
    backdropFilter: open ? "blur(0.5rem)" : "blur(0rem)",
  });

  const transitions = useTransition(open, {
    from: { opacity: 0, transform: "translateY(-40px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(-40px)" },
  });

  const getFooterClass = (alignment: ModalFooterProps["alignment"]) => {
    let baseClass = "w-full flex flex-row";
    if (alignment === "center") {
      baseClass += " justify-center items-center";
    }
    if (alignment === "left") {
      baseClass += " justify-start items-center";
    }
    if (alignment === "right") {
      baseClass += " justify-end items-center";
    }

    return baseClass;
  };

  const getHeaderClass = (alignment: ModalFooterProps["alignment"]) => {
    let baseClass = "w-full flex flex-row";
    if (alignment === "center") {
      baseClass += " justify-center items-center";
    }
    if (alignment === "left") {
      baseClass += " justify-start items-center";
    }
    if (alignment === "right") {
      baseClass += " justify-end items-center";
    }

    return baseClass;
  };

  const memoizedCompositionProps = useMemo(
    () => ({
      close,
      getFooterClass,
      getHeaderClass,
    }),
    [close, open]
  );

  return (
    <Portal wrapperId={rest.id ?? `remics-modal-wrapper`}>
      <ModalContext.Provider value={memoizedCompositionProps}>
        <Component
          ref={modalRef}
          className={clsxm(
            open && "bg-black/60 px-2",
            "fixed top-0 left-0 md:px-0 w-screen h-screen flex items-center justify-center",
            !open ? "-z-50" : "z-[9990]",
            overrides?.backdropClassName
          )}
          style={
            !disableAnimation
              ? { ...backdropAnimation, ...containerStyle }
              : blur
              ? { ...blurAnimation, ...containerStyle }
              : { ...containerStyle }
          }
        >
          {!disableAnimation
            ? transitions(
                (style, item) =>
                  item && (
                    <ChildComponent
                      {...rest}
                      style={{ ...style, ...contentStyle }}
                      className={clsxm(
                        "modal w-full max-w-lg rounded-xl shadow-md overflow-x-hidden relative z-50 bg-gray-50"
                      )}
                    >
                      <section
                        className={clsxm(
                          "p-4 relative overflow-x-hidden",
                          rest.className
                        )}
                      >
                        {rest.children}
                      </section>
                    </ChildComponent>
                  )
              )
            : open && (
                <div
                  {...rest}
                  className={clsxm(
                    "modal w-full max-w-lg rounded-xl shadow-md overflow-x-hidden relative z-[9999]",
                    "bg-gray-50 text-slate-900"
                  )}
                >
                  <section
                    className={clsxm(
                      "p-4 relative overflow-x-hidden",
                      rest.className
                    )}
                  >
                    {rest.children}
                  </section>
                </div>
              )}
        </Component>
      </ModalContext.Provider>
    </Portal>
  );
};

export const useModal = (): ModalContext => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("This component must be used within a <Tabs> component.");
  }
  return context;
};

Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;

export default Modal;
