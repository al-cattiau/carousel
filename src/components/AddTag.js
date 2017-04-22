import React, { Component } from 'react';
import InputBar from './InputBar';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import PickColor from 'material-ui/svg-icons/action/invert-colors';
import Dialog from 'material-ui/Dialog';
import { CirclePicker } from 'react-color';
import * as colorsObject from '../helperFunc/colors';

const colors = Object.entries(colorsObject).map( ([colorName, colorText], index)=> colorText );


class AddTag extends Component {
  state ={open:false}
  render(){
    return(
      <Card>
        <CardHeader
          title="Add a new Tag."
        />
        <CardActions>
          <div className='addTagContainer'>
            <div style={{'width':'70%'}}>
              <InputBar hintText={'enter tag name.'} />
            </div>
            <div style={{'width':'20%'}}>
              <FlatButton icon={<PickColor/>} onTouchTap={()=>this.setState({open:true})}/>
            </div>
          </div>
          <FlatButton label="Add" fullWidth={true} />
        </CardActions>
        <Dialog
          title="Pick a color for tag."
          modal={false}
          open={this.state.open}
          onRequestClose={()=>this.setState({open:false})}
          autoScrollBodyContent={true}
          
        >
          <div style={{marginTop:10}}> 
            <CirclePicker colors={colors} width={'100%'}/>
          </div>
        </Dialog>
      </Card>


    )
  }
}

export default AddTag;