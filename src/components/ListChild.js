
import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

class ListChild extends Component {

      dragStartHandler() {
        this.props.getTargetStart(this.props.index)
      }
      handleDrop() {
        this.props.getTargetDrop(this.props.index)
      }
      render () {

        const ExpansionPanel = withStyles({
          root: {
            border: '1px solid rgba(0, 0, 0, .125)',
            width: '100%',
            boxShadow: 'none',
            '&:not(:last-child)': {
              borderBottom: 0,
            },
            '&:before': {
              display: 'none',
            },
            '&$expanded': {
              margin: 'auto',
            },
          },
          expanded: {},
        })(MuiExpansionPanel);

        const ExpansionPanelSummary = withStyles({
          root: {
            backgroundColor: 'rgba(0, 0, 0, .03)',
            borderBottom: '1px solid rgba(0, 0, 0, .125)',
            marginBottom: -1,
            minHeight: 56,
            '&$expanded': {
              minHeight: 56,
            },
          },
          content: {
            '&$expanded': {
              margin: '12px 0',
            },
          },
          expanded: {},
        })(MuiExpansionPanelSummary);
        
        const ExpansionPanelDetails = withStyles((theme) => ({
          root: {
            padding: theme.spacing(2),
          },
        }))(MuiExpansionPanelDetails);

          const handleDragEnter = e => {
            e.preventDefault();
            e.stopPropagation();
          };
          const handleDragLeave = e => {
            e.preventDefault();
            e.stopPropagation();
          };
          const handleDragOver = e => {
            e.preventDefault();
            e.stopPropagation();
          };
        return(
          <ListItem 
            draggable 
            onDragStart={() => this.dragStartHandler()}
            onDrop={() => this.handleDrop()}
            onDragOver={e => handleDragOver(e)}
            onDragEnter={e => handleDragEnter(e)}
            onDragLeave={e => handleDragLeave(e)}
            >
              <ExpansionPanel disabled={(this.props.item.done === true? true : false)} className="expandable-line" expanded={this.props.expanded === 'panel'+this.props.index} onChange={() => this.props.updateExpand('panel'+this.props.index)}>
                <ExpansionPanelSummary aria-controls="panel1d-content">
                  <Typography>{this.props.item.titleValue}</Typography>
                  <div className="actions-wrapper">
                    <Button onClick={(e) => this.props.markAsDone(e, this.props.index)}><DoneIcon /></Button>
                    <Button onClick={(e) => this.props.editTask(e, this.props.index)}><EditIcon /></Button>
                    <Button onClick={() => this.props.removeItem(this.props.index)}><ClearIcon /></Button>
                  </div>
                  
                </ExpansionPanelSummary>
                {this.props.item.descValue.length > 0 ?
                  <ExpansionPanelDetails>
                    <Typography>
                      {this.props.item.descValue}
                    </Typography>
                  </ExpansionPanelDetails>
                  :''
                  }
              </ExpansionPanel>
          </ListItem>     
        );
      }
  }

export default ListChild;