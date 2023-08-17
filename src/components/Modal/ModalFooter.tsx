import * as React from "react";
import { ReactNode } from "react";
import clsxm from "../../utils/clsxm";
import { useModal } from ".";

export type ModalFooterProps = {
  children?: ReactNode;
  alignment?: "left" | "center" | "right";
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

const ModalFooter = (props: ModalFooterProps) => {
  const { getFooterClass } = useModal();

  return (
    <footer
      className={clsxm(
        "w-full py-2 space-x-2 flex justify-start items-center",
        props.alignment && getFooterClass(props.alignment),
        props?.className
      )}
    >
      {props.children}
    </footer>
  );
};

export default ModalFooter;
