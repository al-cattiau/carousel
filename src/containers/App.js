import { connect } from 'react-redux';
import React,{ Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { inInboxCount } from '../helperFunc/computeTask';
// import axios from 'axios';
import { wrap } from 'react-bounds';
import Leftlist from '../components/LeftList';
import AppBar from 'material-ui/AppBar';
import '../css/layout.css';
import '../css/animation.css';
import Sync from 'material-ui/svg-icons/notification/sync';
import SyncDisabled from 'material-ui/svg-icons/notification/sync-disabled';
import SyncProblem from 'material-ui/svg-icons/notification/sync-problem';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import DialogSign from '../components/DialogSign';
injectTapEventPlugin();
import * as signActions from '../actions/SignActions';


import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  
});

const dialogContentStyle = {
  width: '95%',
  // maxWidth: 'none',
  maxWidth: '600px',
  
}
const bodyStyle = {
  padding: 0
}

class App extends Component{
  state = {
    openList: false
  };


  static bounds(){
    return {
      'landscape':{
        minWidth: 630,
      },
    };
  }
  // componentDidMount(){
  //   console.log('------------------------------------');
  //   console.log('sd');
  //   console.log('------------------------------------');
  //   axios.get('http://localhost:3090', {
  //     headers: { authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OTBjNTQ0YjhhM2NiZjU4NTdiZTQ2M2UiLCJpYXQiOjE0OTM5ODM3Nzk1NzJ9.4jBdJ012cEa_qvrsyop6iFqOVnU_KO5WwVG2RhETlYY' }
  //   }
  //   ).then((s)=>console.log(s));
  // }

  render(){
    
    const hightLight = this.props.hightLight.split('/')[1];
    let title = hightLight;
    if (title === ''){
      title = 'Carousel';
    }
    return(
      <MuiThemeProvider muiTheme={muiTheme}>
        <div> 
          <AppBar title={title} style={{'position':'fixed'}} onTouchTap={()=>this.setState({openList:!this.state.openList})} iconElementRight={this.renderSyncIcon()} onRightIconButtonTouchTap={(e)=>this.handleSync(e)}/>
          <Leftlist tags={this.props.tags} inboxCount={this.props.inboxCount} hightLight={hightLight} isLandscape={this.props.isBound('landscape')}  openList={this.state.openList} close={()=>this.setState({openList:false})} />
          <div className="appContent">
            {this.props.children}
          </div>
          {this.renderDialog() }
          
        </div>        
      </MuiThemeProvider>
    )
  }

  renderDialog(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={()=>this.props.closeSignDialog()}
      />,
      <FlatButton
        label="Yes"
        primary={true}
        onTouchTap={()=>{this.props.signOutAndCloseDialog();localStorage.setItem('token','out')}}
      />,
    ];
    if(this.props.isSignIn){
      return (
        <Dialog
          actions={actions}
          modal={false}
          open={this.props.openSign || false}
          onRequestClose={()=>this.props.closeSignDialog()}
        >
          You alread sign in, would you like to sign out ?
        </Dialog>
      )

    }else{
      return (
        <Dialog
          modal={false}
          open={this.props.openSign || false}
          onRequestClose={()=>this.props.closeSignDialog()}
          contentStyle={dialogContentStyle}
          bodyStyle={bodyStyle}
        >
          <DialogSign />
        </Dialog>
      )


    }
    
  }

  renderSyncIcon(){
    if(!this.props.isSignIn){
      return <FlatButton icon={<SyncDisabled/>}/>
    }else if(!this.props.syncSuccessful){
      return <FlatButton icon={<SyncProblem/>}/>
    }else{
      return <FlatButton icon={<Sync/>}/>
    }
    
  }

  handleSync(e){
    e.stopPropagation();
    this.props.openSignDialog();    
    
  }
}



const mapStateToProps = (state) => {
  return {
    hightLight: state.routing.locationBeforeTransitions.pathname,
    tags: state.TagReducer.tags,
    inboxCount: inInboxCount(state),
    openSign: state.SignReducer.openSign,
    syncSuccessful: state.SignReducer.syncSuccessful,
    isSignIn: state.SignReducer.isSignIn,
  };
};

const wrapApp = wrap(App);

const wrapAppContainer = connect(mapStateToProps, signActions)(wrapApp);
export default wrapAppContainer;




