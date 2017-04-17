import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import * as taskActions from '../actions/TaskActions';
import * as tagActions from '../actions/TagActions';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
const actions = Object.assign({}, tagActions, taskActions);

class Tags extends Component {

  renderTag(){
    return Object.entries(this.props.tags).map( ([tagId, tagObject])=>{

      const tasksInTag = Object.entries(this.props.tasks).filter(([taskId, taskObject])=>  tagObject.tasks.includes(taskId));
      const tasks = tasksInTag.map( ([taskId, taskObject])=> <p key={taskId}>{taskObject.taskName}</p> )
      return(
        <Card key={tagId} style={{'marginTop': 20}} initiallyExpanded={true}>
          <CardHeader
            title={tagObject.tagName}
            actAsExpander={true}
            showExpandableButton={true}
            style={{'backgroundColor':tagObject.color}}
          />
          <CardText expandable={true}>
            {tasks}
          </CardText>
        </Card>
        )
      }
    )
  }

  render(){
    return (
      <div>
        {this.renderTag()}
      </div>
    )
  }

}


const mapStateToProps =  (state) => {
  const tags=state.TagReducer.tags;
  const tasks = state.TaskReducer.tasks;
  return { tags, tasks }

}

const TagsContainer = connect(mapStateToProps, actions)(Tags);

export default TagsContainer;