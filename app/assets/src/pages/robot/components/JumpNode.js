import React from 'react';

export default function JumpNode({data:{decisionId:id,name,knowledge,action,actionParam}}){
  let actinonTypes={
    1:"挂机",
    3:"执行下一步"
  } 
  return (
    <div
      id={`topology-node-${id}`}
      className="topology-node-wrapper"
      style={{ position: 'absolute', left: 5430, top: 4970, zIndex: 999 }}
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
            <p className="node-content">下一步：
              { actionParam&&actionParam.sceneNodeName?actionParam.sceneNodeName:actinonTypes[action]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
