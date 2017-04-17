import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { List } from 'material-ui/List';
import { connect } from 'react-redux';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import Archive from 'material-ui/svg-icons/content/archive';
import { wrap } from 'react-bounds';
import Delete from 'material-ui/svg-icons/action/delete';
import Tag from 'material-ui/svg-icons/action/label';
import Forecast from 'material-ui/svg-icons/notification/event-note';
import * as taskActions from '../actions/TaskActions';
import * as tagActions from '../actions/TagActions';
import ListBadgeitem from '../components/ListBadgeItem';

const actions = Object.assign({}, tagActions, taskActions);

class Leftlist extends Component{
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
    this.portrait = this.props.isBound('portrait');

  }
  static bounds(){
    return {
      'portrait':{
        maxWidth: 81,
      },
    };
  }

  componentWillReceiveProps(nextProps, nextState){
    this.items[0].count = nextProps.inboxCount;
    this.hightLightIndex = this.items.findIndex((item)=> `/${item.text}` === nextProps.hightLight  );
    this.portrait = nextProps.isBound('portrait');
  }

  renderItems(mode){
    return this.items.map((item, index)=>{
      const isHightlight = this.hightLightIndex===index? true: false;
      return <ListBadgeitem index={index} badgeCount={item.count} mode={mode} item={item} key={item.text} isHightlight={isHightlight}/>
    }) 
  }
  render(){
    const mode = this.portrait ? 'portrait' : 'landsacpe';
    const listItems = this.renderItems(mode);
    return(
      <List>
        {listItems}
      </List>
    );
  }
}
Leftlist.propTypes = {
  hightLight: PropTypes.string.isRequired
};

const computeInboxListBadge=(tasks, tags)=> {
  let count = 0;
  Object.entries(tasks).forEach( ([taskId, taskObject]) =>{    
    const inTag = Object.entries(tags).find( ([tagId, tagObject ]) => tagObject.tasks.includes(taskId) )
    if(!taskObject.completed && taskObject.active && !inTag   ){  count += 1; }
  });
  return count;

}

const mapStateToProps = (state) => {
  return {
    hightLight: state.routing.locationBeforeTransitions.pathname,
    tags: state.TagReducer.tags,
    inboxCount: computeInboxListBadge(state.TaskReducer.tasks, state.TagReducer.tags),
  };
};

const wrapList = wrap(Leftlist);
const LeftlistContainer = connect(mapStateToProps, actions )(wrapList);


export default LeftlistContainer;
