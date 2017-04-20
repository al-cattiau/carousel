import Badge from 'material-ui/Badge';
import React from 'react';
import { ListItem } from 'material-ui/List';
import { Link } from 'react-router';


const badgeStyle = {
  left:40, top:5, height: 15, width: 15, fontSize: 10, zIndex: 100
};

const listItemStyle = {
  height: 48, width: 160
}



export default (props) => {
  const { item, isHightlight, index } = props;
  let { text } = item;
  const badgeCount = props.badgeCount < 99 ? props.badgeCount : '∞';
  const ltbListItemStyle = isHightlight? 
    Object.assign({'backgroundColor':'#E0E0E0'},listItemStyle)
     : listItemStyle
  
  if (index !== 0 || badgeCount===0){
    return (
      <ListItem
          containerElement={<Link to={`/${item.text}` }/>}            
          onTouchTap={()=>props.close()}
          leftIcon={item.icon}
          style={ltbListItemStyle}
          primaryText={text}
        />
    )
  }
    return(
      <Badge 
        badgeStyle={badgeStyle}  
        badgeContent={badgeCount} 
        secondary={true} 
        key={item.text} 
        style={{padding:'0px 0px 0px 0px'}}>
        <ListItem
          containerElement={<Link to={`/${item.text}` }/>}            
          onTouchTap={()=>props.close()}
          leftIcon={item.icon}
          style={ltbListItemStyle}
          primaryText={text}
        />
        </Badge>
    )
}