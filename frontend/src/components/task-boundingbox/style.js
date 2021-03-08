import crosshair from '../../access/images/crosshair_100.png'
import { CONTAINER_WIDTH, CONTAINER_HEIGHT } from "../../constants/Utile";

export const styles = theme => ({
  button: {
    width: '100%',
    height: '100%',
  },

  imagebox: {
    height: '500px',
    paddingBottom: theme.spacing.unit
  },
  image_container: {
    position: 'absolute',
    width: CONTAINER_WIDTH,
    height: CONTAINER_HEIGHT,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    position: 'absolute',
    border: `1px solid rgba(63, 81, 181, 0.5)`,
    backgroundColor:'rgba(63, 81, 181, 0.3)'
  },
  NoneBtn: {
    height: '70px',
    width: '100%',
    paddingBottom: theme.spacing.unit
  },
  cross_hair: {
    width: "150px",
    height: "150px",
    backgroundImage: `url(${crosshair})`
  },
  canvas: {
    position:"absolute",
    top:"0px",
    left:"0px",
    width:"100%",
    height: "100%",
    zIndex: "100000"
  }
});