import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';

import { SET_TASK_TYPE } from "../../actions/actionTypes";
import {styles} from './style';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, that) {
  return {
    fontWeight: 500,
  };
}

class TaskType extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      names: ["classification", "center", "boundingbox"],
      name: [],
    };
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
    this.props.onSelectTaskType(event.target.value);
    this.props.setTaskType(event.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple">Task Type</InputLabel>
          <Select
            value={this.state.name}
            onChange={this.handleChange}
            input={<Input id="select-multiple" />}
            MenuProps={MenuProps}
          >
            {this.state.names.map(name => (
              <MenuItem key={name} value={name} style={getStyles(name, this)}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setTaskType:(task_type) => dispatch({type: SET_TASK_TYPE, payload: task_type})
});

TaskType.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(withStyles(styles, { withTheme: true })(TaskType));