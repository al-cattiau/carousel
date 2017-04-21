import React, {Component} from 'react';
import { ListItem } from 'material-ui/List';
import Circle from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import Done from 'material-ui/svg-icons/action/done';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import TaskDetailSetup from './TaskDetailSetup';

let longPress = false;
class TaskItem  extends Component {
  state = { bePressed: false, completed: false }
  handleLongPressUp(e, taskId, toggleDetailMode){
    if(this.timer){
      toggleDetailMode(taskId);
      clearTimeout(this.timer);      
    } 
    longPress= false;
  }

  handleDeiatilSubmit(detailObject){
    const { priority, taskName, tagId, dueDate, deferDate, predictTime  } = detailObject;
    const {  togglePriority, associateTaskWithTag, setPredictTime, setTaskDeferDate, setTaskDueDate, toggleDetailMode, editTaskName, taskObject, taskId } = this.props;
    editTaskName(taskId, taskName);
    if(priority !== taskObject.priority){
      togglePriority(taskId);
    }
    if(tagId.length>0){
      tagId.forEach((id)=> associateTaskWithTag(id, taskId) )
    }
    if(dueDate){
      setTaskDueDate(taskId, dueDate);
    }

    if(deferDate){
      setTaskDeferDate(taskId, deferDate);
    }

    if(predictTime){
      setPredictTime(taskId, predictTime);
    }

    toggleDetailMode();

  }
  handleLongPressDown(e, taskId, toggleEditMode, selectId){
    longPress= true;
    this.timer = setTimeout( ()=>{
      clearTimeout(this.timer);     
      if (longPress === true){
        longPress=false;
        toggleEditMode();
        selectId(taskId);
        this.timer = null;
      }
    }, 400);
  }
  detail(isDetailList){
    if (isDetailList){
      const { tags, taskId, taskObject } = this.props;
      return(
        <TaskDetailSetup tags={tags} 
          taskId={taskId} taskObject={taskObject}  
          handleDeiatilSubmit={(detailObject)=>this.handleDeiatilSubmit(detailObject)}
        />
      )
    }else{
      return null;
    }
  }

  render(){
    const { toggleDetailMode, selectId, toggleEditMode, isDetailList, completeTask, taskObject, taskId } = this.props;
    const { taskName, priority } = taskObject ;
    const leftIcon = isDetailList ? 
      <DownArrow /> :
      <RightArrow />;
    const rightIcon = this.state.completed ? 
    <Done/> :
      <Circle onMouseDown={(e)=>{ e.stopPropagation(); this.setState({completed:true}); completeTask(taskId)} }
        onMouseUp={(e)=>{ e.stopPropagation();} }
      /> ;
    let style = priority ? {'color':'#B71C1C'} : null;
    return (
      <div>
        <ListItem             
          primaryText={ taskName }  
          rightIcon={ rightIcon }  
          leftIcon={ leftIcon }
          style={style}
          onMouseDown={(e)=>{ e.stopPropagation(); this.handleLongPressDown(e, taskId, toggleEditMode, selectId);}}
          onMouseUp={(e)=>{  e.stopPropagation(); this.handleLongPressUp(e, taskId, toggleDetailMode);}}
        />
        {this.detail(isDetailList)}
      </div>
    );
  }
}


export default TaskItem;