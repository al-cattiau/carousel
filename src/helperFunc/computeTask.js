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


export const taskWithDate=(state)=>{
  const tasks = state.TaskReducer.tasks;
  const withDate = {};
  Object.entries(tasks).forEach( ([taskId, taskObject])=> {
    if(!taskObject.completed && taskObject.active &&  (taskObject.dueDate || taskObject.deferDate)){
      withDate[taskId] = taskObject;
    }
  })
  return withDate;

}


export const taskInTrash = (state)=>{
  const tasks ={} 
  Object.entries(state.TaskReducer.tasks).forEach( ([taskId, taskObject]) =>{    
    if(!taskObject.active){ tasks[taskId] = taskObject }
  });
  return  tasks;

}

export const taskInTag = (tags, tagId, tasks)=>{
  let tasksInTags = {};
    Object.entries(tasks).forEach(([taskId, taskObject])=> 
    {
      if(tags[tagId].tasks.includes(taskId)){
        tasksInTags[taskId] = taskObject;
      }
    }
  );
  return tasksInTags;
}