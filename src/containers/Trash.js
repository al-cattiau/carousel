import React, { Component } from 'react';
import TrashTaskPaper from '../components/TaskPaper';
import { connect } from 'react-redux';
import { toggleActive, deleteTasks,  } from '../actions/TaskActions';
import { de_associateTasksInAllTag } from '../actions/TagActions';
import FloatActionButton from '../components/FloatActionButton';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import { taskInTrash } from '../helperFunc/computeTask';
import Undo from 'material-ui/svg-icons/content/reply';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';


class Trash extends Component {
  renderTaskPaper(){
    return Object.entries(this.props.tasks).map( ([taskId, taskObject])=> 
      <TrashTaskPaper 
        buttonClick={()=>this.props.toggleActive(taskId)} 
        taskObject={taskObject} 
        buttonIcon={<Undo />}
        buttonLabel={' Put Back'}
        key={taskId}
      />
    )
  }

  clearAll(){
    const allTaskId = Object.entries(this.props.tasks).map( ([taskId, taskObject])=>taskId);
    this.props.deleteTasks(allTaskId); 
    this.props.de_associateTasksInAllTag(allTaskId);
  }


  render(){
    return(
      <div>
        <CSSTransitionGroup transitionName='archivePaper' component='div' className='trashContainer'>
          {this.renderTaskPaper()}
        </CSSTransitionGroup>
        <FloatActionButton  secondary={true} Icon={<DeleteForever/>} clickFab={()=>this.clearAll()}/>
      </div>
    )
  }




}


const mapStateToProps = (state) => {
  const tasks = taskInTrash(state);
  return { tasks  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleActive: (id) => {
      dispatch(toggleActive(id))
    },
    deleteTasks: (ids) =>{
      dispatch(deleteTasks(ids))
    },
    de_associateTasksInAllTag: (ids)=>{
      dispatch(de_associateTasksInAllTag(ids))
    }
  }
}

const TrashContainer = connect(mapStateToProps, mapDispatchToProps )(Trash);
export default TrashContainer;