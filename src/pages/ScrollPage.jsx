import { useRef, useState } from "react";

function ScrollPage() {
  const [scrollPosition, setScrollPosition] = useState({ scrollTop: 0, scrollLeft: 0 });
  const scrollDemoRef = useRef(null);

  const handleScroll = () => {
    if (scrollDemoRef.current) {
      const { scrollTop, scrollLeft } = scrollDemoRef.current;
      setScrollPosition({ scrollTop, scrollLeft });
    }
  };

  return (
    <div>
      <div
        id="scrollDemo"
        ref={scrollDemoRef}
        style={{
          height: '200px',
          width: '200px',
          overflow: 'auto',
          backgroundColor: '#f0db4f',
          padding: '10px' // Added padding to make scroll visible
        }}
        onScroll={handleScroll}
      >
        <p style={{ height: '300px', width: '300px' }}>JavaScript scrollLeft / scrollTop</p>
      </div>
      <div className="output">
        scrollTop: {scrollPosition.scrollTop} <br />
        scrollLeft: {scrollPosition.scrollLeft}
      </div>
    </div>
  );
}

export default ScrollPage
