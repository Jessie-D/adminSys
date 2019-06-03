import React, { Component } from 'react';
import { DragDropContext ,Draggable,Droppable} from 'react-beautiful-dnd';
 
import { Row, Col, Card, Form, Input, Icon, Button, Dropdown, Menu, Modal, Table, Divider, Popconfirm } from 'antd';
import PageHeaderLayout from './../../layouts/pageHeaderLayout';
import JumpNode from './components/JumpNode';
import NormalNode from './components/NormalNode';
import ActionBtn from './components/ActionBtn';

import decisionTreeData from './decisionTree1';

import '../../global.less'

 
export default class Robot extends Component {
  state = {
    data: [],
  };

  setCenter() {
    document.querySelector('.topology-wrapper').scrollTop =
      5000 - document.querySelector('.react-contextmenu-wrapper').offsetHeight / 2;
    document.querySelector('.topology-wrapper').scrollLeft =
      5000 - document.querySelector('.react-contextmenu-wrapper').offsetWidth / 2;
  }

  componentDidMount() {
    
    this.autoLayOut(decisionTreeData.data);
    this.setCenter();
    //const { dispatch } = this.props;

    // 获取列表数据
    // dispatch({
    //   type: 'users/fetch',
    // });
  }

  componentDidUpdate() {
    console.log("componentDidUpdate ")
    //this.autoLayOut(decisionTreeData.data);
  }

  getEle(id) {
    return document.getElementById(id);
  }
  
 
  //自动布局
  autoLayOut(data) {
    //分层存储节点
    let levelNodes = {};
    let level = 0;
    function separateLevel(nodes, index) {
      let arr = levelNodes[index] ? levelNodes[index] : [];
      level = index;
      nodes.map(node => {
        arr.push(node.decisionId);
        levelNodes[index] = arr;
        if (node.childrenList.length) {
          separateLevel(node.childrenList, index + 1);
        }
      });
    }
    separateLevel([data.decisionNodeBO], level);
    console.log(levelNodes, level);

    let treeHeight =0,treeWidth =0, maxlevel=0;
    let levelHeight = {}
    let levelWidth ={}

    for(let i=0;i<=level;i++){
      levelHeight[i] =Math.max(...levelNodes[i].map(item=>this.getEle(`topology-node-${item}`).offsetHeight))
      treeHeight += levelHeight[i]; 
      levelWidth[i]= 0
      levelNodes[i].map(item=>{
        levelWidth[i]+=this.getEle(`topology-node-${item}`).offsetWidth
      })
         
      //找到最多节点层
      maxlevel = Math.max(levelNodes[maxlevel],levelNodes[i].length)===maxlevel?maxlevel:i;
    }
    
    treeWidth = levelNodes[maxlevel].map(item=>{
      treeWidth += this.getEle(`topology-node-${item}`).offsetWidth
    })
    //加上中间间距
    treeHeight += 50*level;
    treeWidth +=25*(levelNodes[maxlevel].length-1)

    let treeTop = 5000 -treeHeight/2;
    let treeLeft = 5000 - treeWidth/2;

    let levalTop=treeTop;
    for(let i=0;i<=level;i++){  
       
       levalTop = i>0 ? levalTop+levelHeight[i-1]+50:levalTop;
       let levelLeft = 5000-(levelWidth[i]+25*(levelNodes[i].length-1))/2
       for(let j=0;j<levelNodes[i].length;j++){ 
       
        let eleNode = this.getEle(`topology-node-${levelNodes[i][j]}`);
        levelLeft  = j==0?levelLeft: levelLeft+this.getEle(`topology-node-${levelNodes[i][j-1]}`).offsetWidth+25;
         let left =  levelLeft
         let top = levalTop
         eleNode.setAttribute('style', `position: absolute; left: ${left}px; top: ${top}px;`)
       }
    }

    //渲染路径
    let path = "";
    for(let item of data.decisionItemBOList){
      if(item.parentId){
        for(let aName of item.answerIds){
          let node = this.getEle(`topology-node-${item.decisionId}`);
          let pNode = this.getEle(`topology-node-${item.parentId}`);
          let btn = this.getEle(`${item.parentId}-${aName}`);
          let x0= pNode.offsetLeft+btn.offsetLeft+btn.offsetWidth/2 ;
          let y0= pNode.offsetTop+btn.offsetTop+23;
          let x1= node.offsetLeft+node.offsetWidth/2;
          let y1= node.offsetTop-8;
          let f = -35;
          path +=  `<path
                    stroke-width="2"
                    stroke="#AAB7C4"
                    fill="none"
                    d=" 
                        M ${x0} ${y0}
                        C ${x0},${y1+f} ${x1},${y0-f} ${x1},${y1} 
                    "
                    style="pointer-events: all;"
                  /> 
            <path
              class="topology-line-end-triangle"
              fill="#AAB7C4"
              stroke="none"
              data-type="end"
              data-json='{"origin":{"start":"7617921-否定","end":"7617923"},"po":{"start":{"x":5024,"y":5104},"end":{"x":4886,"y":5156}}}'
              d=" M ${x1} ${y1} 
                      l 4 0
                      l -4 8
                      l -4 -8
                      Z
                  "
              style="pointer-events: all;"
            />` 
        }
      }
    }  
    

    document.querySelector('.topology-svg').innerHTML= path 
 
  }
 
