import _ from 'lodash';
import { createSelector } from 'reselect';

const taskSelector = (state) => state.TaskReducer.tasks;
const selectTaskIdSelector = (state) => state.TaskReducer.selectedTaskId;


const getTasks = (tasks, selectedTaskIds ) => {
  const selectedTask = _.filter(
    tasks,
    (task, key)=> _.includes(selectedTaskIds, key)
    
  )

  return selectedTask;

}


export default createSelector(
  taskSelector,
  selectTaskIdSelector,
  getTasks
);

