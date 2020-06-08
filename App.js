import React, {Component} from 'react';
import Form from './components/Form';
import Progress from './components/Progress';
import List from './components/List';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import ColorPicker from 'material-ui-color-picker';

export default class TodoList extends Component {

  constructor(props) {
      super(props);

      this.state = {
          tasks: [
            {index: 0, titleValue: 'Initial task', descValue: 'Initial description', done: false},
            {index: 1, titleValue: 'Initial task2', descValue: 'Initial description2', done: false}
          ],
          done: 0,
          modalOpen: false,
          modalData: [],
          modalEdit: false,
          backgroundColor: 'rgba(0, 0, 0, .03)',
          textColor: '#000'
      }

  }
  editTask(e, itemIndex) {
    e.stopPropagation();
    this.handleClickOpen(this.state.tasks[itemIndex]);
  }

  modifyBackgroundColor(color) {
    var lines = document.getElementsByClassName("MuiExpansionPanelSummary-root");
    for(var i = 0; i < lines.length; i++) {
      lines[i].style.backgroundColor = color;
    }
    if (color) {
      this.setState({
        backgroundColor: color
      })
    }
  }

  modifyTextColor(color) {
    var linesText = document.getElementsByClassName("expandable-line");
    for(var i = 0; i < linesText.length; i++) {
      linesText[i].style.color = color;
    }
    if (color) {
      this.setState({
        textColor: color
      })
    }
  }

  handleClickOpen (editData) {
    this.setState({modalOpen: true});
    if (editData) {
      this.setState({
        modalData: editData, 
        modalEdit: true
      });
    }
  };

  closeModal () {
    this.setState({
      modalOpen: false,
      modalData: [],
      modalEdit: false
    });
  };

  markAsDone(e, itemIndex) {
    e.stopPropagation();
    var tasks = this.state.tasks;
    var task = tasks[itemIndex];
    if (task.done === false) {
      this.setState({done: this.state.done + 1});  
    } else {
      this.setState({done: this.state.done - 1});  
    }
    task.done = !task.done;
    this.setState({tasks: tasks});  
  }

  addTask(taskItemTitle, taskItemDesc, index) {
    var tasks = this.state.tasks;
    if (index >= 0) {
      
      for(var i = 0; i < tasks.length; i++) {
        if (tasks[i].index === index) {
          tasks[i].titleValue = taskItemTitle;
          tasks[i].descValue = taskItemDesc;
        }
      }
    } else {
      tasks.push({
        index: tasks[tasks.length - 1].index+1, 
        titleValue: taskItemTitle, 
        descValue: taskItemDesc,
        done: false
      });
    }
    
    this.setState({tasks: tasks});
    console.log('user tasks', this.state.tasks)
  }

  removeItem(e, index) {
    e.stopPropagation();
    var tasks = this.state.tasks;
    if (index > 0) {
      tasks.splice(index, index);
    } else {
      tasks = []
    }
    
    this.setState({
      tasks: tasks
    })
  }


  updatePosition(startIndex, dropIndex) {

    var arr = this.state.tasks;
    while (startIndex < 0) {
      startIndex += arr.length;
    }
    while (dropIndex < 0) {
      dropIndex += arr.length;
    }
    if (dropIndex >= arr.length) {
        var k = dropIndex - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(dropIndex, 0, arr.splice(startIndex, 1)[0]);
    this.setState({
      tasks: arr
    })
  }
  
  render() {
      return (
          <>
              <div>
              
                  <Typography variant="h2">
                      Todo List
                  </Typography>
                  <Progress done={this.state.done} total={this.state.tasks.length}/>
                  <div className="search-text-wrapper">
                    <Typography className="subtitle-button" variant="subtitle1">Add another task</Typography>
                    <Button variant="contained" color="primary" onClick={() => this.handleClickOpen()}>
                      <AddIcon />
                    </Button>
                  </div>
                  <Form 
                    addTask={(taskItemTitle, taskItemDesc, index) => this.addTask(taskItemTitle, taskItemDesc, index)} 
                    modalOpen={this.state.modalOpen} 
                    modalData={this.state.modalData} 
                    modalEdit={this.state.modalEdit}
                    closeModal={()=>this.closeModal()}
                  />
                  <List 
                    items={this.state.tasks} 
                    updatePosition={(startIndex, dropIndex) => this.updatePosition(startIndex, dropIndex)}
                    removeItem={(e, index) => this.removeItem(e, index)}
                    editTask={(e, index) => this.editTask(e, index)}
                    markAsDone={(e, index) => this.markAsDone(e, index)}
                    backgroundColor={this.state.backgroundColor}
                    textColor={this.state.textColor}
                  />
                <div className="customize-bar">
                  <div className="picker-wrapper">
                    <Typography className="subtitle-button" variant="subtitle1">Customize tasks background color:</Typography>
                    <ColorPicker
                      name='backgroundColor'
                      defaultValue='Tap to choose color'
                      onChange={(color) => this.modifyBackgroundColor(color)}
                    />
                  </div>
                  <div className="picker-wrapper">
                    <Typography className="subtitle-button" variant="subtitle1">Customize tasks text color:</Typography>
                    <ColorPicker
                      name='textColor'
                      defaultValue='Tap to choose color'
                      onChange={(color) => this.modifyTextColor(color)}
                    />
                  </div>
                </div>
              </div>
          </>
      );
  }
}
