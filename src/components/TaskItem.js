import React from 'react';
import { ListItem } from 'material-ui/List';
import Done from 'material-ui/svg-icons/action/done';
import Circle from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

const TaskItem = (props)=>{
  const { toggleDetailMode,  toggleCompleted, taskObject, taskId } = props;
  const { taskName, priority, completed } = taskObject ;
  

  const leftIcon = taskObject.detailMode ? 
    <DownArrow onTouchTap={(e)=>{toggleDetailMode(taskId);}}  /> :
    <RightArrow onTouchTap={(e)=>{ toggleDetailMode(taskId);}} />;

  const rightIcon = completed ?
    <Done onTouchTap={(e)=> toggleCompleted(taskId)} /> : 
    <Circle onTouchTap={(e)=> toggleCompleted(taskId)} />;

  const TextStyle = priority ? {'color':'red'} :null;
  return (
    <ListItem             
      primaryText={ taskName }  
      rightIcon={ rightIcon }  
      leftIcon={ leftIcon }
      style={TextStyle}
    />        
  );
}

export default TaskItem;