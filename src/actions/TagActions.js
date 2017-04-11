// @flow
export const ADD_TAG = 'ADD_TAG';
export const EDIT_TAG_NAME = 'EDIT_TAG_NAME';
export const EDIT_TAG_COLOR = 'EDIT_TAG_COLOR';
export const ASSOCIATE_TASK_WITH_Tag = 'ASSOCIATE_TASK_WITH_Tag';
export const DELETE_TASK_IN_TAG = 'DELETE_TASK_IN_TAG';

export const addTag = (tagName: string, color: string)=>({
  type: ADD_TAG,
  payload: {
    tagName,
    color
  }
});


export const editTagName = (id: number, tagName: string)=>({
  type: EDIT_TAG_NAME,
  payload: {
    id,
    tagName
  }
});

export const editTagColor = (id: number, color: string)=>({
  type: EDIT_TAG_COLOR,
  payload: {
    id,
    color
  }
});

export const associateTaskWithTag = (id: number, taskId: number)=>({
  type: ASSOCIATE_TASK_WITH_Tag,
  payload:{
    id,
    taskId
  }
});

export const deleteTaskInTag = (id: number, taskId: number)=>({
  type: DELETE_TASK_IN_TAG,
  payload:{
    id,
    taskId
  }
});



//一个标签可以有多个任务，
//标签持有任务，
//任务通过遍历标签的 state 找到属于自己的标签