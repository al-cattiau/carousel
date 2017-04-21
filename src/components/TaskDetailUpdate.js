import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
// import Checkbox from 'material-ui/Checkbox';
// import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { disablePassDateAndDueDate, disablePassDateAndDeferDate } from '../helperFunc/datePickerHelper.js';


export default class detailUpdate  extends Component {

  updatePredictTime(){
    return(
      <div className='innercontainer'>
        <div className='text'>PredictTime</div>
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
        <div className='text'>Due date</div>
        <div className='component'>
          <DatePicker hintText='same as deadline.(optional)' 
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
        <div className='text'>Defer date</div>
        <div className='component'>
          <DatePicker hintText='date to start.(optional)' 
          defaultDate={this.props.taskObject.deferDate}
          shouldDisableDate={(date)=>disablePassDateAndDueDate(date, this.props.taskObject.dueDate)} 
          onChange={(e,date)=>this.props.setTaskDeferDate(date)} />
        </div>
      </div>  
    )
  }

  /*updateTags(){
    const checkboxes = Object.entries(this.props.tags).map( ([tagId, tagObject])=>{
      const addTag = [...this.state.tagId,tagId];
      const removeTag = this.state.tagId.filter((id)=> id!==tagId );
      return(
        <Checkbox label={tagObject.tagName} key={tagId} 
          onCheck={(e,bool)=>{ if(bool){this.setState({ tagId: addTag  }) }else{ this.setState({ tagId: removeTag  }) }  }}
        />
      ) 
    });
    return(
      <div className='innercontainer'>
        <div className='text'>Tags</div>
        <div className="component">
          {checkboxes}
        </div>
      </div>
    )
  }*/
  updateTaskName(){
    return(
      <div className='innercontainer'>
        <div className='text'>Task Name</div>
        <div className='component'>
          <TextField value={ this.props.taskObject.taskName}  hintText='any atom in your mind.' onChange={(e, text)=>this.props.editTaskName(text)}
            />
        </div>
      </div>
    )
  }

  updateDeleteButton(){
    return(
      <RaisedButton  label='delete' secondary={true} 
        onTouchTap={()=>this.props.toggleActive()}
      />
            
    )
  }

  updatePriority(){
    return(
      <div className='innercontainer'>
        <div className='text'>Priority</div>
        <div className='component'>
          <RaisedButton 
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
      <Paper style={{'margin':'20px'}} zDepth={3} >
        <div className='detailContainer'>
          {this.updateTaskName()}
          {this.updateDueDate()}
          {this.updatePriority()}
          {this.updateDeferDate()}
          {this.updatePredictTime()}
          {this.updateDeleteButton()}
        </div>
    </Paper>
    )
  }
}

          