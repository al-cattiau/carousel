import React, { Component } from 'react';
import TrashTaskPaper from '../components/TrashTaskPaper';
import { connect } from 'react-redux';
import { toggleActive, deleteTasks } from '../actions/TaskActions';
import FloatActionButton from '../components/FloatActionButton';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import { taskInTrash } from '../helperFunc/computeTask';


class Trash extends Component {
  renderTaskPaper(){
    return Object.entries(this.props.tasks).map( ([taskId, taskObject])=> 
      <TrashTaskPaper 
        toggleActive={()=>this.props.toggleActive(taskId)} 
        taskObject={taskObject} 
        key={taskId}
      />
    )
  }

  clearAll(){
    const allTaskId = Object.entries(this.props.tasks).map( ([taskId, taskObject])=>taskId);
    this.props.deleteTasks(allTaskId);  
  }


  render(){
    return(
      <div className='trashContainer'>
          {this.renderTaskPaper()}
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
    }
  }
}

const TrashContainer = connect(mapStateToProps, mapDispatchToProps )(Trash);
export default TrashContainer;