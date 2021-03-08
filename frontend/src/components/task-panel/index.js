import React, {Component} from 'react';
import PreCacheImg from 'react-precache-img';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';

import { CENTER_POSITION_X, CENTER_POSITION_Y, CONTAINER_WIDTH, CONTAINER_HEIGHT, CROSS_HAIR } from "../../constants/Utile";
import { SAVE_TASKS, PAGE_INDEX, CLICK_GO_BUTTON } from "../../actions/actionTypes";
import { getTasks, saveAnswer } from '../../actions/ChildrenApi';
import { getValueFromAscii, getAnserIndexFromKeyValue } from "../../actions/Util";

import ClassficationPanel from "../../components/task-classification/index";
import CenterPanel from "../../components/task-center/index";
import BoundingBoxPanel from "../../components/task-boundingbox";

import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import Card from "../../components/Card/Card.jsx";
import * as actions from '../../actions/actionTypes';

import { styles } from './style';

class TaskPanel extends Component {
  static self ;

  constructor(props) {
    super(props);
    TaskPanel.self = this;
    this.state = {
      click_go_button: this.props.click_go_button,
      open: false,
      task_type: props.task_type,
      tasks: props.tasks,
      deleted_task_ids: [],
      cache_images: props.cache_images.concat(CROSS_HAIR),
      count_of_task: props.count_of_task,
      min_cache_task_num: 5,
      page_index: props.page_index,
      max_page_number: props.max_page_number,
      element_category:props.element_category,
      center_position_x: CENTER_POSITION_X,
      center_position_y: CENTER_POSITION_Y,
      skipped_answer_Index: -1,
      answerIndex: null,
    };

    this.onSelectClassificationAnswer = this.onSelectClassificationAnswer.bind(this);
    this.onSelectCenterAnswer = this.onSelectCenterAnswer.bind(this);
    this.onChangeCenterPosition = this.onChangeCenterPosition.bind(this);

    document.addEventListener('keyup', function(event) {
      var keyValue = TaskPanel.self.props.getValueFromAscii(event.keyCode);
      if (keyValue) {
        TaskPanel.self.props.setCurrentKeyboard(keyValue);
        var answerIndex = TaskPanel.self.props.getAnserIndexFromKeyValue(keyValue);
        if (TaskPanel.self.state.task_type === "classification") {
          TaskPanel.self.setState({answerIndex: answerIndex}, () => {
            TaskPanel.self.onSelectClassificationAnswer(TaskPanel.self.state.answerIndex);
          });
        }
      }
    }, true);
  }

  componentWillReceiveProps() {
  }

  componentDidUpdate(){
    if(this.props.click_go_button !== this.state.click_go_button) {
      this.setState({
        click_go_button: this.props.click_go_button,
      }, () => {
        if (this.state.click_go_button) {
          this.setState({
            tasks: this.props.tasks
          })
        }
      })
    }

    if(this.props.element_category !== this.state.element_category
        || this.props.task_type !== this.state.task_type) {
      this.setState({
        element_category: this.props.element_category,
        task_type: this.props.task_type
      })
    }

    if(this.props.cache_images !== this.state.cache_images) {
      this.setState({
        cache_images: this.props.cache_images,
      })
    }
  }

  componentDidMount() { }

  onSelectClassificationAnswer(val) {
    if (val === TaskPanel.self.state.skipped_answer_Index) {
      var answer = {
        user: 1,
        task: TaskPanel.self.state.tasks[0].id,
        value: [],
        skipped: true
      };
    } else if (val === 0) {
      answer = {
        user: 1,
        task: TaskPanel.self.state.tasks[0].id,
        value: ["None"],
        skipped: false
      };
    } else {
      answer = {
        user: 1,
        task: TaskPanel.self.state.tasks[0].id,
        value: TaskPanel.self.state.tasks[0].answers[val],
        skipped: false
      };
    }
    TaskPanel.self.props.saveAnswer(answer);
    this.deleteAnsweredTask();
    this.addTaskToCache();
  }

  onSelectCenterAnswer(val) {
    if (val === TaskPanel.self.state.skipped_answer_Index) {
      var answer = {
        user: 1,
        task: TaskPanel.self.state.tasks[0].id,
        value: [],
        skipped: true
      };
    } else if (val===0) {
      answer = {
        user: 1,
        task: TaskPanel.self.state.tasks[0].id,
        value: ["None"],
        skipped: false
      };
    } else {
      answer = {
        user: 1,
        task: TaskPanel.self.state.tasks[0].id,
        value: [parseFloat((val.x+75)/CONTAINER_WIDTH).toFixed(2), parseFloat((val.y+75)/CONTAINER_HEIGHT).toFixed(2)],
        skipped: false
      };
    }
    TaskPanel.self.props.saveAnswer(answer);
    TaskPanel.self.deleteAnsweredTask();
    TaskPanel.self.addTaskToCache();
  }

  onSelectBoundingBoxAnswer(val) {
    var answer = {
      user: 1,
      task: TaskPanel.self.state.tasks[0].id,
      value: val,
      skipped: false
    };
    if (val !== 0) {
      TaskPanel.self.props.saveAnswer(answer);
    }
    TaskPanel.self.deleteAnsweredTask();
    TaskPanel.self.addTaskToCache();
  }

  onChangeCenterPosition(pos) {
    this.setState({
        center_position_x: pos.x+75,
        center_position_y: pos.y+75
      });
  }

