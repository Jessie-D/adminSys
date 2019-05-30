import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Icon, Button, Dropdown, Menu, Modal, Table, Divider, Popconfirm } from 'antd';
import PageHeaderLayout from './../../layouts/pageHeaderLayout';
import JumpNode from './components/JumpNode';
import NormalNode from './components/NormalNode';
import Path from './components/Path';
import decisionTreeData from './decisionTree1';
const FormItem = Form.Item;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
import '../../global.less'

@connect(state => ({
  pageModel: state.users,
}))
export default class Robot extends PureComponent {
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
    this.setCenter();
    //const { dispatch } = this.props;

    // 获取列表数据
    // dispatch({
    //   type: 'users/fetch',
    // });
  }

  componentDidUpdate() {
    this.autoLayOut(decisionTreeData.data);
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
         eleNode.setAttribute('style', `position: absolute; left: ${left}px; top: ${top}px; z-index: 999;`)
       }
    }
 
  }

  renderPath(data) {
    return (
      <svg className="topology-svg">
        <Path />
      </svg>
    );
  }

  renderFlow(data) {
    return (
      <div className="topology-canvas">
        {data.decisionItemBOList.map(item => {
          return item.nodeType === 0 ? (
            <NormalNode key={item.decisionId} data={item} />
          ) : (
            <JumpNode key={item.decisionId} data={item} />
          );
        })}
        {this.renderPath(data)}
      </div>
    );
  }

  render() {
    //const { data} = this.state;

    return (
      <PageHeaderLayout title="决策树">
        <div className="robot-talk-flow">
          <div className="refactor-flow">
            <div className="flow-tools">
              <div className="flow-tools-templates" style={{ width: '260px' }}>
                <div className="topology-template-wrapper" draggable="true">
                  <div className="flow-tools-templates-item">普通节点</div>
                  <div className="topology-template-preview" />
                </div>
                <div className="topology-template-wrapper" draggable="true">
                  <div className="flow-tools-templates-item">跳转节点</div>
                  <div className="topology-template-preview" />
                </div>
                <div className="topology-template-wrapper" draggable="true">
                  <div className="flow-tools-templates-item">IVR节点</div>
                  <div className="topology-template-preview" />
                </div>
              </div>
            </div>
            <div className="react-contextmenu-wrapper">
              <div className="topology-container">
                <div className="topology-wrapper">{this.renderFlow(decisionTreeData.data)}</div>
                <div className="topology-tools">
                  <div className="topology-tools-btn" onClick={this.setCenter}>
                    <Icon type="border-inner" />
                    <div className="tooltip">定位中心</div>
                  </div>
                  <div className="topology-tools-btn">
                    {' '}
                    <Icon type="apartment" />
                    <div className="tooltip">自动布局</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageHeaderLayout>
    );
  }
}
