export const inInbox = (state) => {

  const tasks ={} 
  Object.entries(state.TaskReducer.tasks).forEach( ([taskId, taskObject]) =>{    
    const inTag = Object.entries(state.TagReducer.tags).find( ([tagId, tagObject ]) => tagObject.tasks.includes(taskId) )
    if(!taskObject.completed && taskObject.active && !inTag && !taskObject.deferDate && !taskObject.dueDate   ){ tasks[taskId] = taskObject }
  });
  return tasks;
};


export const inInboxCount = (state) => {

  let taskCount = 0;
  Object.entries(state.TaskReducer.tasks).forEach( ([taskId, taskObject]) =>{    
    const inTag = Object.entries(state.TagReducer.tags).find( ([tagId, tagObject ]) => tagObject.tasks.includes(taskId) )
    if(!taskObject.completed && taskObject.active && !inTag && !taskObject.deferDate && !taskObject.dueDate   ){ taskCount++ }
  });
  return taskCount;
};


export const taskWithDate=(tasks)=>{
  const withDate = {};
  Object.entries(tasks).forEach( ([taskId, taskObject])=> {
    if(!taskObject.completed && taskObject.active &&  (taskObject.dueDate || taskObject.deferDate)){
      withDate[taskId] = taskObject;
    }
  })
  return withDate;

}