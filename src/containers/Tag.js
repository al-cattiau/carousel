import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import * as taskActions from '../actions/TaskActions';
import * as tagActions from '../actions/TagActions';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import { taskInTag  } from '../helperFunc/computeTask';
import TaskDetailUpdate from '../components/TaskDetailUpdate';


const actions = Object.assign({}, tagActions, taskActions);

class Tags extends Component {


  renderTag(){
    return Object.entries(this.props.tags).map( ([tagId, tagObject])=>{
      const tasksInTags = taskInTag(this.props.tags, tagId, this.props.tasks);
      const tasksItems = Object.entries(tasksInTags).map(([taskId, taskObject])=>(
        <a href={`#${taskId}`} key={taskId} >
          <TaskDetailUpdate tags={this.props.tags} 
            taskId={taskId} taskObject={taskObject}  
            actions={actions}
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


