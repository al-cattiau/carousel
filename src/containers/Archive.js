import React, { Component } from 'react';
// import { LineChart, Line, XAxis, YAxis } from 'recharts';
import DeleteForever from 'material-ui/svg-icons/action/search';
import FloatActionButton from '../components/FloatActionButton';

class Archive extends Component{
  render(){
    return (
      <div>
        <p>Score: priority double, time useage, short half, long double.</p>
        <FloatActionButton Icon={<DeleteForever/>} clickFab={()=>console.log('s')}/>
       </div>
    )
  }
}

 
export default Archive;