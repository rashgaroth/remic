import React from "react";
import * as ReactDOM from "react-dom";
import useIsoMorphEffect from "../../hooks/useIsoMorphEffect";

export interface PortalProps {
  children?: React.ReactNode;
  container?: Element | (() => Element | null) | null;
  disablePortal?: boolean;
  wrapperId?: string;
}

const ROOT_CLASS = "remic-portal-root";

function getContainer(container: PortalProps["container"]) {
  return typeof container === "function" ? container() : container;
}

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

function setRef<T>(
  ref:
    | React.MutableRefObject<T | null>
    | ((instance: T | null) => void)
    | null
    | undefined,
  value: T | null
): void {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

function useForkRef<Instance>(
  ...refs: Array<React.Ref<Instance> | undefined>
): React.RefCallback<Instance> | null {
  return React.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }

    return (instance) => {
      refs.forEach((ref) => {
        setRef(ref, instance);
      });
    };
  }, refs);
}

const Portal = React.forwardRef<Element, PortalProps>((props, ref) => {
  const { children, container, disablePortal = false, wrapperId } = props;
  const [mountNode, setMountNode] =
    React.useState<ReturnType<typeof getContainer>>(null);

  const handleRef = useForkRef(
    // @ts-expect-error
    React.isValidElement(children) ? children.ref : null,
    ref
  );

  useIsoMorphEffect(() => {
    if (!disablePortal) {
      setMountNode(
        getContainer(container) ||
          createWrapperAndAppendToBody(wrapperId || ROOT_CLASS)
      );
    }
  }, [container, disablePortal]);

  useIsoMorphEffect(() => {
    if (mountNode && !disablePortal) {
      setRef(ref, mountNode);
      return () => {
        setRef(ref, null);
      };
    }

    return undefined;
  }, [ref, mountNode, disablePortal]);

  useIsoMorphEffect(() => {
    let el = document.getElementById(wrapperId || ROOT_CLASS);
    let systemCreated = false;
    if (!el) {
      systemCreated = true;
      el = createWrapperAndAppendToBody(wrapperId || ROOT_CLASS);
    }
    setMountNode(el);

    return () => {
      if (systemCreated) {
        el?.parentNode?.removeChild(el);
      }
    };
  }, [wrapperId]);

  if (disablePortal) {
    if (React.isValidElement(children)) {
      const newProps = {
        ref: handleRef,
      };
      return React.cloneElement(children, newProps);
    }
    return <React.Fragment>{children}</React.Fragment>;
  }
  return (
    <React.Fragment>
      {mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode}
    </React.Fragment>
  );
});

export default Portal;
