import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import * as actions from '../../actions/actionTypes';
import { CENTER_POSITION_X, CENTER_POSITION_Y, CONTAINER_WIDTH, CONTAINER_HEIGHT } from "../../constants/Utile";

import { styles } from './style';
import './style.css'

class TaskBoundingBox extends Component {

  constructor(props) {
    super(props);

    this.state ={
      values: [],
      activeDrags: 0,
      task :props.task,
      isDragging: false,
    }
    TaskBoundingBox.self = this;
  }

  componentDidMount() {
    this.initDraw(this.refs.canvas);
  }

  componentDidUpdate(){
    if (this.state.task != this.props.task_reducer.tasks[0]) {
      this.setState({
        task: this.props.task_reducer.tasks[0]
      })
      this.resetCanvas();
      this.resetState();
    }
  }

  resetCanvas() {
    const canvas = TaskBoundingBox.self.refs.canvas;
    var children = document.getElementsByClassName('rectangle');
    const len = children.length
    for (var i=0; i<len; i++) {
      canvas.removeChild(children[0])
    }
  }

  resetState() {
    this.setState({
      values: []
    })
  }

  addPointToValue(mouse) {
    var value = [((mouse.startX/CONTAINER_WIDTH).toFixed(2)).toString() + ','
      + (mouse.startY/CONTAINER_HEIGHT).toFixed(2).toString(),
        (mouse.x/CONTAINER_WIDTH).toFixed(2).toString() + ','
      + (mouse.y/CONTAINER_HEIGHT).toFixed(2)];
    TaskBoundingBox.self.setState({
      values: value
    });
  }

  initDraw(canvas) {
    function setMousePosition(e) {
      var ev = e || window.event; //Moz || IE
      if (ev.pageX) { //Moz
        let currentTargetRect = e.currentTarget.getBoundingClientRect();
        mouse.x = ev.pageX - currentTargetRect.left;
        mouse.y = ev.pageY - currentTargetRect.top;
      } else if (ev.clientX) { //IE
        let currentTargetRect = e.currentTarget.getBoundingClientRect();
        mouse.x = ev.pageX - currentTargetRect.left;
        mouse.y = ev.pageY - currentTargetRect.top;
      }
    };

    var mouse = {
      x: 0,
      y: 0,
      startX: 0,
      startY: 0
    };
    var element = null;

    canvas.onmousemove = function (e) {
      setMousePosition(e);
      if (element !== null) {
        element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
        element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
        element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
        element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
      }
    }

    canvas.onclick = function (e) {
      if (element !== null) {
        element = null;
        canvas.style.cursor = "default";
        console.log("finsihed.");
        TaskBoundingBox.self.addPointToValue(mouse)
      } else {
        TaskBoundingBox.self.resetCanvas();
        TaskBoundingBox.self.resetState();
        console.log("begun.");
        mouse.startX = mouse.x;
        mouse.startY = mouse.y;
        element = document.createElement('div');
        element.className = 'rectangle';
        element.style.left = mouse.x + 'px';
        element.style.top = mouse.y + 'px';
        canvas.appendChild(element);
        canvas.style.cursor = "crosshair";
      }
    }
  }

  sendAnswer() {
    TaskBoundingBox.self.props.onSelectAnswer(TaskBoundingBox.self.state.values);
  }

  moreThanOneObject() {
    this.setState({
      values: ["MoreThanOneObject"]
    }, () => {
      TaskBoundingBox.self.props.onSelectAnswer(TaskBoundingBox.self.state.values);
    })
  }

  noneObject() {
    this.setState({
      values: ["None"]
    }, () => {
      TaskBoundingBox.self.props.onSelectAnswer(TaskBoundingBox.self.state.values);
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item sm={12} justify="center" container spacing={8} className={classes.imagebox}>
          <Grid className={classes.image_container}>
            <div ref="canvas" className={classes.canvas}></div>
            <img src={this.state.task.image_url} className={classes.image}/>
          </Grid>
        </Grid>
        <Grid item sm={12} justify="center" container spacing={8} className={classes.NoneBtn}>
          <Grid item sm={4}>
            <Button  variant="outlined" color="primary" className={classes.button} onClick={(e)=>{ this.noneObject() }}>
              <div  className={classes.text_None}>
                None
              </div>
            </Button>
          </Grid>
          <Grid item sm={4}>
            <Button sm={6}  variant="outlined" color="primary" className={classes.button} onClick={(e)=>{ this.moreThanOneObject() }}>
              <div  className={classes.text_None}>
                More than 1 object
              </div>
            </Button>
          </Grid>
          <Grid item sm={4}>
            <Button sm={6}  variant="outlined" color="primary" className={classes.button} onClick={(e)=>{ this.sendAnswer() }}>
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
});

const mapDispatchToProps = (dispatch) => ({
  setCenterPosition: (position) => dispatch(actions.setCenterPosition(position)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TaskBoundingBox));
