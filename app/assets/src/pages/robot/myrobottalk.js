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
     data :[]
  };

  setCenter(){  
    document.querySelector('.topology-wrapper').scrollTop=5000-document.querySelector('.react-contextmenu-wrapper').offsetHeight/2;
    document.querySelector('.topology-wrapper').scrollLeft=5000-document.querySelector('.react-contextmenu-wrapper').offsetWidth/2;
  }

  componentDidMount () {

    this.setCenter(); 
    //const { dispatch } = this.props;

    // 获取列表数据
    // dispatch({
    //   type: 'users/fetch',
    // });
  }

  //自动布局
  autoLayOut( ){
    
    let top = 5000-document.querySelector('.react-contextmenu-wrapper').offsetHeight/2;

  }

  renderPath(data){
    return <svg className='topology-svg'>
      <Path />
    </svg>
  }

  renderFlow(data){
     
    return <div className='topology-canvas'>
            {
              data.decisionItemBOList.map(item=>{
                return item.nodeType===0? <NormalNode key={item.decisionId} data={item}/>:<JumpNode  key={item.decisionId} data={item}/>
              })
            } 
            {this.renderPath(data)}
          </div>
  }

  render () {
    //const { data} = this.state;
     
    return (
      <PageHeaderLayout title="决策树">
    
        <div className='robot-talk-flow'> 
          <div className='refactor-flow'>
            <div className='flow-tools'>
              <div className='flow-tools-templates' style={{width: '260px'}}>
                <div className='topology-template-wrapper' draggable="true">
                  <div className='flow-tools-templates-item'>普通节点</div>
                  <div className='topology-template-preview'></div>
                </div>
                <div className='topology-template-wrapper' draggable="true">
                  <div className='flow-tools-templates-item'>跳转节点</div>
                  <div className='topology-template-preview'></div>
                </div>
                <div className='topology-template-wrapper' draggable="true">
                  <div className='flow-tools-templates-item'>IVR节点</div>
                  <div className='topology-template-preview'></div>
                </div>
              </div>
            </div>
            <div className='react-contextmenu-wrapper'>
              <div className='topology-container'>
                <div className='topology-wrapper'>
                  {this.renderFlow(decisionTreeData.data)}
                </div>
                <div className='topology-tools'>
                  <div className='topology-tools-btn' onClick={this.setCenter}><Icon type="border-inner" />
                    <div className='tooltip'>定位中心</div>
                  </div>
                  <div className='topology-tools-btn'> <Icon type="apartment" />
                    <div className='tooltip'>自动布局</div>
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
