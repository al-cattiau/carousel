import React, { Component } from 'react';
import InputBar from '../components/InputBar';
import FloatActionButton from '../components/FloatActionButton';
import { connect } from 'react-redux';
import Clear from 'material-ui/svg-icons/communication/clear-all';
import TaskItem from '../components/TaskItem';
import * as taskActions from '../actions/TaskActions';
import * as tagActions from '../actions/TagActions';
const actions = Object.assign({}, tagActions, taskActions);

class Inbox extends Component {

  componentWillUnmount(){
    
  }

  componentWillReceiveProps(nextProps, nextState){        
    this.allTask = Object.entries(nextProps.tasks).map( ([taskId, taskObject]) =>
        <TaskItem 
          key={taskId} 
          taskObject={ taskObject} 
          taskId={ taskId} 
          toggleDetailMode={ (taskId)=>nextProps.toggleDetailMode(taskId) } 
          toggleCompleted={ (taskId)=>nextProps.toggleCompleted(taskId) }
        />
      )
    }
  render(){
    return (
      <div>
        {this.allTask}
        <InputBar 
          callBack={(text)=>{ this.props.addTask(text) } }
          hintText="Type any stuff in your mind." 
        />
        <FloatActionButton clickFab={(a)=>{console.log(a)}} Icon={<Clear/>} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.TaskReducer.tasks
  }
}

const InboxContainer = connect(mapStateToProps, actions )(Inbox);
export default InboxContainer;