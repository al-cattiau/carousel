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

injectTapEventPlugin();

class App extends Component{

  static bounds(){
    return {
      'landscape':{
        minWidth: 630,
      },
    };
  }
  state={openList:false}
  render(){
    const hightLight = this.props.hightLight.split('/')[1];
    let title = hightLight.substr(1,hightLight.length-1);
    if (title === ''){
      title = 'Carousel';
    }
    return(
      <MuiThemeProvider>
        <div> 
          <AppBar title={title} style={{'position':'fixed'}} onTouchTap={()=>this.setState({openList:!this.state.openList})}/>
          <Leftlist inboxCount={this.props.inboxCount} hightLight={hightLight} isLandscape={this.props.isBound('landscape')}  openList={this.state.openList} close={()=>this.setState({openList:false})} />
          <div className="appContent">
            {this.props.children}
          </div>
        </div>        
      </MuiThemeProvider>
    )
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




