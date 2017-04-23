import React, { Component } from 'react';
import InputBar from '../components/InputBar';
import { connect } from 'react-redux';
import Delete from 'material-ui/svg-icons/action/delete';
import DoneAll from 'material-ui/svg-icons/action/done-all';
import Undo from 'material-ui/svg-icons/content/undo';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import TaskItem from '../components/TaskItem';
import Tag from 'material-ui/svg-icons/action/label';
import Priority from 'material-ui/svg-icons/notification/priority-high';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FloatActionButtonList from '../components/FloatActionButtonList';
import taskSelector from '../selectors/taskSelector';
import * as taskActions from '../actions/TaskActions';
import * as tagActions from '../actions/TagActions';
import { inInbox } from '../helperFunc/computeTask';
import { ListItem } from 'material-ui/List';
const actions = Object.assign({}, tagActions, taskActions);


const transitionOptionsMaker = (name)=>({
  transitionName: name,
  transitionEnterTimeout: 300,
  transitionLeaveTimeout: 300

})

const hightlightedStyle= {
  backgroundColor: '#E0E0E0'
}

class Inbox extends Component {

  constructor(props) {
    super(props);
    this.state = { editMode: false, detailList: null };
  }

  componentDidMount(){
    // this.props.addTag("hello", "#D500F9");
    // this.props.addTag("key", "#FFEB3B");
    // this.props.addTag("nerd", "#3F51B5");

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
    if (this.state.editMode){
      return Object.entries(this.props.tasks).map( ([taskId, taskObject]) =>{
        let style = this.props.selectedTaskId.includes(taskId) ? hightlightedStyle: {};
        style = taskObject.priority ? Object.assign({'color':'#B71C1C'}, style ) : style;
        return(
          <ListItem
            key={taskId}
            primaryText={ taskObject.taskName }
            onMouseDown={()=>this.props.toggleSelectATask(taskId)}
            style={style}
          />
        )
      }
      )
    }else{
      return Object.entries(this.props.tasks).map( ([taskId, taskObject]) =>
        <TaskItem 
          key={taskId} 
          taskObject={ taskObject} 
          tags={this.props.tags}
          taskId={ taskId }
          selectId={()=>this.props.selectATask(taskId)}
          isDetailList={ taskId === this.state.detailList }
          editTaskName={(id, taskName)=>this.props.editTaskName(id, taskName)}
          togglePriority={(id)=> this.props.togglePriority(id) }
          setTaskDueDate={(id, dueDate)=>this.props.setTaskDueDate(id, dueDate)}
          setTaskDeferDate={(id, deferDate)=>this.props.setTaskDeferDate(id, deferDate)}
          associateTaskWithTag={(id, taskId)=>this.props.associateTaskWithTag(id, taskId)}
          toggleDetailMode={ (taskId)=>{if(taskId===this.state.detailList){this.setState({detailList:null})}else{ this.setState({detailList: taskId})}} }
          completeTask={ (taskId)=>this.props.completeTask(taskId) }
          toggleEditMode={ ()=>this.toggleEditMode()}
          setPredictTime={(taskId, predictTime)=>this.props.setPredictTime(taskId, predictTime)}
        />
      )
    }
  }

  updateButton(){
    this.buttonsInEditMode = [
      { Icon: <Cancel/>, callback: ()=>{this.setState({editMode:false});this.props.clearSelectedTask(); } , backgroundColor: "#F50057"  }, 
      { Icon: <Delete />, callback:  ()=>{this.props.toggleActives(this.props.selectedTaskId);this.props.clearSelectedTask(); }, secondary:true },
      { Icon: <DoneAll />, callback: ()=>{this.props.completeTasks(this.props.selectedTaskId); this.props.clearSelectedTask(); }},
      { Icon: <Priority />, callback: ()=> this.props.priorityTasks(this.props.selectedTaskId) , backgroundColor: '#B71C1C'},
       
    ];
    
    this.buttonsInNormal = [
       { Icon: <Undo/>, callback: ()=>console.log('ss')  }, 
    ];
    if(!this.state.editMode){
      return (
        <FloatActionButtonList buttons={this.buttonsInNormal}/>
      )
    }else{
      this.tagsButton = Object.entries(this.props.tags).map(
       ([tagId, tag]) => ({ Icon: <Tag/>, callback: ()=>this.props.associateTasksWithTag(tagId, this.props.selectedTaskId) , backgroundColor: tag.color })
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
  const tasks = inInbox(state);
  const tags=state.TagReducer.tags;
  const nextTaskId = state.TaskReducer.nextTaskId;
  const selectedTaskId = state.TaskReducer.selectedTaskId;
  return { tasks, selected:taskSelector(state), tags, nextTaskId, selectedTaskId  }
}

const InboxContainer = connect(mapStateToProps, actions )(Inbox);
export default InboxContainer;