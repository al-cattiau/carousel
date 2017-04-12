import React, { Component } from 'react';
import InputBar from '../components/InputBar';
import FloatActionButton from '../components/FloatActionButton';
import { connect } from 'react-redux';
import Delete from 'material-ui/svg-icons/action/delete';
import DoneAll from 'material-ui/svg-icons/action/done-all';
import Undo from 'material-ui/svg-icons/content/undo';
import TaskItem from '../components/TaskItem';
import Tag from 'material-ui/svg-icons/action/label';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FloatActionButtonList from '../components/FloatActionButtonList';
import taskSelector from '../selectors/taskSelector';
import * as taskActions from '../actions/TaskActions';
import * as tagActions from '../actions/TagActions';
const actions = Object.assign({}, tagActions, taskActions);

const transitionOptions = {
      transitionName: 'fade',
      transitionEnterTimeout: 300,
      transitionLeaveTimeout: 300
    };

const FabListStyle = [
  {
    position:'fixed',
    bottom: 30,
    right: 30,
    zIndex: 100
  },
  {
    position:'fixed',
    bottom: 100,
    right: 30,
    zIndex: 100
  },
  {
    position:'fixed',
    bottom: 170,
    right: 30,
    zIndex: 100
  },

];

class Inbox extends Component {

  componentDidMount(){
    this.props.selectATask(0);
  }

  state = { editMode: false }

  componentWillUnmount(){
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

  updateButton(){
    if(!this.state.editMode){
      if(Object.keys(this.props.tasks).length === 0){
        return (
          <FloatActionButton  
            disabled={ true }
            clickFab={()=>console.log('hey')} 
            Icon={ <Undo/>} 
          />
        )
      }else{
        return(
          <FloatActionButton  
            disabled={ false } 
            clickFab={()=>console.log('hey')}
            Icon={ <Undo/>}
          />
        )
      }
    }else{
      return (
        <ul>
        <FloatActionButton  
          disabled={ false } 
          Icon={ <Tag/>}
          clickFab={()=>console.log('hey')}
          style={FabListStyle[0]}
        />
        
        <FloatActionButton  
          disabled={ false } 
          Icon={ <DoneAll/>}
          clickFab={()=>console.log('hey')}
          style={FabListStyle[1]}
        />
        <FloatActionButton  
          disabled={ false } 
          secondary={true}
          Icon={ <Delete/>}
          clickFab={()=>console.log('hey')}
          style={FabListStyle[2]}
        />
        </ul>
      )
    }
  }

  updateButtonEnable(){
    return (Object.keys(this.props.tasks).length === 0 ? false: true);
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
        {this.updateButton()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const tasks ={} 
  Object.entries(state.TaskReducer.tasks).forEach( ([taskId, taskObject]) =>{    
    if(!taskObject.completed){ tasks[taskId] = taskObject }
  });
  return { tasks, selected:taskSelector(state)  }
}

const InboxContainer = connect(mapStateToProps, actions )(Inbox);
export default InboxContainer;