import React, { Component} from "react"
import Webcam from "react-webcam"

import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import Paper from '@material-ui/core/Paper'
import CameraAlt from '@material-ui/icons/CameraAlt'
import IconButton from '@material-ui/core/IconButton'


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        marginTop: '116px !important',
        [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
          width: '33%',
          margin: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
    },
    divWebcam: {
      position: 'absolute',
      top: '0',
      zIndex: '9999',
      background: 'rgba(0,0,0,0.5)',
      width: '100%',
      height: '-webkit-fill-available',
      left: '0',
    },
    webcam: {
      width:'100%'
    },
    video: {
      marginTop: '-30px'
    },
    iconButton: {
      marginTop: '-45px',
      background: '#3f596642'
    },
    buttonExit: {
      width:' 40px !important',
      height:' 40px !important',
      padding:' 0 0',
      borderRadius:' 30px',
      position:' absolute',
      margin:' -34px 16%',
      background:' #124c62',
      color:' white',
      fontSize:' 11px',
      border: 'none',
      outline: 'none'
    }
  });

class ModalWebCam extends Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = () => {
    const screenshot = this.webcam.getScreenshot()
    this.props.setScreenshot(screenshot)
    console.log(screenshot)
    this.props.showModal()
  }

  render() {
    const videoConstraints = {
      facingMode: "user"
    }
    
    const { classes } = this.props

    return (
      <div className={classes.divWebcam}>
        <main className={classes.main}>          
          <CssBaseline />
          <Paper className={classes.paper}>
            <button type='button' className={classes.buttonExit} onClick={this.props.showModal}>x</button>
            <h5>Tire a foto do equipamento</h5>
            <div className={classes.video}>
              <Webcam
                audio={true}
                height={400}
                width={400}
                ref={node => this.webcam = node}
                screenshotFormat="image/jpeg"
                minScreenshotHeight={100}
                minScreenshotWidth={100}
                style={{width: '100%'}}
                videoConstraints={videoConstraints}
              />
            </div>      
            <IconButton className={classes.iconButton} aria-label="Search" onClick={this.handleClick}>
                <CameraAlt />
            </IconButton>      
          </Paper>          
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(ModalWebCam)