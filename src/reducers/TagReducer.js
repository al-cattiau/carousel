// @flow

import _ from 'lodash';
import { 
  ADD_TAG,
  EDIT_TAG_NAME, 
  EDIT_TAG_COLOR, 
  ASSOCIATE_TASK_WITH_Tag,
  DELETE_TASK_IN_TAG,
  } from '../actions/TagActions';



const initialState: any = {
  tags: {
    '0':{
      'tagName': 'work',
      'color': '#D500F9',
      'tasks': []   
    },
    '1':{
      'tagName': 'relax',
      'color': '#FFEB3B',
      'tasks': []   
    }
  },
  nextTagId: 2,
}

const TagReducer = (state: any=initialState, action: any) =>{
  const { payload, type } = action;
  switch (type) {
    case ADD_TAG: {
      const { tagName, color } = payload;
      return Object.assign({}, {
          ...state,
          tags: {
            ...state.tags,
            [state.nextTagId]: {
              tagName,
              color,
              tasks: []              
            }
          },
          nextTagId: state.nextTagId+1
      });
    }

    case EDIT_TAG_NAME: {
      const { id, tagName } = payload;
      return Object.assign({}, {
        ...state,
        tags: {
          ...state.tags,
          [id]: {
            ...state.tags[id],
            tagName
          }
        }
      });
    }

    case EDIT_TAG_COLOR: {
      const { id, color } = payload;
      return Object.assign({}, {
        ...state,
        tags: {
          ...state.tags,
          [id]: {
            ...state.tags[id],
            color
          }
        }
      });
    }

    case ASSOCIATE_TASK_WITH_Tag: {
      const { id, taskId } = payload;
      return Object.assign({}, {
        ...state,
        tags: {
          ...state.tags,
          [id]: {
            ...state.tags[id],
            tasks:[  
              ...state.tags[id].tasks,
              taskId
             ]

          }
        }
      });
    }

    case DELETE_TASK_IN_TAG: {
      const { id, taskId } = payload;
      return Object.assign({}, {
        ...state,
        tags: {
          ...state.tags,
          [id]: {
            ...state.tags[id],
            tasks: state.tags[id].filter((oldTaskId)=> oldTaskId !== taskId )
          }
        }
      });
    }

    default:
        return state;
  }
}


export default TagReducer;