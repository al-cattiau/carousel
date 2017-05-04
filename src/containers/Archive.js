import React, { Component } from 'react';
// import { LineChart, Line, XAxis, YAxis } from 'recharts';
import ArchiveTaskPaper from '../components/TaskPaper';
import { toggleCompleted } from '../actions/TaskActions';
import { connect } from 'react-redux';
import { taskInArchive, taskNameAutoComplete, taskToFilter, taskToSearch  } from '../helperFunc/computeTask';
import Undo from 'material-ui/svg-icons/content/reply';
import AutoComplete from 'material-ui/AutoComplete';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';


class Archive extends Component{
  state= {filterText:'' };
  
  renderTaskPaper(){
    let filterTasks;
    if(this.state.filterText===''){
      filterTasks = this.props.tasks;
      
    }else{
      if(this.state.accurate){
        filterTasks = taskToSearch(this.state.filterText, this.props.tasks);
      }else{
        filterTasks = taskToFilter(this.state.filterText, this.props.tasks);
      }
      
    }
    return Object.entries(filterTasks).map( ([taskId, taskObject])=> 
        <ArchiveTaskPaper 
          buttonClick={()=>this.props.toggleCompleted(taskId)} 
          taskObject={taskObject} 
          buttonIcon={<Undo />}
          buttonLabel={' put back to incompleted'}
          key={taskId}
        />
    )
  }


  renderTaskFilter(){
    return (
      <AutoComplete 
        dataSource={this.props.taskNameInAutoComplete} fullWidth={true} name='hello' 
        floatingLabelText="Task filter"  hintText="Type task name in here."
        onUpdateInput={(value)=>this.setState({filterText:value, accurate: false})}
        filter={AutoComplete.caseInsensitiveFilter}
        onNewRequest={(value)=>this.setState({filterText:value, accurate: true})}
      />
    )

  }
  render(){
    return (
      <div>
        {this.renderTaskFilter()}
        <CSSTransitionGroup transitionName='archivePaper' component='div' className='archiveContainer'>
          {this.renderTaskPaper()}
        </CSSTransitionGroup>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  const tasks = taskInArchive(state);
  const pathname= state.routing.locationBeforeTransitions.pathname;
  const taskNameInAutoComplete = taskNameAutoComplete(state);
  return { tasks, pathname, taskNameInAutoComplete  }
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
