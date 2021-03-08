import React, {Component} from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Draggable from 'react-draggable';
import * as actions from '../../actions/actionTypes';
import { MIGRATE_DELTA_X, MIGRATE_DELTA_Y, CONTAINER_WIDTH, CONTAINER_HEIGHT, KEY_VALUE_ASCII_ENTER} from "../../constants/Utile";

import { styles } from './style';

class TaskCenter extends Component {

  constructor(props) {
    super(props);

    this.state ={
      activeDrags: 0,
      task :props.task,
      isDragging: false,
      current_keyboard: null,
      controlledPosition: {
        x: 240, y: 140
      },
      default_keyboard: -1,
      skipped_answer_Index: -1,
    }
    TaskCenter.self = this;
  }

  componentDidUpdate(){

    if (this.state.task !== this.props.task_reducer.tasks[0]) {
      this.setState({
        task: this.props.task_reducer.tasks[0],
        controlledPosition: {x: 240, y: 140},
      });
    }

    if(this.props.current_keyboard !== this.state.current_keyboard) {
      this.setState({
        current_keyboard: this.props.current_keyboard
      },() => {
        this.moveCrossHair();
      });
    }
  }

  moveCrossHair() {
    switch (this.state.current_keyboard) {
      case 6:   //Right
        TaskCenter.self.migratePosition(MIGRATE_DELTA_X, 0);
        break;
      case 4:   // Left
        TaskCenter.self.migratePosition(-MIGRATE_DELTA_X, 0);
        break;
      case 8:   // Top
        TaskCenter.self.migratePosition(0, -MIGRATE_DELTA_Y);
        break;
      case 2:   // Down
        TaskCenter.self.migratePosition(0, MIGRATE_DELTA_Y);
        break;
      case 5:   // Skip
        TaskCenter.self.props.onSelectAnswer(this.state.skipped_answer_Index);
        break;
      case KEY_VALUE_ASCII_ENTER:   // Enter
        TaskCenter.self.props.onSelectAnswer(TaskCenter.self.state.controlledPosition);
        break;
      default:
        break;
    }
  }

  migratePosition(delta_x, delta_y) {
    const {x, y} = TaskCenter.self.state.controlledPosition;
    TaskCenter.self.setState({
    controlledPosition: {
        x: x + delta_x,
        y: y + delta_y,
      }
    },() => {
      TaskCenter.self.props.onChangeCenterPosition(TaskCenter.self.state.controlledPosition);
      TaskCenter.self.props.setCenterPosition(TaskCenter.self.state.controlledPosition+75);
    });
    TaskCenter.self.props.setCurrentKeyboard(TaskCenter.self.state.default_keyboard);
  }

  handleDrag(e, ui) {
    const {x, y} = TaskCenter.self.state.controlledPosition;
    TaskCenter.self.setState({
      controlledPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    },() => {
      TaskCenter.self.props.onChangeCenterPosition(TaskCenter.self.state.controlledPosition);
      TaskCenter.self.props.setCenterPosition(TaskCenter.self.state.controlledPosition+75);
    })
  }

  clickPoint(e) {
    e.preventDefault();
    e.stopPropagation();
    let currentTargetRect = e.currentTarget.getBoundingClientRect();
    TaskCenter.self.setState({controlledPosition: {x: e.clientX-currentTargetRect.left-75, y:e.clientY-currentTargetRect.top-75}}, () => {
      TaskCenter.self.props.onChangeCenterPosition(TaskCenter.self.state.controlledPosition);
    });
  }

  sendAnswer() {
    TaskCenter.self.props.onSelectAnswer(TaskCenter.self.state.controlledPosition);
  }

  render() {
    const { classes } = this.props;
    const { controlledPosition } = this.state;
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    return (
      <Grid container>
        <Grid item sm={12} justify="center" container spacing={8} className={classes.imagebox}>
          <Grid className={classes.image_container} onDoubleClick = {this.sendAnswer}>
            <img src={this.state.task.image_url} className={classes.image} alt="" onClick={(e) => this.clickPoint(e)} />
              <Draggable position={controlledPosition} bounds="parent" onDrag={this.handleDrag}  {...dragHandlers}>
                <div className={classes.cross_hair}>
                  x: {parseFloat((controlledPosition.x+75)/CONTAINER_WIDTH).toFixed(2)}, y: {parseFloat((controlledPosition.y+75)/CONTAINER_HEIGHT).toFixed(2)}
                </div>
              </Draggable>
          </Grid>
        </Grid>
        <Grid item container sm={12} justify="center" spacing={8}  className={classes.NoneBtn}>
          <Grid sm={6} item>
            <Button  variant="outlined" color="primary" className={classes.button} onClick={(e)=>{ this.props.onSelectAnswer(0) }}>
              <div  className={classes.text_None}>
                None
              </div>
            </Button>
          </Grid>
          <Grid sm={6} item>
            <Button  variant="outlined" color="primary" className={classes.button} onClick={(e)=>{this.sendAnswer()}}>
              <div  className={classes.text_None}>
                Send
              </div>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => ({
  task_reducer: state.taskReducer,
  current_keyboard:  state.utileReducer.current_keyboard
});

const mapDispatchToProps = (dispatch) => ({
  setCenterPosition: (position) => dispatch(actions.setCenterPosition(position)),
  setCurrentKeyboard: (keyValue) => dispatch(actions.setCurrentKeyboard(keyValue)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TaskCenter));
