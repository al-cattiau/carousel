import React, { Component } from 'react';
import InputBar from '../components/InputBar';
import FloatActionButton from '../components/FloatActionButton';
import { connect } from 'react-redux';
import Delete from 'material-ui/svg-icons/action/delete';
import Undo from 'material-ui/svg-icons/content/undo';
import TaskItem from '../components/TaskItem';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import taskSelector from '../selectors/taskSelector';
import * as taskActions from '../actions/TaskActions';
import * as tagActions from '../actions/TagActions';
const actions = Object.assign({}, tagActions, taskActions);

const transitionOptions = {
      transitionName: 'fade',
      transitionEnterTimeout: 300,
      transitionLeaveTimeout: 300
    };

class Inbox extends Component {

  componentDidMount(){
    this.props.selectATask(0);
  }

  state = { editMode: false }

  componentWillUnmount(){
    this.props.archiveAll();
  }

  toggleEditMode(){

    this.setState({ editMode: !this.state.editMode });
  }

  updateTask(){
    return Object.entries(this.props.tasks).map( ([taskId, taskObject]) =>
        <TaskItem 
          key={taskId} 
          taskObject={ taskObject} 
          taskId={ taskId} 
          toggleDetailMode={ (taskId)=>this.props.toggleDetailMode(taskId) } 
          toggleCompleted={ (taskId)=>this.props.toggleCompleted(taskId) }
          toggleEditMode={ ()=>this.toggleEditMode()}
        />
      )
  }

  updateButtonEnable(){
    return (Object.keys(this.props.unArchiveTask).length === 0 ? false: true);
  }
  render(){
    return (
      <div>
        <ReactCSSTransitionGroup {...transitionOptions}>
          {this.updateTask()}
        </ReactCSSTransitionGroup>
        <InputBar 
          callBack={(text)=>{ this.props.addTask(text) } }
          hintText="Type any stuff in your mind." 
        />
        <FloatActionButton  
          secondary={ this.state.editMode }
          disabled={!this.updateButtonEnable() && !this.state.editMode} 
          clickFab={()=>{ this.props.archiveAll() }} 
          Icon={ this.state.editMode ? <Delete/> : <Undo/>} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const tasks ={} 
  Object.entries(state.TaskReducer.tasks).forEach( ([taskId, taskObject]) =>{    
    if(!taskObject.archived){ tasks[taskId] = taskObject }
  });
  const unArchiveTask = {}
  Object.entries(state.TaskReducer.tasks).forEach( ([taskId, taskObject]) =>{    
    if(!taskObject.archived && taskObject.completed){ unArchiveTask[taskId] = taskObject }
  });

  return { tasks, unArchiveTask, selected:taskSelector(state)  }
}

const InboxContainer = connect(mapStateToProps, actions )(Inbox);
export default InboxContainer;