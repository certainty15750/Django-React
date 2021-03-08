export const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 5,
    paddingTop: theme.spacing.unit * 2
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
    marginLeft: "20%",
    width: "60%"
  },
  infoPanel: {
    borderBottom: `4px solid ${theme.palette.divider}`
  },
  taskPanel: {
    paddingTop: theme.spacing.unit * 2
  },
  nav_bar: {
    width:"100%important"
  }
});