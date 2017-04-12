import Badge from 'material-ui/Badge';
import React from 'react';
import { ListItem } from 'material-ui/List';
import { Link } from 'react-router';

const badgeStyleInPortrait = {
  right:0, top:5, height: 12, width: 12, fontSize: 8, zIndex: 100
};

const badgeStyleInLandscape = {
  left:40, top:5, height: 15, width: 15, fontSize: 10, zIndex: 100
};

const listItemStyleInLandscape = {
  height: 48, width: 160
}

const listItemStyleInPortrait = {
  height: 48, width: 50
}


export default (props) => {
  const { mode, item, isHightlight, index } = props;
  let { text } = item;
  const badgeCount = props.badgeCount < 10 ? props.badgeCount : '∞';
  let listItemStyle, badgeStyle ;
  if (mode === 'landsacpe'){
    listItemStyle = isHightlight? 
    Object.assign({'backgroundColor':'#E0E0E0'},listItemStyleInLandscape)
     : listItemStyleInLandscape
     badgeStyle = badgeStyleInLandscape;
  }else{
    listItemStyle = isHightlight? 
    Object.assign({'backgroundColor':'#E0E0E0'},listItemStyleInPortrait)
     : listItemStyleInPortrait
     badgeStyle = badgeStyleInPortrait;
     text = null;
  }
  if (index !== 0 || badgeCount===0){
    return (
      <ListItem
          containerElement={<Link to={`/${item.text}` }/>}            
          leftIcon={item.icon}
          style={listItemStyle}
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
          leftIcon={item.icon}
          style={listItemStyle}
          primaryText={text}
        />
        </Badge>
    )
}