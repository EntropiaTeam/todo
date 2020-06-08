import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


class Form extends Component {
    constructor(props) {
      super(props);

      this.form = React.createRef();
      this.inputTitle = React.createRef();
      this.inputDesc = React.createRef();
    }
    

    onSubmit(event) {
      event.preventDefault();
      var newItemTitle = this.inputTitle.current.value;
      var newItemDesc = this.inputDesc.current.value;
      if(newItemTitle) {
        if (this.props.modalEdit === true) {
          this.props.addTask(newItemTitle, newItemDesc, this.props.modalData.index);
        } else {
          this.props.addTask(newItemTitle, newItemDesc)
        }
        
        this.form.current.reset();
        this.props.closeModal();
      }
    }
    render () {


      return (
        <div>
          
          <Dialog id="dialogAction" open={this.props.modalOpen} onClose={() => this.props.closeModal()} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{this.props.modalEdit?'Edit':'Enter'} task and description</DialogTitle>
            <form ref={this.form} onSubmit={(e) => this.onSubmit(e)}>
              <TextField fullWidth type="text" required inputRef={this.inputTitle} label="Add task title" defaultValue={this.props.modalEdit?this.props.modalData.titleValue:''} />
              <TextField fullWidth type="text" inputRef={this.inputDesc} label="Add task description" defaultValue={this.props.modalEdit?this.props.modalData.descValue:''} />
              <Button type="submit" variant="contained" color="primary" disableElevation>{this.props.modalEdit?'Edit':'Add'}</Button>
            </form>
          </Dialog>
        </div>
      );   
    }
  }

export default Form;