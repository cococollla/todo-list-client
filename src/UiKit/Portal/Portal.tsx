import { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PortalProps from "./Portal.props";

const Portal: FC<PortalProps> = ({ children }) => {
  const [container] = useState(() => document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return ReactDOM.createPortal(children, container);
};

export default Portal;
