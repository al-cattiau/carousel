import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';



export default class detailSetup  extends Component {
  

  constructor(props){
    super(props);
    const { taskName, priority } = this.props.taskObject;
    this.state={ taskName, priority, tagId: [], dueDate:null, deferDate: null, predictTime: null }
    this.menuItems = Object.entries(this.props.tags).map( ([tagId, tagObject])=>
      <MenuItem key={tagId} value={tagId} primaryText={tagObject.tagName} />
    );
      
  }

  disablePassDate(date){
    const today = new Date();
    return ( (date.getDate() < today.getDate() && date.getMonth() === today.getMonth()) || date.getMonth() < today.getMonth());
  }

  disablePassDateAndDueDate(date){
    const dueDate = this.state.dueDate;
    if(dueDate){
      return ( (date.getDate() > dueDate.getDate() && date.getMonth() === dueDate.getMonth()) || date.getMonth() > dueDate.getMonth() ) || this.disablePassDate(date);
    }else{
      return this.disablePassDate(date);
    }    
  }
  disablePassDateAndDeferDate(date){
    const deferDate = this.state.deferDate;
    if(deferDate){
      return ( (date.getDate() < deferDate.getDate() && date.getMonth() === deferDate.getMonth()) || date.getMonth() < deferDate.getMonth() ) || this.disablePassDate(date);
    }else{
      return this.disablePassDate(date);
    }


  }

  componentWillUnmount(){
  }

  updatePredictTime(){
    return(
      <div className='innercontainer'>
        <div className='text'>PredictTime</div>
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
        <div className='text'>Due date</div>
        <div className='component'>
          <DatePicker hintText="same as deadline.(optional)" shouldDisableDate={(date)=>this.disablePassDateAndDeferDate(date)} onChange={(e,date)=>this.setState({dueDate:date})} />
        </div>
      </div>
    )
  }

  updateDeferDate(){
    return(
      <div className='innercontainer'>
        <div className='text'>Defer date</div>
        <div className='component'>
          <DatePicker hintText="date to start.(optional)" shouldDisableDate={(date)=>this.disablePassDateAndDueDate(date)} onChange={(e,date)=>this.setState({deferDate:date})} />
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
        <div className='text'>Tags</div>
        <div className="component">
          {checkboxes}
        </div>
      </div>
    )
  }
  updateTaskName(){
    return(
      <div className='innercontainer'>
        <div className='text'>Task Name</div>
        <div className='component'>
          <TextField value={ this.state.taskName}  hintText='any atom in your mind.' onChange={(e, text)=>this.setState({taskName:text})}
            />
        </div>
      </div>
    )
  }

  updateSubmit(){
    const disabled = this.state.taskName ==='' ? true: false;
    return(
      <RaisedButton  label="submit" fullWidth={true} disabled={disabled} onTouchTap={()=>this.props.handleDeiatilSubmit(this.state)}/>
    )
  }


  


  updatePriority(){
    if(this.state.priority){
      return(
        <div className='innercontainer'>
          <div className='text'>Priority</div>
          <div className='component'>
            <RaisedButton label="high" secondary={true} fullWidth={true} onTouchTap={()=>this.setState({priority:false})}/>
          </div>
        </div>
      )
    }else{
      return(
        <div className='innercontainer'>
          <div className='text'>Priority</div>
          <div className='component'>
            <RaisedButton label="normal" primary={true} fullWidth={true} onTouchTap={()=>this.setState({priority:true})}/>
          </div>
        </div>
      )
    }
    
  }

  render(){
    return (
      <Paper style={{'margin':'2px'}} zDepth={3}>
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

          