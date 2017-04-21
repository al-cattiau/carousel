
export const disablePassDate = (date)=>{
  const today = new Date();
  return ( (date.getDate() < today.getDate() && date.getMonth() === today.getMonth()) || date.getMonth() < today.getMonth());
}

export const disablePassDateAndDueDate=(date, dueDate)=>{
  if(dueDate){
    return ( (date.getDate() > dueDate.getDate() && date.getMonth() === dueDate.getMonth()) || date.getMonth() > dueDate.getMonth() ) || disablePassDate(date);
  }else{
    return disablePassDate(date);
  }    
}

export const disablePassDateAndDeferDate=(date, deferDate)=>{
  if(deferDate){
    return ( (date.getDate() < deferDate.getDate() && date.getMonth() === deferDate.getMonth()) || date.getMonth() < deferDate.getMonth() ) || disablePassDate(date);
  }else{
    return disablePassDate(date);
  }

}
