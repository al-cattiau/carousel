import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

class TrashTaskPaper extends Component {
  state={zDepth:2}

  render(){
    return (
      <Paper 
        style={{'width':300,'height':300,'margin':5,'position':'relative','textAlign':'center'}} 
        zDepth={this.state.zDepth} 
        onMouseEnter={()=>this.setState({zDepth:4})} 
        onMouseLeave={()=>this.setState({zDepth:2})}
      >
        <p>Task Name:</p>
        <p>{this.props.taskObject.taskName}</p>
        <p>Completed: {this.props.taskObject.completed?'Yes':'No yet'}</p>
        <p>Priority: {this.props.taskObject.priority?'High':'Normal'}</p>
        <p>Due Date: { this.props.taskObject.dueDate ? this.props.taskObject.dueDate.toDateString() :'Unknown'}</p>
        <p>Defer Date: {this.props.taskObject.deferDate ?this.props.taskObject.deferDate.toDateString() :'Unknown'}</p>
        <div style={{'position':'absolute','bottom':'0','width':'100%'}}>
          <RaisedButton icon={this.props.buttonIcon}  label={this.props.buttonLabel} fullWidth={true} onTouchTap={this.props.buttonClick}/>
        </div>
      </Paper>
    )
  }




}

export default TrashTaskPaper ;