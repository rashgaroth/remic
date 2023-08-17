import * as React from "react";
import { ReactNode } from "react";
import clsxm from "../../utils/clsxm";
import { useModal } from ".";

export type ModalHeaderProps = {
  children?: ReactNode;
  alignment?: "left" | "center" | "right";
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

const ModalHeader = (props: ModalHeaderProps) => {
  const { getHeaderClass } = useModal();

  return (
    <header
      className={clsxm(
        "w-full py-2 space-x-2 flex justify-start items-center",
        props.alignment && getHeaderClass(props.alignment),
        props?.className
      )}
    >
      {props.children}
    </header>
  );
};

export default ModalHeader;
