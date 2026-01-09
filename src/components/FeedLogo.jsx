function FeedLogo() {
  return (
    // SVG container - width/height set the display size, viewBox defines the coordinate system.
    // viewBox="0 0 200 100" means: start at (0,0), with 200 units wide and 100 units tall.
    <svg
      width="200"
      height="100"
      viewBox="0 0 200 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <defs> is where you define reusable elements and styles.
          Content inside <defs> doesn't render directly - it's just definitions. */}
      <defs>
        {/* <style> contains CSS that applies to elements inside this SVG.
            The {` `} syntax: curly braces = JavaScript, backticks = multi-line string. */}
        <style>
          {`
            /* "Learning" text - light and subtle */
            .top-text { 
              font-family: sans-serif; 
              font-weight: 300;           /* Light weight */
              font-size: 24px; 
              letter-spacing: 2px;        /* Space between letters */
              fill: #38A169;                 /* SVG uses 'fill' instead of 'color' */
              opacity: 0;                 /* Start invisible (animation will fade it in) */
              animation: fadeSlideUp 0.8s ease-out forwards;
              /* 'forwards' keeps the final animation state (opacity: 1) */
            }
            
            /* "FEED" text - bold and prominent */
            .bottom-text { 
              font-family: sans-serif; 
              font-weight: 900;           /* Extra bold */
              font-size: 38px; 
              fill: #EDE1DC; 
              text-transform: uppercase; 
              opacity: 0;
              animation: fadeSlideUp 0.8s ease-out 0.2s forwards;
              /* The '0.2s' is a delay - waits before starting (creates stagger effect) */
            }

            /* The red dot after "FEED" */
            .dot { 
              fill: #ef4444;              /* Red color */
              opacity: 0;                 /* Start invisible */
              transform-box: fill-box;   /* Transform origin is relative to the element itself */
              transform-origin: center;  /* Scale/rotate from center point */
            }

            /* Wrapper for the dot - handles the drop animation */
            .dot-wrapper {
              animation: dropBounce 1.2s cubic-bezier(0.36, 0, 0.66, -0.56) 0.6s forwards;
              /* cubic-bezier creates custom easing - this one overshoots then settles */
              /* 0.6s delay - waits for text animations to mostly finish */
            }
            
            /* Continuous pulse effect on the dot (after it lands) */
            .dot-pulse {
              animation: pulse 2s infinite 1.8s;
              /* 'infinite' = loops forever, 1.8s delay = waits for drop to finish */
            }

            /* KEYFRAME ANIMATIONS - define what happens at each step */

            /* Simple fade + slide up effect */
            @keyframes fadeSlideUp {
              from { opacity: 0; transform: translateY(10px); }  /* Start: invisible, 10px below */
              to { opacity: 1; transform: translateY(0); }       /* End: visible, normal position */
            }

            /* Bouncy drop effect - like dropping a ball */
            @keyframes dropBounce {
              0% { opacity: 0; transform: translateY(-60px); }   /* Start: invisible, 60px above */
              20% { opacity: 1; }                                 /* Fade in quickly */
              40% { transform: translateY(0px); }                 /* Hit the ground */
              55% { transform: translateY(-15px); }               /* First bounce up */
              70% { transform: translateY(0px); }                 /* Back down */
              85% { transform: translateY(-5px); }                /* Small bounce */
              100% { opacity: 1; transform: translateY(0px); }    /* Settle in place */
            }

            /* Gentle pulse - makes dot "breathe" */
            @keyframes pulse {
              0% { opacity: 1; transform: scale(1); }             /* Normal size */
              50% { opacity: 0.7; transform: scale(0.85); }       /* Slightly smaller + faded */
              100% { opacity: 1; transform: scale(1); }           /* Back to normal */
            }
          `}
        </style>
      </defs>

      {/* SVG <text> element - x/y position the text's baseline (bottom-left of first letter) */}
      <text x="10" y="35" className="top-text">
        Learning
      </text>

      <text x="10" y="75" className="bottom-text">
        FEED
      </text>

      {/* <g> is a group element - like a <div> for SVG.
          Used here to apply the drop animation to the dot. */}
      <g className="dot-wrapper">
        {/* <circle> draws a circle - cx/cy = center position, r = radius */}
        {/* Multiple classes: "dot" for styling, "dot-pulse" for the pulse animation */}
        <circle cx="122" cy="68" r="6" className="dot dot-pulse" />
      </g>
    </svg>
  );
}

export default FeedLogo;
