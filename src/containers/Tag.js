import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import * as taskActions from '../actions/TaskActions';
import * as tagActions from '../actions/TagActions';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import { taskInTag  } from '../helperFunc/computeTask';
import TaskDetailSetup from '../components/TaskDetailSetup';
import {Tabs, Tab} from 'material-ui/Tabs';

const actions = Object.assign({}, tagActions, taskActions);

class Tags extends Component {


  renderTag(){
    return Object.entries(this.props.tags).map( ([tagId, tagObject])=>{
      const tasksInTags = taskInTag(this.props.tags, tagId, this.props.tasks);
      const tasksItems = Object.entries(tasksInTags).map(([taskId, taskObject])=>(
        <a href={`#${taskId}`} key={taskId} >
          <TaskDetailSetup tags={this.props.tags} 
            taskId={taskId} taskObject={taskObject}  
            hideSubmit={true}
          />
        </a>
      ));
      return(
        <Card key={tagId} style={{'marginTop': 20}} initiallyExpanded={true}>
          <CardHeader
            title={tagObject.tagName}
            actAsExpander={true}
            showExpandableButton={true}
            titleColor={tagObject.color}
            titleStyle={{'fontSize':30,'fontWeight':'lighter'}}
          />
          <CardText expandable={true}>
            {tasksItems}
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





/*
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
            titleColor={tagObject.color}
            titleStyle={{'fontSize':30,'fontWeight':'lighter'}}
          />
          <CardText expandable={true}>
            {tasks}
          </CardText>
        </Card>
        )
      }
    )
  }*/