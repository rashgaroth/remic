import React from "react";
import { animated, useSpring } from "@react-spring/web";
import { ModalProps } from "../../interfaces/component";
import { XMarkIcon } from "@heroicons/react/24/solid";
import clsxm from "../../utils/clsxm";

const Modal = ({
  open,
  close,
  headerTitle,
  overrides,
  disableHeader = false,
  disableAnimation = false,
  theme = "dark",
  ...props
}: ModalProps) => {
  const backdropAnimation = useSpring({
    opacity: open ? 1 : 0,
    scale: open ? 1.1 : 1.1,
    backdropFilter: open ? "blur(0.5rem)" : "blur(0rem)",
  });

  const modalAnimation = useSpring({
    opacity: open ? 1 : 0,
    scale: open ? 0.9 : 0.5,
  });

  return (
    <animated.div
      className={clsxm(
        "w-screen h-screen flex items-center justify-center fixed top-0 left-0 bg-black/60 px-2 md:px-0",
        !open ? "-z-50" : "z-[9990]",
        overrides?.backdropClassName
      )}
      onClick={() => {
        if (disableHeader) {
          close();
        }
      }}
      style={{ ...backdropAnimation, ...props.style }}
    >
      <animated.aside
        {...props}
        style={{ ...modalAnimation, ...props.style }}
        className={clsxm(
          "w-full max-w-lg rounded-xl shadow-md overflow-x-hidden relative z-[9999] -mt-8",
          theme === "dark"
            ? "bg-[#252a30] text-gray-100"
            : "bg-[#dedfe2] text-slate-900"
        )}
      >
        {!disableHeader && (
          <header
            className={clsxm(
              "w-full px-1.5 py-1.5 rounded-t-xl shadow-md mb-2 flex justify-between items-center",
              theme === "dark"
                ? "bg-[#34363d]"
                : "bg-[#f6f8fa] shadow-gray-300",
              overrides?.header?.className
            )}
          >
            {!!overrides?.header?.closeIcon ? (
              <overrides.header.closeIcon
                className="w-4 h-4 cursor-pointer"
                onClick={close}
              />
            ) : (
              <button onClick={close}>
                <XMarkIcon className="w-4 h-4 border border-slate-800 bg-red-500 rounded-full p-0.5 text-white" />
              </button>
            )}
            <h1 className="font-semibold text-xs text-center">{headerTitle}</h1>
            <span className="px-1.5 py-1.5 bg-transparent" />
          </header>
        )}
        <section
          className={clsxm(
            "p-4 py-2 relative overflow-x-hidden max-h-[600px]",
            disableHeader && "mt-4 py-0",
            props.className
          )}
        >
          {props.children}
        </section>
        <div className={clsxm(!disableHeader ? "mt-2" : "mt-4")}></div>
      </animated.aside>
    </animated.div>
  );
};

export default Modal;
