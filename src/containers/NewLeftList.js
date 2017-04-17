import React, { Component, PropTypes } from 'react';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import Archive from 'material-ui/svg-icons/content/archive';
import Delete from 'material-ui/svg-icons/action/delete';
import Tag from 'material-ui/svg-icons/action/label';
import Forecast from 'material-ui/svg-icons/notification/event-note';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';


class Leftlist extends Component{
  state= {open:true}
  constructor(props){
    super(props);
    this.items = [
      {icon:<ContentInbox />,text:'Inbox', count:props.inboxCount},
      {icon:<Archive  />,text:'Archive', count:props.archiveCount},
      {icon:<Forecast  />,text:'Forecast', count:props.forecastCount},
      {icon:<Tag  />,text:'Tag', count:props.tagCount},
      {icon:<Delete  />,text:'Trash', count:props.trashCount},
    ];
    this.hightLightIndex = this.items.findIndex((item)=> `/${item.text}` === this.props.hightLight  );
  }

  renderList(){
    return this.items.map((item) => (<MenuItem key={item.text}>{item.text}</MenuItem>) )
  }
  render(){
    return(
      <Drawer
        docked={true}
        width={200}
        open={this.state.open}
        onRequestChange={(open) => this.setState({open})}
      >
        {this.renderList()}
      </Drawer>
    )
  }





}


export default Leftlist;