// @flow
import _ from 'lodash';
import {
  ADD_TASK,
  TOGGLE_PRIORITY,
  TOGGLE_ACTIVE,
  DELETE_TASK,
  SET_TASK_DUE_DATE,
  SET_TASK_DEFER_DATE,
  SET_PREDICT_TIME,
  SET_ACTUAL_TIME,
  TOGGLE_COMPLETED,
  TOGGLE_DETAIL_MODE,
  SELECT_A_TASK,
  DE_SELECT_A_TASK,
  CLEAR_SELECTED_TASK
 } from '../actions/TaskActions';
 import type { TaskAction } from '../actions/TaskActions';



type stateType = {
  nextTaskId: number,
  tasks: {
    id?: {
      taskName: string,
      dueDate?: Date,
      deferDate?: Date,
      actualTime?: number,
      predictTime? :number,
      detailMode?: boolean
    }
  }
}

const initialState: stateType = {
  tasks: {},
  nextTaskId: 0,
  selectedTaskId: []
};

const TaskReducer = (state: any=initialState, action: TaskAction) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TASK:{
      const { taskName } = payload;
      return Object.assign({}, {
        ...state,
        tasks: {
          ...state.tasks,
          [state.nextTaskId]: {
            taskName,
            completed: false,
            active: true,
            detailMode: false,
          }
        },
        nextTaskId: state.nextTaskId + 1
      });
    }

    case TOGGLE_DETAIL_MODE:{
      const { id } = payload;
      return Object.assign({}, {
        ...state,
        tasks: {
          ...state.tasks,
          [id]: {
            ...state.tasks[id],
            detailMode: !state.tasks[id].detailMode ,
          }
        },
      });
    }


    case TOGGLE_COMPLETED:{
      const { id } = payload;
      return Object.assign({}, {
        ...state,
        tasks: {
          ...state.tasks,
          [id]: {
            ...state.tasks[id],
            completed: !state.tasks[id].completed ,
          }
        },
      });
    }

    case TOGGLE_PRIORITY:{
      const { id } = payload;
      return Object.assign({}, {
        ...state,
        tasks: {
          ...state.tasks,
          [id]: {
            ...state.tasks[id],
            priority: !state.tasks[id].priority ,
          }
        },
      });
    }

    case TOGGLE_ACTIVE:{
      const { id } = payload;
      return Object.assign({}, {
        ...state,
        tasks: {
          ...state.tasks,
          [id]: {
            ...state.tasks[id],
            active: !state.tasks[id].active,
          }
        },
      });
    }

    case SET_TASK_DUE_DATE:{
      const { id, dueDate } = payload;
      return Object.assign({}, {
        ...state,
        tasks: {
          ...state.tasks,
          [id]: {
            ...state.tasks[id],
            dueDate
          }
        },
      });
    }
    case SET_TASK_DEFER_DATE:{
      const { id, deferDate } = payload;
      return Object.assign({}, {
        ...state,
        tasks: {
          ...state.tasks,
          [id]: {
            ...state.tasks[id],
            deferDate
          }
        },
      });
    }

    case SET_ACTUAL_TIME:{
      const { id, actualTime } = payload;
      return Object.assign({}, {
        ...state,
        tasks: {
          ...state.tasks,
          [id]: {
            ...state.tasks[id],
            actualTime
          }
        },
      });
    }

      case SET_PREDICT_TIME:{
      const { id, predictTime } = payload;
      return Object.assign({}, {
        ...state,
        tasks: {
          ...state.tasks,
          [id]: {
            ...state.tasks[id],
            predictTime
          }
        },
      });
    }

    case DELETE_TASK:{
      const { id } = payload;
      return Object.assign({}, {
        ...state,
        tesks: _.omit(state.tasks, id),
      });
    }

    case SELECT_A_TASK: {
      const { id } = payload;
      return Object.assign({}, {
        ...state,
        selectedTaskId:[
          ...state.selectedTaskId,
          id
        ]
      });
    }

    case DE_SELECT_A_TASK: {
      const { id } = payload;
      return Object.assign({}, {
        ...state,
        selectedTaskId:[
          state.selectedTaskId.filter((seletedId)=>seletedId!==id),
        ]
      });

    }

    case CLEAR_SELECTED_TASK: {
      return Object.assign({}, {
        ...state,
        selectedTaskId:[]
      });
    }

    default:
      return state;

  }

}

export default TaskReducer;