  deleteAnsweredTask() {
    var deleted_task_id = this.state.tasks[0].id;
    var tasks = this.state.tasks.slice(1, );
    this.setState({
      deleted_task_ids:this.state.deleted_task_ids.concat(deleted_task_id),
      tasks: tasks,
      count_of_task: parseInt(this.state.count_of_task) - 1
    },() => {
      if (this.state.count_of_task === 0) {
        var message = {
          open: true,
          message: 'No Task Found',
          variant: 'warning'
        }
        this.props.openNotification(message);
      } else {
        this.props.saveTasksToStroe(this.state.tasks);
      }
    })
  }

  addTaskToCache() {
    var filter = {
      page: 1,
      element_category: this.state.element_category,
      task_type: this.state.task_type
    };
    this.props.getTasks(filter).then((response) => {
      var filtered_task_ids = this.compareWithDeletedIds(response);
      var count_of_task = filtered_task_ids.length;
      this.saveCacheImage(response)
      this.setState({
        cache_images: this.saveCacheImage(response),
        tasks: filtered_task_ids,
        count_of_task: count_of_task,
        deleted_task_ids: []
      })
    })
  }

  compareWithDeletedIds(response) {
    var deleted_ids = this.state.deleted_task_ids;
    var tasks = [];
    response.map(task=>{
      if (deleted_ids.indexOf(task.id) === -1) {
        return tasks.push(task);
      } else {
        return null;
      }
    });
    return tasks
  }

  saveCacheImage(resp) {
    var new_images = [];
    var previous_images = this.state.cache_images;
    resp.map(task => {
      var len_answer = task.answers.length;
      for (var i = 0; i < len_answer; i++) {
        if (previous_images.indexOf(task.answers[i][1]) === -1) {
          previous_images.push(task.answers[i][1]);
          new_images.push(task.answers[i][1]);
          this.setState({
            cache_images: previous_images
          })
        } else {
        }
        if (previous_images.indexOf(task.image_url) === -1) {
          previous_images.push(task.image_url);
          new_images.push(task.image_url);
          this.setState({
            cache_images: previous_images
          })
        }
      }
      return previous_images;
    });
    return previous_images;
  }

  renderSwitch(param) {
    switch(param.task_type) {
      case 'classification':
        return <ClassficationPanel task={param} onSelectAnswer={this.onSelectClassificationAnswer}/>;
      case 'center':
        return <CenterPanel task={param} onSelectAnswer={this.onSelectCenterAnswer} onChangeCenterPosition={this.onChangeCenterPosition}/>;
      case 'boundingbox':
        return <BoundingBoxPanel task={param} onSelectAnswer={this.onSelectBoundingBoxAnswer}/>;
      default:
        return 'foo';
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container justify="center">
        {
          this.state.tasks[0] && (
            <Card className={classes.card}>
              <CardHeader color="primary">
                 <Grid item container className={classes.header_style}>
                    <Grid item sm={9}>
                      <Grid item container sm={12}
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className={classes.cardTitleWhite}
                      >
                        {this.state.tasks[0].task_type}&nbsp;
                      </Grid>
                      <Grid item sm={12}  container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className={classes.cardCategoryWhite}
                      >
                        Element category : <a href="">{this.state.tasks[0].element_category}</a> &nbsp;&nbsp;&nbsp;
                        Element type : <a>{this.state.tasks[0].element_type}</a> &nbsp;&nbsp;&nbsp;
                        Priority : <a>{this.state.tasks[0].priority}</a>&nbsp;&nbsp;&nbsp;
                        External ID : <a>{this.state.tasks[0].external_id}</a>&nbsp;&nbsp;&nbsp;
                        {/*Position : <a>{this.state.center_position_x}</a>, &nbsp;<a>{this.state.center_position_y}</a>*/}
                      </Grid>
                    </Grid>
                    <Grid item sm={3} className={classes.divider}
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item>
                        <Button size="large"  variant="contained" color="primary"
                          className={classes.skip_button} disabled={this.state.disableGoButton}
                          onClick={ () => this.onSelectClassificationAnswer(this.state.skipped_answer_Index) }>
                          SKIP
                          <Icon className={classes.rightIcon}>send</Icon>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
              </CardHeader>
              <CardBody>
                <Grid container>
                  {this.renderSwitch(this.state.tasks[0])}
                </Grid>
              </CardBody>
            </Card>
          )
        }
        <PreCacheImg
          images={this.state.cache_images}
        />
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  click_go_button: state.filterReducer.click_go_button,
  element_category: state.filterReducer.element_category,
  task_type: state.filterReducer.task_type,
  tasks: state.taskReducer.tasks,
  cache_images: state.taskReducer.cache_images,
  count_of_task: state.taskReducer.count_of_task,
  page_index: state.taskReducer.page_index,
  max_page_number: state.taskReducer.max_page_number,
});

const mapDispatchToProps = (dispatch) => ({
  getTasks: (page) => getTasks(page),
  saveAnswer: (answer) => saveAnswer(answer),
  getValueFromAscii:(key) => getValueFromAscii(key),
  getAnserIndexFromKeyValue:(key) => getAnserIndexFromKeyValue(key),
  clickGoButton:(status) => dispatch({type: CLICK_GO_BUTTON, payload: status}),
  saveTasksToStroe:(tasks) => dispatch({type: SAVE_TASKS, payload: tasks}),
  setPageIndex:(index) => dispatch({type: PAGE_INDEX, payload: index}),
  openNotification: (message) => dispatch(actions.openNotification(message)),
  setCurrentKeyboard: (keyValue) => dispatch(actions.setCurrentKeyboard(keyValue)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TaskPanel));
