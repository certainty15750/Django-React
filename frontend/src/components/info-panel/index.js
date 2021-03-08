import React, {Component} from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    divider: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        marginBottom: '10px'
    }
});

class InfoPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            element_category:props.element_category,
            task_type: props.task_type
        }
    }

    componentDidUpdate(){
        if(this.props.element_category !== this.state.element_category
                || this.props.task_type !== this.state.task_type) {
            this.setState({
                element_category: this.props.element_category,
                task_type: this.props.task_type
            })
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container>
                <Grid item sm={9}>
                    <Grid item sm={12}  container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        {this.state.task_type}&nbsp;
                    </Grid>
                    <Grid item sm={12}  container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >

                        Element category : {this.state.element_category} &nbsp;&nbsp;&nbsp;
                        Element type : Fish &nbsp;&nbsp;&nbsp;
                        Priority : 29384 
                    </Grid>
                </Grid>
                <Grid item sm={3} className={classes.divider}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Button  size="large" variant="contained" color="primary" className={classes.button}
                            onClick={(e)=>{
                                console.log(this.props.element_category)
                                }
                            }
                        >
                            Skip
                            <Icon className={classes.rightIcon}>send</Icon>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    element_category: state.filterReducer.element_category,
    task_type: state.filterReducer.task_type,
});


export default withStyles(styles)(connect(mapStateToProps, null)(InfoPanel));