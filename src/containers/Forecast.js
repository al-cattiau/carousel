import {List, ListItem} from 'material-ui/List';
import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import * as taskActions from '../actions/TaskActions';
import * as tagActions from '../actions/TagActions';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { taskWithDate  } from '../helperFunc/computeTask';
import { browserHistory } from 'react-router';
import Start from 'material-ui/svg-icons/toggle/star-border';
import {Card, CardHeader } from 'material-ui/Card';

const actions = Object.assign({}, tagActions, taskActions);

const backgroundColorArray = ['#B71C1C','#C62828','#D32F2F','#E53935','#F44336','#EF5350','#E57373','#EF9A9A'];

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);


class Forecast extends Component {

  computeEvens(){
    return Object.entries(this.props.tasksWithDate).map( ([taskId, taskObject])=>
      ({
        title: taskObject.taskName,
        start: taskObject.deferDate||taskObject.dueDate,
        end: taskObject.dueDate||taskObject.deferDate,
        taskId
      })
    )
  }


  renderCalendar(){
    return(
      <BigCalendar
        events={this.computeEvens()}
        views={['month']}
        popup
        onSelectEvent={event => browserHistory.push(`/Tag#${event.taskId}`)}
      />
    )
  }

  renderTaskList(){
    let taskArray = [];
    Object.entries(this.props.tasksWithDate).forEach(([taskId, taskObject])=>{
      if(taskObject.dueDate.getMonth()===(new Date()).getMonth()){
        let taskObjectWithId = Object.assign({}, taskObject) ;
        taskObjectWithId.id = taskId;
        taskArray.push(taskObjectWithId);
      }
    });
    taskArray.sort((a, b)=>a.dueDate>b.dueDate);
    taskArray = taskArray.slice(0,6);
    const taskArrayView = taskArray.map( (taskObjectWithId, index)=> 
      (<div onTouchTap={()=>browserHistory.push(`/Tag#${taskObjectWithId.id}`)} key={taskObjectWithId.id} >
        <ListItem rightIcon={taskObjectWithId.priority?<Start color={'white'}/>:null} 
          style={{'backgroundColor':backgroundColorArray[index],'color':'white' }}>
          {taskObjectWithId.taskName}
          <br/>
          residue date: {taskObjectWithId.dueDate.getDate() -new Date().getDate()} days.
        </ListItem>
        <Divider/>
      </div>)
    )
    return(
      <Card style={{'width':300}} >
        <CardHeader
          title='The task for recent days:'
          subtitle='only show 6 recent items.'
        />
        <List>
          {taskArrayView}
        </List>
      </Card>
    )

  }

  render(){
    return(
      <div className='forecastPaper'>
        <div className='forecastContent'>
          {this.renderCalendar()}
        </div>
        <div className='forecastTaskList'>
          {this.renderTaskList()}
        </div>
      </div>
    )
  }


}


const mapStateToProps =  (state) => {
  const tags=state.TagReducer.tags;
  const tasksWithDate = taskWithDate(state);
  return { tags, tasksWithDate }

}

const ForecastContainer = connect(mapStateToProps, actions)(Forecast);

export default ForecastContainer;