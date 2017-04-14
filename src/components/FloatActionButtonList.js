import FloatActionButton from '../components/FloatActionButton';
import React from 'react';



const makeFabStyles=(index)=> {
  const bottom = 30 + index * 70;
  return ({
    position:'fixed',
    bottom,
    right: 30,
    zIndex: 100
   })
    
};

const Button = (props) => {
  const { buttons } = props;
  const buttonsList = buttons.map((button, index)=>(
    <FloatActionButton key={index} secondary={button.secondary} backgroundColor={button.backgroundColor} style={makeFabStyles(index)} Icon={button.Icon} clickFab={button.callback} />
  ));
  return( 
    <div>
      {buttonsList}
    </div>
  )
    
}

export default Button;