import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import * as tagActions from '../actions/TagActions';
import PickColor from 'material-ui/svg-icons/action/invert-colors';
import Dialog from 'material-ui/Dialog';
import { CirclePicker } from 'react-color';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import computeResidueColors from '../helperFunc/computeResidueColors';




class AddTag extends Component {
  state ={openDialog:false, tagText: '', tagColor:null}
  render(){
    return(
      <Card>
        <CardHeader
          title="Add a new Tag."
        />
        <CardActions>
          <div className='addTagContainer'>
            <TextField style={{'width':'60%'}} onChange={(e, text)=>this.setState({tagText:text})} hintText={'enter tag name.'} />
            <FlatButton style={{'width':'20%'}} backgroundColor={this.state.tagColor|| 'white'}  icon={<PickColor/>} onTouchTap={()=>this.setState({openDialog:true})}/>
          </div>
          <FlatButton label="Add" fullWidth={true} disabled={this.state.tagText===''||this.state.tagColor===null} onTouchTap={()=>this.handleSubmit()} />
        </CardActions>
        <Dialog
          title="Pick a color for tag."
          modal={false}
          open={this.state.openDialog}
          onRequestClose={()=>this.setState({openDialog:false})}
          autoScrollBodyContent={true}
        >
          <div style={{marginTop:10}}> 
            <CirclePicker onChange={(color)=>{this.setState({tagColor:color.hex, openDialog:false}) } }colors={this.props.colorsTextArray} width={'100%'}/>
          </div>
        </Dialog>
      </Card>
    )
  }


  handleSubmit(){
    this.props.addTag(this.state.tagText, this.state.tagColor);
    browserHistory.push('/Tag'); 
    
  }
}



const mapStateToProps =(state)=>{
  const colorsTextArray = computeResidueColors(state);
  return ({
    colorsTextArray
  }
  )
}

const AddTagContainer = connect(mapStateToProps, tagActions)(AddTag);
export default AddTagContainer;