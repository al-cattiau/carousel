import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import * as taskActions from '../actions/TaskActions';
import * as tagActions from '../actions/TagActions';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import { taskInTag  } from '../helperFunc/computeTask';
import TaskDetailUpdate from '../components/TaskDetailUpdate';
import FloatActionButton from '../components/FloatActionButton';
import Add from 'material-ui/svg-icons/content/add';
import { browserHistory } from 'react-router';


const actions = Object.assign({}, tagActions, taskActions);

class Tags extends Component {


  renderTag(){
    return Object.entries(this.props.tags).map( ([tagId, tagObject])=>{
      const tasksInTags = taskInTag(this.props.tags, tagId, this.props.tasks);
      const tasksItems = Object.entries(tasksInTags).map(([taskId, taskObject])=>(
        <a href={`#${taskId}`} key={taskId} >
          <TaskDetailUpdate tags={this.props.tags} 
            taskId={taskId} taskObject={taskObject}  
            setTaskDeferDate={(deferDate)=>this.props.setTaskDeferDate(taskId, deferDate)}
            togglePriority={()=>this.props.togglePriority(taskId)}
            editTaskName={(taskName)=>this.props.editTaskName(taskId, taskName)}
            setPredictTime={(time)=>this.props.setPredictTime(taskId, time)}
            setTaskDueDate={(date)=>this.props.setTaskDueDate(taskId, date)}
            toggleActive={()=>this.props.toggleActive(taskId)}
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

  renderFAB(){
    let clickFab, rotateStyle ;
    if(this.props.pathname==='/Tag/add'){
      clickFab = ()=>browserHistory.push('/Tag');
      rotateStyle={'transform':'rotate(-45deg)'};
    }else{
      clickFab = ()=>browserHistory.push('/Tag/add');
      rotateStyle={};
    }
    return (
      <FloatActionButton Icon={<Add style={rotateStyle}/>} clickFab={()=>clickFab()}/>

    )

  }

  render(){
    return (
      <div>
        {this.renderTag()}
        {this.renderFAB()}
        {this.props.children}
      </div>
    )
  }

}


const mapStateToProps =  (state) => {
  const tags=state.TagReducer.tags;
  const tasks = state.TaskReducer.tasks;
  const pathname= state.routing.locationBeforeTransitions.pathname;
  return { tags, tasks, pathname }

}

const TagsContainer = connect(mapStateToProps, actions)(Tags);

export default TagsContainer;


