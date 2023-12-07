import React, { useRef } from 'react';
import StickySidebar from 'react-sticky-sidebar';

function MyComponent () {
  const sidebarRef = useRef(null);

  return (
    <div style={{ display: 'flex' }}>
      <div className="col-3" ref={sidebarRef}>
       
        <p>Sidebar Content</p>
      </div>
      <div className="col-8 main-content">
        <StickySidebar sidebarRef={sidebarRef} topSpacing={10} bottomSpacing={10}>
          
          <p>Main Content</p>
        </StickySidebar>
      </div>
    </div>
  );
};

export default MyComponent;
