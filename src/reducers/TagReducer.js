// @flow

import _ from 'lodash';
import { 
  ADD_TAG,
  EDIT_TAG_NAME, 
  EDIT_TAG_COLOR, 
  DELETE_TAG,
  ASSOCIATE_TASK_WITH_TAG,
  DE_ASSOCIATE_TASK_WITH_TAG,
  DELETE_TASK_IN_TAG,
  DE_ASSOCIATE_TASK_IN_ALL_TAG
  } from '../actions/TagActions';



const initialState: any = {
  tags: {
    '0':{
      'tagName': 'work',
      'color': '#84ffff',
      'tasks': []   
    },
    '1':{
      'tagName': 'relax',
      'color': '#a5d6a7',
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

    case DELETE_TAG: {
      const { id } = payload;
      return Object.assign({}, {
          ...state,
          tags: _.omit(state.tags, id),
          nextTagId: state.nextTagId
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

    case ASSOCIATE_TASK_WITH_TAG: {
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

    case DE_ASSOCIATE_TASK_WITH_TAG: {
      const { id, taskId } = payload;
      return Object.assign({}, {
        ...state,
        tags: {
          ...state.tags,
          [id]: {
            ...state.tags[id],
            tasks:
              state.tags[id].tasks.filter( (task)=>task!==taskId) 
          }
        }
      });
    }
    case DE_ASSOCIATE_TASK_IN_ALL_TAG: {
      const { taskId } = payload;
      let tags = {};
      Object.entries(state.tags).forEach(([tagId, tagObject])=>{
        const filteredTasks = tagObject.tasks.filter((taskIdInTag)=> taskId!==taskIdInTag );
        tags[tagId] = {
          ...tagObject,
          tasks: filteredTasks
        }
      }); 
      return Object.assign({}, {
        ...state,
        tags

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