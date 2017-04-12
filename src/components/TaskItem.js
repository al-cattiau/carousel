import React, {Component} from 'react';
import { ListItem } from 'material-ui/List';
import Done from 'material-ui/svg-icons/action/done';
import Circle from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

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

  render(){
    const { toggleDetailMode,toggleEditMode, toggleCompleted, taskObject, taskId } = this.props;
    const { taskName, priority, completed } = taskObject ;
    const leftIcon = taskObject.detailMode ? 
      <DownArrow /> :
      <RightArrow />;

    const rightIcon = completed ?
      <Done 
      onMouseDown={(e)=> { e.stopPropagation(); toggleCompleted(taskId)} }
      onMouseUp={(e)=>{ e.stopPropagation();} }
      /> : 
      <Circle onMouseDown={(e)=>{ e.stopPropagation(); toggleCompleted(taskId)} }
        onMouseUp={(e)=>{ e.stopPropagation();} }
      />;

    let style = priority ? {'color':'red'} : { } ;
    if (completed){ 
      style.backgroundColor= '#E0E0E0';
    }
    return (
      <ListItem             
        primaryText={ taskName }  
        rightIcon={ rightIcon }  
        leftIcon={ leftIcon }
        style={style}
        onMouseDown={(e)=>{ e.stopPropagation(); this.handleLongPressDown(e, taskId, toggleEditMode);}}
        onMouseUp={(e)=>{  e.stopPropagation(); this.handleLongPressUp(e, taskId, toggleDetailMode);}}
      />   
    );

  }

}


export default TaskItem;