import * as colorsObject from './colors';


const computeResidueColor = (state)=>{
  const colorsArray = Object.entries(colorsObject).map( ([colorName, colorText], index)=> colorText );
  return colorsArray.filter((color)=> (
    !Object.entries(state.TagReducer.tags).some(([tagId, tagObject])=>
      tagObject.color === color
    )
  ));
  
}


export default computeResidueColor;


;