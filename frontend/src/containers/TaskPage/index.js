import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import FilteringPanelComponent from "../../components/filtering-panel/index.js";
import TaskPanelComponent from "../../components/task-panel/index.js"
import NavBar from "../../components/nav-bar/index.js";
import * as actions from '../../actions/actionTypes';

import { MySnackbarContent } from "../../util/Notification/MySnackbarContent";
import { styles1 } from "../../util/Notification/style";

import { styles } from "./style";

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

class TaskPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.notification_open,
      message: props.notification_message,
      variant: props.notification_variant,
      click_go_button: this.props.click_go_button,
      visible_task_panel: false
    }
  }

  componentWillMount(){
      document.body.style.overflow = "hidden";
  }

  componentDidUpdate(){
    if(this.props.click_go_button !== this.state.click_go_button) {
      this.setState({
        click_go_button: this.props.click_go_button,
        visible_task_panel: this.props.click_go_button
      })
    }
    if(this.props.notification_open !== this.state.open || this.props.notification_message !== this.state.message
      || this.props.notification_variant !== this.state.variant) {
      this.setState({
        open: this.props.notification_open,
        message: this.props.notification_message,
        variant: this.props.notification_variant
      })
    }

  }

  handleClose = () => {
    this.setState({ open: false });
    var message = {
          open: false,
          message: 'No Task Found',
          variant: 'warning'
        }
        this.props.openNotification(message);
  };

  render() {
    const { classes } = this.props;
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />
    }
    return (
      <Grid>
        <NavBar color="primary" className={classes.nav_bar}></NavBar>
        <Grid container justify="center" className={classes.root} spacing={16}>
          <Grid item xs={12} >
            <Paper className={classes.control}>
              <Grid container>
                <FilteringPanelComponent></FilteringPanelComponent>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} >
            <Grid container className={classes.taskPanel}>
              <TaskPanelComponent></TaskPanelComponent>
            </Grid>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
          variant={this.state.variant}
          className={classes.margin}
          message={this.state.message}
          />
        </Snackbar>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  click_go_button: state.filterReducer.click_go_button,
  key_press: state.filterReducer.click_go_button,
  isAuthenticated: state.authReducer.isAuthenticated,
  notification_open: state.notificationReducer.notification_open,
  notification_message: state.notificationReducer.notification_message,
  notification_variant: state.notificationReducer.notification_variant
});

const mapDispatchToProps = (dispatch) => ({
    openNotification: (message) => dispatch(actions.openNotification(message))
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TaskPanel));
