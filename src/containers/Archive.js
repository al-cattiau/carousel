import React, { Component } from 'react';
// import { LineChart, Line, XAxis, YAxis } from 'recharts';
import ArchiveTaskPaper from '../components/TaskPaper';
import { toggleCompleted } from '../actions/TaskActions';
import { connect } from 'react-redux';
import { taskInArchive } from '../helperFunc/computeTask';
import Undo from 'material-ui/svg-icons/content/reply';


class Archive extends Component{
  renderTaskPaper(){
    return Object.entries(this.props.tasks).map( ([taskId, taskObject])=> 
      <ArchiveTaskPaper 
        buttonClick={()=>this.props.toggleCompleted(taskId)} 
        taskObject={taskObject} 
        buttonIcon={<Undo />}
        buttonLabel={' Put Back'}
        key={taskId}
      />
    )
  }
  render(){
    return (
      <div className='archiveContainer'>
        {this.renderTaskPaper()}
      </div>
    )
    
  }
}


const mapStateToProps = (state) => {
  const tasks = taskInArchive(state);
  const pathname= state.routing.locationBeforeTransitions.pathname;
  return { tasks, pathname  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCompleted: (id) => {
      dispatch(toggleCompleted(id))
    },
  }
}

const ArchiveContainer = connect(mapStateToProps, mapDispatchToProps )(Archive);
export default ArchiveContainer;
