import React, { Component } from 'react';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import Archive from 'material-ui/svg-icons/content/archive';
import Delete from 'material-ui/svg-icons/action/delete';
import Tag from 'material-ui/svg-icons/action/label';
import Forecast from 'material-ui/svg-icons/notification/event-note';
import Drawer from 'material-ui/Drawer';
import ListBadgeitem from '../components/ListBadgeItem';


class Leftlist extends Component{
  state= {open:true}
  constructor(props){
    super(props);
    this.items = [
      {icon:<ContentInbox />,text:'Inbox', count:props.inboxCount},
      {icon:<Archive  />,text:'Archive', count:props.archiveCount},
      {icon:<Forecast  />,text:'Forecast', count:props.forecastCount},
      {icon:<Tag  />,text:'Tag', count:props.tagCount },
      {icon:<Delete  />,text:'Trash', count:props.trashCount},
    ];
    
  }
  

  renderList(hightLight, count){
    this.items[3].tags = this.props.tags;
    this.hightLightIndex = this.items.findIndex((item)=> item.text === hightLight  );
    return this.items.map((item, index) =>
     (<ListBadgeitem  badgeCount={count}  key={item.text} item={item} isHightlight={index===this.hightLightIndex} index={index} close={()=>this.props.close()} />) 
     )
  }
  render(){
    return(
      <Drawer
        width={160}
        open={ this.props.isLandscape ? true: this.props.openList}
        docked={ this.props.isLandscape }
        onRequestChange={() => this.props.close() }
      >
        <div className='appTitle'>Carousel</div>
        {this.renderList(this.props.hightLight, this.props.inboxCount)}
      </Drawer>
    )
  }

}



export default Leftlist;