  // renderFlow(data) {
  //   return (
  //     <div className="topology-canvas">
  //       {data.decisionItemBOList.map(item => {
  //         return item.nodeType === 0 ? (
  //           <NormalNode key={item.decisionId} data={item} />
  //         ) : (
  //           <JumpNode key={item.decisionId} data={item} />
  //         );
  //       })}
  //       <svg className="topology-svg"></svg>
  //     </div>
  //   );
  // }

  renderFlow(data) {
    return ( <>
        {
          data.decisionItemBOList.map(item => {
            return item.nodeType === 0 ?  
                        <NormalNode key={item.decisionId}  data={item} />
                      : <JumpNode key={item.decisionId} data={item}  />
            }
          )
        }
        <svg className="topology-svg"></svg>
      </>
    );
  }
  onDragEnd(result) {
    // dropped outside the list
    console.log("innner drag");
     
  }
  render() {
    //const { data} = this.state;

    return (
      <PageHeaderLayout title="决策树">
          <div className="robot-talk-flow">
            <DragDropContext onDragEnd={this.onDragEnd}> 
            <Droppable droppableId='cavas' type="cavas" key="0">
              {(provided, snapshot) => (
                <div className="refactor-flow">
                  <div className="flow-tools">
                    <div className="flow-tools-templates" style={{ width: '180px' }}>
                      <Draggable draggableId="draggable-0" index={0}>
                        {(provided, snapshot) => (
                          <ActionBtn id="0" content="普通节点"  
                            innerRef={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          /> 
                        )}
                      </Draggable>
                      <Draggable draggableId="draggable-1" index={1}>
                        {(provided, snapshot) => (
                          <ActionBtn id="1" content="跳转节点"  
                            innerRef={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          /> 
                        )}
                      </Draggable> 
                    </div>
                  </div>
                  <div className="react-contextmenu-wrapper">
                    <div className="topology-container">
                      <div className="topology-wrapper">
                                    <div className="topology-canvas"
                                          ref={provided.innerRef}
                                          {...provided.droppableProps} 
                                        > 
                                        {this.renderFlow(decisionTreeData.data)}
                                        {provided.placeholder}
                                    </div>
                      </div>
                      <div className="topology-tools">
                        <div className="topology-tools-btn" onClick={this.setCenter}>
                          <Icon type="border-inner" />
                          <div className="tooltip">定位中心</div>
                        </div>
                        <div className="topology-tools-btn"  onClick={this.autoLayOut.bind(this,decisionTreeData.data)}>
                          <Icon type="apartment" />
                          <div className="tooltip">自动布局</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              </Droppable>
            </DragDropContext>
          </div>
      </PageHeaderLayout>
    );
  }
}
