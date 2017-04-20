import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import * as taskActions from '../actions/TaskActions';
import * as tagActions from '../actions/TagActions';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { taskWithDate  } from '../helperFunc/computeTask';
import { browserHistory } from 'react-router'

const actions = Object.assign({}, tagActions, taskActions);


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

  render(){
    return(
      <div className='forecastPaper'>
        <div className='forecastContent'>
          {this.renderCalendar()}
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