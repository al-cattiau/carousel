import TextField from 'material-ui/TextField';
import React from 'react';


const ENTER_KEY = 13;


class Inputbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: props.text || '',
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleKeyDown(e){
    if (e.keyCode !== ENTER_KEY) {
      return;
    }
      
    const noSpaceText = this.state.text.split('').filter( (char)=>{
      return char !== ' ';
    });

    if(noSpaceText.length <1){
      return;
    }
    if(noSpaceText.length===1 && noSpaceText[0]==='#'){
      return;
    }
    e.preventDefault();
    this.props.callBack(this.state.text);
    this.setState({
      text: ''
    });
  }
  handleTextChange(e){
    this.setState({
      text:e.target.value
    });
  }
  render(){
    return (
      <div style={{'width':'95%','margin':'0 auto'}}>
        <TextField 
          hintText={this.props.hintText}
          onKeyDown={(e)=>this.handleKeyDown(e)}
          onChange={(e)=>this.handleTextChange(e)}
          value={this.state.text}
          fullWidth={true}
        />
      </div>
    );}
}

export default Inputbar ;