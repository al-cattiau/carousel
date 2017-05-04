import { connect } from 'react-redux';
import React,{ Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { inInboxCount } from '../helperFunc/computeTask';
import { wrap } from 'react-bounds';
import Leftlist from '../components/LeftList';
import AppBar from 'material-ui/AppBar';
import '../css/layout.css';
import '../css/animation.css';
import Sync from 'material-ui/svg-icons/notification/sync';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import DialogSign from '../components/DialogSign';
injectTapEventPlugin();



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
    open: false,
    openList: false
  };


  static bounds(){
    return {
      'landscape':{
        minWidth: 630,
      },
    };
  }
  render(){
    
    const hightLight = this.props.hightLight.split('/')[1];
    let title = hightLight;
    if (title === ''){
      title = 'Carousel';
    }
    return(
      <MuiThemeProvider muiTheme={muiTheme}>
        <div> 
          <AppBar title={title} style={{'position':'fixed'}} onTouchTap={()=>this.setState({openList:!this.state.openList})} iconElementRight={<FlatButton icon={<Sync/>}/>} onRightIconButtonTouchTap={(e)=>this.handleSync(e)}/>
          <Leftlist tags={this.props.tags} inboxCount={this.props.inboxCount} hightLight={hightLight} isLandscape={this.props.isBound('landscape')}  openList={this.state.openList} close={()=>this.setState({openList:false})} />
          <div className="appContent">
            {this.props.children}
          </div>
          <Dialog
            modal={false}
            open={this.state.open}
            onRequestClose={()=>this.setState(({open:!this.state.open}))}
            contentStyle={dialogContentStyle}
            bodyStyle={bodyStyle}
          >
          <DialogSign />
        </Dialog>
          
        </div>        
      </MuiThemeProvider>
    )
  }

  handleSync(e){
    e.stopPropagation();
    this.setState(({open:!this.state.open}));
    
  }
}



const mapStateToProps = (state) => {
  return {
    hightLight: state.routing.locationBeforeTransitions.pathname,
    tags: state.TagReducer.tags,
    inboxCount: inInboxCount(state),
  };
};

const wrapApp = wrap(App);

const wrapAppContainer = connect(mapStateToProps )(wrapApp);
export default wrapAppContainer;




