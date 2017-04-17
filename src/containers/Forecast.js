import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import * as taskActions from '../actions/TaskActions';
import * as tagActions from '../actions/TagActions';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; 
import Paper from 'material-ui/Paper';
import './Forecast.css';
const actions = Object.assign({}, tagActions, taskActions);

var today = new Date();
var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);



class Forecast extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className='forecastPaper'>
        <InfiniteCalendar
          width={260}
          height={260}
          selected={today}
          minDate={lastWeek}
        />
      </div>
    )
  }


}


const mapStateToProps =  (state) => {
  const tags=state.TagReducer.tags;
  const tasks = state.TaskReducer.tasks;
  return { tags, tasks }

}

const ForecastContainer = connect(mapStateToProps, actions)(Forecast);

export default ForecastContainer;