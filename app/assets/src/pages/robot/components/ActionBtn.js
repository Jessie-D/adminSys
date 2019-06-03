import React from 'react'  
export default class ActionBtn extends React.Component {
  render() { 
    return ( <div className="topology-template-wrapper" 
                {...this.props}
                ref={this.props.innerRef}
            >
              <div className="flow-tools-templates-item">{this.props.content}</div>
              <div className="topology-template-preview" />
            </div>  
    )
  }
}
