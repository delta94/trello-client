import React from 'react';

const Layout = ({children, bg, className}) => {
  const style = { background: `url(${bg}) center center no-repeat` };
  const classes = className
    ? `container-fluid page-body-wrapper ${className}`
    : "container-fluid page-body-wrapper";

  return (
    <div className={classes} style={style} >
      <div className="main-panel">
        <div className="content-wrapper">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
