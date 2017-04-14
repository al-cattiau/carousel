import React, {Component} from 'react';
import { ListItem } from 'material-ui/List';
import Circle from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import Paper from 'material-ui/Paper';

let longPress = false;
class TaskItem  extends Component {
  state = { bePressed: false }
  handleLongPressUp(e, taskId, toggleDetailMode){
    if(this.timer){
      toggleDetailMode(taskId);
      clearTimeout(this.timer);      
    } 
    longPress= false;
  }
  handleLongPressDown(e, taskId, toggleEditMode){
    longPress= true;
    this.timer = setTimeout( ()=>{
      clearTimeout(this.timer);     
      if (longPress === true){
        longPress=false;
        toggleEditMode();
        this.timer = null;
      }
    }, 400);
  }
  detail(isDetailList){
    if (isDetailList){
      return(
        <Paper style={{'height':'200px'}} />
      )
    }else{
      return null;
    }
  }
  render(){
    const { toggleDetailMode, toggleEditMode, isEditMode, isDetailList, toggleCompleted, taskObject, taskId } = this.props;
    const { taskName, priority } = taskObject ;
    const leftIcon = isDetailList ? 
      <DownArrow /> :
      <RightArrow />;
    const rightIcon = 
      <Circle onMouseDown={(e)=>{ e.stopPropagation(); toggleCompleted(taskId)} }
        onMouseUp={(e)=>{ e.stopPropagation();} }
      />;
    let style = priority ? {'color':'red'} : null;
    return (
      <div>
        <ListItem             
          primaryText={ taskName }  
          rightIcon={ rightIcon }  
          leftIcon={ leftIcon }
          style={style}
          onMouseDown={(e)=>{ e.stopPropagation(); this.handleLongPressDown(e, taskId, toggleEditMode);}}
          onMouseUp={(e)=>{  e.stopPropagation(); this.handleLongPressUp(e, taskId, toggleDetailMode);}}
        />
        {this.detail(isDetailList)}
      </div>
    );
  }
}


export default TaskItem;