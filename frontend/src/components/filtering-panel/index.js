import React, {Component} from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';

import ElementCategoryComponent from "../element-category/index.js";
import TaskTypeComponent from "../task-type/index.js";

import * as actions from '../../actions/actionTypes';
import { getTasks } from '../../actions/ChildrenApi';

import { styles } from "./style";

class FilterPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTaskType: false,
      selectedElementCategory: false,
      disableGoButton: true,
      max_answer_index: 5,
      cache_images: props.cache_images,
    };

    this.onSelectTaskType = this.onSelectTaskType.bind(this);
    this.onSelectElementCategory = this.onSelectElementCategory.bind(this);
    this.onClickGoButton = this.onClickGoButton.bind(this);
  }

  componentWillReceiveProps() {
     if(this.props.cache_images !== this.state.cache_images) {
      this.setState({
        cache_images: this.props.cache_images,
      })
    }
  }

  onSelectTaskType(val) {
    if (this.state.selectedElementCategory) {
      this.setState ({
        selectTaskType:val,
        disableGoButton: false
      })
    } else {
      this.setState ({
        selectTaskType:val
      })
    }
  }

  onSelectElementCategory(val) {
    if (this.state.selectTaskType) {
      this.setState({
        selectedElementCategory:val,
        disableGoButton: false
      })
    } else {
      this.setState ({
        selectedElementCategory:val
      })
    }
  }

  onClickGoButton(prop) {
    var filter = {
      page: 1,
      element_category: this.state.selectedElementCategory,
      task_type: this.state.selectTaskType
    };

    this.props.getTasks(filter).then((response) => {
      var total = response.length;
      var max_page_number = Math.round(total/this.state.max_answer_index);
      this.props.setMaxPageNumber(max_page_number);
      this.props.saveTasksToStroe(response);
      this.props.setPageIndex(1);
      this.props.setCountOfTask(response.length);
      this.props.setCacheImages(this.saveCacheImage(response));
      if(total === 0) {
        this.props.clickGoButton(false);
        var message = {
          open: true,
          message: 'No Task Found',
          variant: 'warning'
        }
        this.props.openNotification(message);
      } else {
        this.props.clickGoButton(false);
        this.props.clickGoButton(true);
      }
    })
  }

  saveCacheImage(resp) {
    var previous_images = [];
    resp.map(task => {
      var len_answer = task.answers.length;
      previous_images.push(task.image_url);
      for (var i = 0; i < len_answer; i++) {
        if (previous_images.indexOf(task.answers[i][1]) === -1) {
          previous_images.push(task.answers[i][1]);
        }

      }
      return previous_images;
    });
    return previous_images
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={16}>
        <Grid item sm={4}>
           <TaskTypeComponent onSelectTaskType = {this.onSelectTaskType}></TaskTypeComponent>
        </Grid>
        <Grid item sm={4}>
          <ElementCategoryComponent onSelectElementCategory = {this.onSelectElementCategory}></ElementCategoryComponent>
        </Grid>
        <Grid item sm={4}>
          <Button size="large"  variant="contained" color="primary"
            className={classes.button} disabled={this.state.disableGoButton}
            onClick={ this.onClickGoButton }>
            GO
            <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  cache_images: state.taskReducer.cache_images,
});

const mapDispatchToProps = (dispatch) => ({
  getTasks: (filter) => getTasks(filter),
  clickGoButton:(status) => dispatch({type: actions.CLICK_GO_BUTTON, payload: status}),
  saveTasksToStroe:(tasks) => dispatch({type: actions.SAVE_TASKS, payload: tasks}),
  setCountOfTask:(count) => dispatch({type: actions.COUNT_OF_TASK, payload: count}),
  setPageIndex:(index) => dispatch({type: actions.PAGE_INDEX, payload: index}),
  setCacheImages:(images) => dispatch({type: actions.SET_CACHE_IMAGES, payload: images}),
  setMaxPageNumber:(number) => dispatch({type: actions.MAX_PAGE_NUMBER, payload: number}),
  openNotification: (message) => dispatch(actions.openNotification(message))
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilterPanel));