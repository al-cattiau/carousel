import React, { Component } from 'react';
import InputBar from '../components/InputBar';
import { connect } from 'react-redux';
import Delete from 'material-ui/svg-icons/action/delete';
import DoneAll from 'material-ui/svg-icons/action/done-all';
import Undo from 'material-ui/svg-icons/content/undo';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import TaskItem from '../components/TaskItem';
import Tag from 'material-ui/svg-icons/action/label';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FloatActionButtonList from '../components/FloatActionButtonList';
import taskSelector from '../selectors/taskSelector';
import * as taskActions from '../actions/TaskActions';
import * as tagActions from '../actions/TagActions';
const actions = Object.assign({}, tagActions, taskActions);



const transitionOptionsMaker = (name)=>({
  transitionName: name,
  transitionEnterTimeout: 300,
  transitionLeaveTimeout: 300

})


class Inbox extends Component {

  constructor(props) {
    super(props);
    this.state = { editMode: false, detailList: null };
    this.buttonsInEditMode = [
      { Icon: <Cancel/>, callback: ()=>this.setState({editMode:false}) , backgroundColor: "#F50057"  }, 
      { Icon: <Delete />, callback:  props.deleteTasks , secondary:true },
      { Icon: <DoneAll />, callback: props.completeTasks },
    ];
    
    this.buttonsInNormal = [
       { Icon: <Undo/>, callback: ()=>console.log('ss')  }, 
    ]
  }

  componentDidMount(){
    this.props.addTag("hello", "#D500F9");
    this.props.addTag("key", "#FFEB3B");
    this.props.addTag("nerd", "#3F51B5");

  }


  componentWillUnmount(){
    
  }

  toggleEditMode(){
    this.setState({
       editMode: !this.state.editMode,
       detailList: null
    });
  }

  updateTask(){
    return Object.entries(this.props.tasks).map( ([taskId, taskObject]) =>
        <TaskItem 
          key={taskId} 
          taskObject={ taskObject} 
          taskId={ taskId }
          isEditMode={this.state.editMode} 
          isDetailList={ taskId === this.state.detailList }
          toggleDetailMode={ (taskId)=>{if(taskId===this.state.detailList){this.setState({detailList:null})}else{ this.setState({detailList: taskId})}} }
          toggleCompleted={ (taskId)=>this.props.toggleCompleted(taskId) }
          toggleEditMode={ ()=>this.toggleEditMode()}
        />
      )
  }

  updateButton(){
    if(!this.state.editMode){
      return (
        <FloatActionButtonList buttons={this.buttonsInNormal}/>
      )
    }else{
      this.tagsButton = Object.entries(this.props.tags).map(
       ([tagId, tag]) => ({ Icon: <Tag/>, callback: ()=>this.setState({editMode:false}) , backgroundColor: tag.color })
      );
      return (
        <FloatActionButtonList buttons={[...this.buttonsInEditMode, ...this.tagsButton]}/>
      )
    }
  }

  handleAddTask(text){
    if (text.indexOf('#') === text.length-1){
      const pureText = text.substr(0,text.length-1)
       this.props.addPriorityTask(pureText,this.props.nextTaskId );
    }else{
      this.props.addTask(text);
    }

  }

  updateInputBar(){
    if(this.state.editMode){
      return null;
    }else{
      return (
        <InputBar 
          callBack={(text)=>{ this.handleAddTask(text) } }
          hintText="Type any stuff in your mind." 
        />
      )
    } 
  }

  render(){
    return (
      <div>
        <ReactCSSTransitionGroup {...transitionOptionsMaker('fade')}>
          {this.updateTask()}
        </ReactCSSTransitionGroup>
          {this.updateInputBar()}
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
  const tags=state.TagReducer.tags;
  const nextTaskId = state.TaskReducer.nextTaskId;
  return { tasks, selected:taskSelector(state), tags, nextTaskId  }
}

const InboxContainer = connect(mapStateToProps, actions )(Inbox);
export default InboxContainer;