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

// taskArguments is a array, which contains a bunch of array, each child array indicate the taskList arguments.
export const batchOperation = (taskList: any[], taskArguments: any[][] ) => (dispatch: any) =>{
  taskList.forEach((task, index)=>task(...taskArguments[index]));


};
