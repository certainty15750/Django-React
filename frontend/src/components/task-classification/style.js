export const styles = theme => ({
  card: {
    width: "1000px",
  },
  header_style: {
    backgroundColor: "#3f51b5"
  },
  button: {
    width: '100%',
    height: '100%',
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
  },
  topBtnGroup: {
    height: '200px',
    paddingBottom: theme.spacing.unit
  },
  NoneBtn: {
    height: '70px',
    paddingBottom: theme.spacing.unit
  },
  middleBtnGroup: {
    height: '300px',
    paddingBottom: theme.spacing.unit
  },
  image_button: {
    paddingTop:"0px",
    width: '80%',
    height: 'auto',
    objectFit: 'contain',
    borderRadius: '20px'
  },
  center_image_button: {
    width: '80%',
    height: 'auto',
    objectFit: 'contain',
    borderRadius: '20px'
  },
  image: {
    marginLeft: '-4px',
    width: '100%',
    height: 'auto',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  image_container: {
    overflow: 'hidden',
    position: 'relative',
    borderRadius: '12px',
    padding: '4px',
    border: `1px solid rgba(63, 81, 181, 0.5)`,
    backgroundColor:'rgba(0, 0, 0, 0.12)'
  },
  text: {
    fontSize: "16px",
    position: 'absolute',
    top: '91%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  text_middle: {
    fontSize: "16px",
    position: 'absolute',
    top: '80%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  text_None: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontcolor: "#ffffff"
  },
   cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "18px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "12px",
    minHeight: "auto",
    fontWeight: "500",
    fontSize: "18px",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  skipbutton: {
    width: "100px",
    fontSize: "12px"
  },
  skip_button: {
    width:"100%",
    height: "50px",
    marginTop: "10px",
  },

  cover_button:{
    position:"absolute",
    top:"0px",
    left:"0px",
    width:"100%",
    height: "100%",
    opacity: "0.2"
  },
  color_0: {
    backgroundColor:"#00d3ee",
  },
  color_1: {
    backgroundColor: "#5cb860"
  },
  color_2: {
    backgroundColor: "#ffa21a"
  },
  color_3: {
    backgroundColor: "#f55a4e"
  },
  color_4: {
    backgroundColor: "#af2cc5"
  },
  color_5: {
    backgroundColor: "#87ff75"
  },
  color_6: {
    backgroundColor: "#0809ff"
  },
  color_7: {
    backgroundColor: "#27ff3a"
  },
  color_8: {
    backgroundColor: "#ffed0d"
  },
  color_none: {
    opacity:'0.6!important',
    backgroundColor: "#3f51b5"
  }
});