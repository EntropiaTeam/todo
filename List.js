import React, {Component} from 'react';
import ListChild from './ListChild';
import Typography from '@material-ui/core/Typography';

class List extends Component {

  constructor(props) {
    super(props);
    this.state={
      itemStartIndex: 0,
      expandedItem: ''
    }
  }

  getTargetStart(index) {
    this.setState({
      itemStartIndex: index
    })
  }

  getTargetDrop (dropIndex) {
    this.props.updatePosition(this.state.itemStartIndex, dropIndex);
  }

  updateExpand(panel) {
    this.setState({
      expandedItem: panel
    })
  }

    render () {
      if (this.props.items.length > 0) {
        var list = this.props.items.map((item, index) => {
          return (
            <ListChild 
              key={index} 
              expanded={this.state.expandedItem} 
              item={item} 
              index={index} 
              getTargetStart={() => this.getTargetStart(index)} 
              getTargetDrop={() => this.getTargetDrop(index)} 
              updateExpand={(panel) =>this.updateExpand(panel)} 
              markAsDone={(e, index) => this.props.markAsDone(e, index)}
              editTask={(e, index) => this.props.editTask(e, index)}
              removeItem={(e, index) => this.props.removeItem(e, index)}
              backgroundColor={this.props.backgroundColor}
              textColor={this.props.textColor}
              />
          );
        });
      } else {
        return <Typography className="subtitle-button" variant="subtitle1">Ready for a new tasks</Typography>
      }
      
      return (
        <> 
            {list}
        </>
      );
    }
  }

export default List;