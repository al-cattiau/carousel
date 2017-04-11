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
    this.items[1].count = nextProps.archiveCount;
    this.items[2].count = nextProps.forecastCount;
    this.items[3].count = nextProps.tagCount;
    this.items[4].count = nextProps.trashCount;
    this.hightLightIndex = this.items.findIndex((item)=> `/${item.text}` === nextProps.hightLight  );
    this.portrait = nextProps.isBound('portrait');
  }

  renderItems(mode){
    return this.items.map((item, index)=>{
      const isHightlight = this.hightLightIndex===index? true: false;
      return <ListBadgeitem badgeCount={item.count} mode={mode} item={item} key={item.text} isHightlight={isHightlight}/>
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

const computeInboxListBadge=(object)=> (
   Object.entries(object).filter(([ objectId, object ])=>(
     object.completed === false &&
     object.active === true 
   )).length
);

const computeArchiveListBadge=(object)=> (
   Object.entries(object).filter(([ objectId, object ])=>(
     object.completed === true &&
     object.active === true 
   )).length
);

const computeForecastListBadge=(object)=> (
   Object.entries(object).filter(([ objectId, object ])=>(
     object.dueDate ||
     object.deferDate  
   )).length
);

const computeTrashListBadge=(object)=> (
   Object.entries(object).filter(([ objectId, object ])=>(
     object.active === false
   )).length
);

const computeTagListBadge=(object)=> (
   Object.entries(object).length
);

const mapStateToProps = (state) => {
  return {
    hightLight: state.routing.locationBeforeTransitions.pathname,
    tags: state.TagReducer.tags,
    inboxCount: computeInboxListBadge(state.TaskReducer.tasks),
    archiveCount: computeArchiveListBadge(state.TaskReducer.tasks),
    forecastCount: computeForecastListBadge(state.TaskReducer.tasks),
    tagCount: computeTagListBadge(state.TagReducer.tags),
    trashCount: computeTrashListBadge(state.TaskReducer.tasks),
  };
};

const wrapList = wrap(Leftlist);
const LeftlistContainer = connect(mapStateToProps, actions )(wrapList);


export default LeftlistContainer;
