import React, {Component} from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import classNames from 'classnames';
import { styles } from './style'

class TaskClassification extends Component {
  constructor(props) {
    super(props);
    this.state ={
      task :props.task
    }
  }

  componentWillReceiveProps(){ };

  componentDidUpdate(){
    if (this.state.task !== this.props.task_reducer.tasks[0]) {
      this.setState({
        task: this.props.task_reducer.tasks[0]
      })
    }
  }


  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item container>
          <Grid item sm={12} container spacing={8} className={classes.topBtnGroup}>
            <Grid sm={3} item >
              <Button variant="outlined" color="primary" className={classes.button} onClick={(e)=>{ this.props.onSelectAnswer(5) }}>
                <div className={classNames(classes.cover_button, classes.color_0)}></div>
                <img src={this.state.task.answers[5][1]} className={classes.image_button}/>
                <div  className={classes.text}>
                  {this.state.task.answers[5][0]}
                </div>
              </Button>
            </Grid>
            <Grid sm={6} justify="center" item container>
                <Button variant="outlined" color="primary" className={classes.button} onClick={(e)=>{ this.props.onSelectAnswer(6) }}>
                  <Grid item sm={5}>
                    <div className={classNames(classes.cover_button, classes.color_1)}></div>
                    <img src={this.state.task.answers[6][1]} className={classes.image_button}/>
                    <div  className={classes.text}>
                      {this.state.task.answers[6][0]}
                    </div>
                  </Grid>
                </Button>
            </Grid>
            <Grid sm={3} item >
              <Button variant="outlined" color="primary" className={classes.button} onClick={(e)=>{ this.props.onSelectAnswer(7)} }>
                <div className={classNames(classes.cover_button, classes.color_2)}></div>
                <img src={this.state.task.answers[7][1]} className={classes.image_button}/>
                <div  className={classes.text}>
                  {this.state.task.answers[7][0]}
                </div>
              </Button>
            </Grid>
          </Grid>

          <Grid item sm={12} container spacing={8} className={classes.middleBtnGroup}>
            <Grid sm={3} item>
              <Button variant="outlined" color="primary" className={classes.button} onClick={(e)=>{ this.props.onSelectAnswer(3)} }>
                <div className={classNames(classes.cover_button, classes.color_3)}></div>
                <img src={this.state.task.answers[3][1]} className={classes.center_image_button}/>
                <div  className={classes.text_middle}>
                  {this.state.task.answers[3][0]}
                </div>
              </Button>
            </Grid>
            <Grid sm={6} item className={classes.image_container}>
              <img src={this.state.task.image_url} className={classes.image}/>
            </Grid>
            <Grid sm={3} item>
              <Button variant="outlined" color="primary" className={classes.button} onClick={(e)=>{ this.props.onSelectAnswer(4)} }>
                <div className={classNames(classes.cover_button, classes.color_4)}></div>
                <img src={this.state.task.answers[4][1]} className={classes.center_image_button}/>
                <div  className={classes.text_middle}>
                  {this.state.task.answers[4][0]}
                </div>
              </Button>
            </Grid>
          </Grid>

          <Grid item sm={12} container spacing={8} className={classes.topBtnGroup}>
            <Grid sm={3} item >
              <Button variant="outlined" color="primary" className={classes.button} onClick={(e)=>{ this.props.onSelectAnswer(0) }}>
                <div className={classNames(classes.cover_button, classes.color_5)}></div>
                <img src={this.state.task.answers[0][1]} className={classes.image_button}/>
                <div  className={classes.text}>
                  {this.state.task.answers[0][0]}
                </div>
              </Button>
            </Grid>
            <Grid sm={6} item>
              <Button variant="outlined" color="primary" className={classes.button} onClick={(e)=>{ this.props.onSelectAnswer(1)} }>
                <div className={classNames(classes.cover_button, classes.color_6)}></div>
                <Grid item sm={5}>
                  <img src={this.state.task.answers[1][1]} className={classes.image_button}/>
                  <div  className={classes.text}>
                    {this.state.task.answers[1][0]}
                  </div>
                </Grid>
              </Button>
            </Grid>
            <Grid sm={3} item >
              <Button variant="outlined" color="primary" className={classes.button} onClick={(e)=>{ this.props.onSelectAnswer(2)} }>
                <div className={classNames(classes.cover_button, classes.color_7)}></div>
                <img src={this.state.task.answers[2][1]} className={classes.image_button}/>
                <div  className={classes.text}>
                  {this.state.task.answers[2][0]}
                </div>
              </Button>
            </Grid>
          </Grid>
          <Grid item sm={12} container className={classes.NoneBtn}>
              <Button variant="outlined" color="primary" className={classes.button} onClick={(e)=>{ this.props.onSelectAnswer(0) }}>
                <div  className={classes.text_None}>
                  None
                </div>
                <div className={classNames(classes.cover_button, classes.color_none)}></div>
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

export default withStyles(styles)(connect(mapStateToProps, null)(TaskClassification));
