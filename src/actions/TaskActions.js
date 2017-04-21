// @flow
export const ADD_TASK = 'ADD_TASK';
export const TOGGLE_COMPLETED = 'TOGGLE_COMPLETED';
export const TOGGLE_PRIORITY = 'TOGGLE_PRIORITY';
export const TOGGLE_ACTIVE = 'TOGGLE_ACTIVE';
export const DELETE_TASK = 'DELETE_TASK';
export const SET_TASK_DUE_DATE = 'SET_TASK_DUEDATE';
export const SET_TASK_DEFER_DATE = 'SET_TASK_DEFER_DATE';
export const SET_PREDICT_TIME = 'SET_PREDICT_TIME';
export const SET_ACTUAL_TIME = 'SET_ACTUAL_TIME';
export const TOGGLE_DETAIL_MODE = 'TOGGLE_DETAIL_MODE';
export const SELECT_A_TASK = 'SELECT_A_TASK';
export const DE_SELECT_A_TASK = 'DE_SELECT_A_TASK';
export const CLEAR_SELECTED_TASK = 'CLEAR_SELECTED_TASK';
export const DELETE_TASKS = 'DELETE_TASKS';
export const TOGGLE_SELECT_A_TASK = 'TOGGLE_SELECT_A_TASK';
export const EDIT_TASK_NAME = 'EDIT_TASK_NAME';
export const COMPLETED_TASK = 'COMPLETED_TASK';

export type TaskAction = {
  type: string,
  payload: {
    taskName?: string,
     id?: number,
     dueDate?: Date,
     deferDate?: Date,
     actualTime?: number,
     predictTime? :number
  }
}

export const deSelectATASK = (id: number)=>({
  type: DE_SELECT_A_TASK,
  payload: {
    id
  }
});

export const toggleSelectATask = (id: number)=>({
  type: TOGGLE_SELECT_A_TASK,
  payload: {
    id
  }
});

export const clearSelectedTask = ()=>({
  type: CLEAR_SELECTED_TASK,
  payload: {
  }
});

export const editTaskName = (id: number, taskName: string)=>({
  type: EDIT_TASK_NAME,
  payload: {
    id,
    taskName
  }

});


export const selectATask = (id: number)=>({
  type: SELECT_A_TASK,
  payload: {
    id
  }
});

export const addTask = (taskName: string)=>({
  type: ADD_TASK,
  payload: {
    taskName
  }
}: TaskAction);

export const toggleDetailMode = (id: number)=>({
  type: TOGGLE_DETAIL_MODE,
  payload: {
    id,
  }

}) 

export const toggleCompleted = (id: number)=>({
  type: TOGGLE_COMPLETED,
  payload: {
    id,
  }
})

export const completeTask = (id: number)=>({
  type: COMPLETED_TASK,
  payload: {
    id,
  }
})

export const togglePriority = (id: number)=>({
  type: TOGGLE_PRIORITY,
  payload: {
    id,
  }
}: TaskAction);


export const toggleActive = (id: number)=> ({
  type: TOGGLE_ACTIVE,
  payload: {
    id
  }
}: TaskAction);


export const setTaskDueDate = (id: number, dueDate: Date)=>({
  type: SET_TASK_DUE_DATE,
  payload: {
    id,
    dueDate
  }
}: TaskAction);

export const setTaskDeferDate = (id: number, deferDate: Date)=>({
  type: SET_TASK_DEFER_DATE,
  payload: {
    id,
    deferDate
  }
}: TaskAction);

export const setPredictTime = (id: number, predictTime: number)=>({
  type: SET_PREDICT_TIME,
  payload: {
    id,
    predictTime
  }
}: TaskAction);



export const setActualTime = (id: number, actualTime: number)=>({
  type: SET_ACTUAL_TIME,
  payload: {
    id,
    actualTime
  }
}: TaskAction);


export const deleteTask = (id: number)=> ({
  type: DELETE_TASK,
  payload: {
    id
  }
}: TaskAction);

export const deleteTasks = (ids: [number]) =>(dispatch: any)=>{
  ids.forEach((id)=>dispatch(deleteTask(id)));
};

export const toggleActives = (ids: [number]) =>(dispatch: any)=>{
  ids.forEach((id)=>dispatch(toggleActive(id)));
};

export const completeTasks = (ids: [number]) =>(dispatch: any)=>{
  ids.forEach((id)=>dispatch(completeTask(id)));
};

export const priorityTasks = (ids: [number]) =>(dispatch: any)=>{
  ids.forEach((id)=>dispatch(togglePriority(id)));
};

export const addPriorityTask = (text: string, id: number) =>(dispatch: any)=>{
  dispatch( addTask(text) );
  dispatch( togglePriority(id) );

};

