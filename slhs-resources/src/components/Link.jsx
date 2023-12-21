import React from "react";

export default function Link({ samePage, ...props }) {
  return samePage || props.href?.startsWith("/") ? (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a {...props} />
  ) : (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a target="_blank" {...props} />
  );
}
