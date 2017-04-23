import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { disablePassDateAndDueDate, disablePassDateAndDeferDate } from '../helperFunc/datePickerHelper.js';
import FlatButton from 'material-ui/FlatButton';
import Done from 'material-ui/svg-icons/action/done';

const textFieldStyle = {
  width: 180
};



export default class detailUpdate  extends Component {

  updatePredictTime(){
    return(
      <div className='innercontainer'>
        <div className='text'>predict time</div>
        <div className='component'>
          <RadioButtonGroup name="shipSpeed" valueSelected={this.props.taskObject.predictTime} onChange={(e,value)=>this.props.setPredictTime(value)}>
            <RadioButton
              value='0'
              label="short(< 20 minutes.)"        
            />
            <RadioButton
              value='1'
              label="middle"        
            />
            <RadioButton
              value='2'
              label="long(> 1 hours.)"        
            />
          </RadioButtonGroup>
        </div>
      </div>     
    )

  }

  updateDueDate(){
    return(
      <div className='innercontainer'>
        <div className='text'>due date</div>
        <div className='component'>
          <DatePicker hintText='same as deadline.' 
          textFieldStyle={textFieldStyle}
          defaultDate={this.props.taskObject.dueDate}
          shouldDisableDate={(date)=>disablePassDateAndDeferDate(date, this.props.taskObject.deferDate)} 
            onChange={(e,date)=>this.props.setTaskDueDate(date)} />
        </div>
      </div>
    )
  }

  updateDeferDate(){
    return(
      <div className='innercontainer'>
        <div className='text'>defer date</div>
        <div className='component'>
          <DatePicker hintText='date to start.' 
          textFieldStyle={textFieldStyle}
          defaultDate={this.props.taskObject.deferDate}
          shouldDisableDate={(date)=>disablePassDateAndDueDate(date, this.props.taskObject.dueDate)} 
          onChange={(e,date)=>this.props.setTaskDeferDate(date)} />
        </div>
      </div>  
    )
  }

  updateTags(){
    const taskId= this.props.taskId
    const checkboxes = Object.entries(this.props.tags).map( ([tagId, tagObject])=>{
      const inTag = tagObject.tasks.includes(this.props.taskId); 
      return(
        <Checkbox label={tagObject.tagName} key={tagId} 
          onCheck={(e,bool)=>{
            if(bool){
              this.props.associateTaskWithTag(tagId, taskId);
              }else{
              this.props.de_associateTaskWithTag(tagId, taskId);
              }
              }
            }
          checked={inTag}
        />
      ) 
    });
    return(
      <div className='innercontainer'>
        <div className='text'>tags</div>
        <div className="component">
          {checkboxes}
        </div>
      </div>
    )
  }
  updateTaskName(){
    return(
      <div className='innercontainer'>
        <div className='text'>task name</div>
        <div className='component'>
          <TextField style={textFieldStyle} value={ this.props.taskObject.taskName}  hintText='any atom in your mind.' onChange={(e, text)=>this.props.editTaskName(text)}
            />
        </div>
      </div>
    )
  }

  updateDeleteButton(){
    return(
      <RaisedButton label='delete' secondary={true} 
        onTouchTap={()=>this.props.toggleActive()}
      />
            
    )
  }

  updateCompleteButton(){
    return(
      <FlatButton icon={<Done />} primary={true} 
        onTouchTap={()=>this.props.toggleCompleted()}
      />
            
    )
  }

  updatePriority(){
    return(
      <div className='innercontainer'>
        <div className='text'>priority</div>
        <div className='component'>
          <FlatButton 
          label={this.props.taskObject.priority?'high':'normal'} 
          secondary={this.props.taskObject.priority?true:false} 
          primary={this.props.taskObject.priority?false:true} 
          fullWidth={true} onTouchTap={()=>this.props.togglePriority()  }/>
        </div>
      </div>
    )
  }

  render(){
    return (
      <Paper zDepth={3} >
        <div className='detailContainer'>
          {this.updateTaskName()}
          {this.updateDueDate()}
          {this.updatePriority()}
          {this.updateDeferDate()}
          {this.updatePredictTime()}
          {this.updateTags()}
          <div className='actionContainer'>
            {this.updateDeleteButton()}
            {this.updateCompleteButton()}
          </div>
        </div>
    </Paper>
    )
  }
}

          