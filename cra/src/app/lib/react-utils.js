import React from "react";
import ReactDOM from "react-dom";

// A simple HOC to return any type of element with default props set
export const createComponent = (
  RenderAs = "div",
  defaultProps = {},
  name = ""
) => {
  const { className, ...other } = defaultProps;
  function Component({ as = RenderAs, extra, ...props }) {
    return React.createElement(as, {
      ...{
        className: className
          ? // TO add extra class
            className + (extra ? " " + extra : " ")
          : undefined
      },
      ...other,
      ...props
    });
  }

  // Functional HOC
  Component.displayName = `FHOC(${getDisplayName(name || RenderAs)})`;

  return Component;
};
//Setting the Display Name
export const getDisplayName = Component => {
  return Component.displayName || Component.name || String(Component);
};

// Simple Portal
export const createPortal = (node, name = "") => {
  function Portal({ children }) {
    return ReactDOM.createPortal(children, node);
  }
  Portal.displayName = `Portal(${getDisplayName(name)})`;
  return Portal;
};

// Item generator class
//Does nothing more than building nodes for provided items array
// Takes two parameter Parent Node and CHild Node // SHould be a react node.
export const itemGenerator = (parent = "div", child = "div", name = "") => {
  function ItemGenerator({ as = parent, items = [], children, ...props }) {
    return React.createElement(
      as,
      { ...props },
      children,
      items.map(({ key, as = child, ...otherProps }, i) =>
        React.createElement(as, {
          // eslint-disable-next-line
          key: key != undefined ? key : i,
          ...otherProps
        })
      )
    );
  }
  ItemGenerator.displayName = `ItemGenerator(${getDisplayName(name)})`;
  return ItemGenerator;
};

export const createNode = (as, props, ...children) =>
  React.createElement(as, props, children);
