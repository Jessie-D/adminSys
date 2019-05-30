import React from 'react';

export default function JumpNode({data:{decisionId:id,name,knowledge,childrenAnswerIds}  }) {
  return (
    <div
      id={`topology-node-${id}`}
      className="topology-node-wrapper"
      style={{ position: 'absolute', left: '5369px', top: '4801px', zIndex: 999 }}
      draggable="true"
    >
      <div className="topology-node-preview" />
      <div className="topology-node-content">
        <div className="react-contextmenu-wrapper">
          <div className="flow-node" style={{ width: 200 }}>
            <div className="flow-node-header">
              <p className="flow-node-header-title">{name}</p>
            </div>
            <p className="node-content" >
              {knowledge}
            </p>
            <div className="flow-node-branches-wrapper">
                {
                  childrenAnswerIds.map(item=>(
                    <div id={`${id}-${item}`} key={item} className="topology-anchor-wrapper" draggable="true">
                      <div className="flow-node-branch">{item}</div>
                      <div className="topology-anchor-wrapper-preview" />
                    </div>
                  ))
                }
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
