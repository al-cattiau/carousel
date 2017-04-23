import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { disablePassDateAndDueDate, disablePassDateAndDeferDate } from '../helperFunc/datePickerHelper.js';
const textFieldStyle = {
  width: 180
};

export default class detailSetup  extends Component {
  constructor(props){
    super(props);
    const { taskName, priority } = this.props.taskObject;
    this.state={ taskName, priority, tagId: [], dueDate:null, deferDate: null, predictTime: null }
      
  }


  updatePredictTime(){
    return(
      <div className='innercontainer'>
        <div className='text'>predict time</div>
        <div className='component'>
          <RadioButtonGroup name="shipSpeed" valueSelected={this.state.predictTime} onChange={(e,value)=>this.setState({predictTime:value})}>
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
          <DatePicker textFieldStyle={textFieldStyle} hintText='same as deadline.' shouldDisableDate={(date)=>disablePassDateAndDeferDate(date, this.state.deferDate)} onChange={(e,date)=>this.setState({dueDate:date})} />
        </div>
      </div>
    )
  }

  updateDeferDate(){
    return(
      <div className='innercontainer'>
        <div className='text'>defer date</div>
        <div className='component'>
          <DatePicker textFieldStyle={textFieldStyle} hintText='date to start.' shouldDisableDate={(date)=>disablePassDateAndDueDate(date, this.state.dueDate)} onChange={(e,date)=>this.setState({deferDate:date})} />
        </div>
      </div>  
    )
  }

  updateTags(){
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
        <div className='text'>tags</div>
        <div className="component">

          {checkboxes.length <1? 'Please add the Tag first.':checkboxes }
        </div>
      </div>
    )
  }
  updateTaskName(){
    return(
      <div className='innercontainer'>
        <div className='text'>task name</div>
        <div className='component'>
          <TextField style={textFieldStyle} value={ this.state.taskName}  hintText='any atom in your mind.' onChange={(e, text)=>this.setState({taskName:text})}
            />
        </div>
      </div>
    )
  }

  updateSubmit(){
    const disabled = this.state.taskName ==='' || (this.state.tagId.length === 0) ? true: false;
    return(
      <RaisedButton  label='submit' fullWidth={true} disabled={disabled} onTouchTap={()=>this.props.handleDeiatilSubmit(this.state)}/>
    )
  }

  updatePriority(){
    return(
      <div className='innercontainer'>
        <div className='text'>Priority</div>
        <div className='component'>
          {this.state.priority?
            <RaisedButton label="high" secondary={true} fullWidth={true} onTouchTap={()=>this.setState({priority:false})}/>:
            <RaisedButton label="normal" primary={true} fullWidth={true} onTouchTap={()=>this.setState({priority:true})}/>
            }      
        </div>
      </div>
    )
  }

  render(){
    return (
      <Paper style={{'margin':'5px'}} zDepth={3} >
        <div className='detailContainer'>
          {this.updateTaskName()}
          {this.updateTags()}
          {this.updateDueDate()}
          {this.updatePriority()}
          {this.updateDeferDate()}
          {this.updatePredictTime()}
        </div>
        {this.updateSubmit()}
    </Paper>
    )
  }
}

          