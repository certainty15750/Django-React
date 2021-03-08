export const styles = theme => ({
    button: {
        width:"100%",
        height: "50px",
        marginTop: "10px"
    },
    filter_element: {
        width: "100%",
        height: "70px"
    },
    task_type: {
        width: 200,
        padding: 25,
        border: `1px solid rgba(63, 81, 181, 0.5)`,
        marginLeft: 30,
        marginRight: 50,
        '&:hover': {
            border: `1px solid #3f51b5`,
        }
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    margin: {
        margin: theme.spacing.unit,
    },
    textField: {
        width:"300px",
        flexBasis: 2,
        flexWrap: 'nowrap',
        flexDirection: 'row',
    },
});