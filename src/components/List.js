import React, {Component} from 'react';
import ListChild from './ListChild';

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
            removeItem={(index) => this.props.removeItem(index)}
            />
        );
      });
      return (
        <> 
            {list}
        </>
      );
    }
  }

export default List;