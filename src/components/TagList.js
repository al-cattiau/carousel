import { ListItem } from 'material-ui/List';
import React, { Component } from 'react';
import Tag from 'material-ui/svg-icons/action/label';
import ListBadgeitem from './ListBadgeItem';

export default class Taglist extends Component{
  constructor(props){
    super(props);
    this.state = {
      open: true
    }
  }
  render(){
    const { tags, style, primaryText } = this.props ;
    const tagItems = Object.entries(tags).map(([ tagId, tag ])=>(
      <ListItem
        key={ tagId }
        primaryText={ tag.tagName }
        style={{ 'color': tag.color }}
      />
    ));
    return(
      <ListBadgeitem
        mode='landscape'
        leftIcon={<Tag/>}
        onNestedListToggle={ ()=>this.setState({open:!this.state.open})}
        primaryText={ primaryText }
        open={this.state.open}
        nestedItems={ tagItems }
        style={ style }
      />
    )
  }


}