import React from 'react';

export default function JumpNode({ id }) {
  return (
    <>
      <path
        strokeWidth="2"
        stroke="#AAB7C4"
        fill="none"
        d=" 
            M 5024 5104
            C 5012.5, 5118.666666666667 4897.5, 5133.333333333333 4886 5148 
        "
        style={{ pointerEvents: 'all' }}
      />
      <path
        className="topology-line-end-triangle"
        fill="#AAB7C4"
        stroke="none"
        data-type="end"
        data-json='{"origin":{"start":"7617921-否定","end":"7617923"},"po":{"start":{"x":5024,"y":5104},"end":{"x":4886,"y":5156}}}'
        d=" M 4886 5148
                l 4 0
                l -4 8
                l -4 -8
                Z
            "
        style={{ pointerEvents: 'all' }}
      />
    </>
  );
}
