import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'

import { saveToServer } from '../../actions/equipamentoActions'

import Image from 'material-ui-image'

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing.unit,
  },
  cards: {
    width: '100%',
    display: 'inline',   
  },
  card: {
    marginRight: theme.spacing.unit * 3,
    marginTop: 30,
    float: 'left',
    marginLeft: '2%',
    minWidth: '250px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  }
})

// CSID: 011090882699678625902:fzwipgrd9us
// API Custom Search: AIzaSyA-JSthcnoGYFQXqhq6GIzYIr5cz_wr70c

const GoogleImages = require('google-images')
const client = new GoogleImages('011090882699678625902:fzwipgrd9us', 'AIzaSyA-JSthcnoGYFQXqhq6GIzYIr5cz_wr70c');

class Modal extends React.Component {
  constructor(props){
    super(props)
    this.state = { client: null, open: true, fullWidth: true,
                   maxWidth: 'sm', data: props.dados, images: [], selectedImages: [] }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  componentWillMount(){
    let param = this.state.data.nome
    let resultList = []

    if(param != null){
      client.search(param)
      .then(images => {
        images.forEach(image => {
          resultList.push(image)
        })
        console.log("resultList",resultList)
        this.setState({ ...this.state, images: resultList })
      })
    }
  }

  handleClickOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleMaxWidthChange(event) {
    this.setState({ maxWidth: event.target.value })
  }

  handleFullWidthChange(event) {
    this.setState({ fullWidth: event.target.checked })
  }

  handleSave(){
    this.props.saveToServer(this.state.selectedImages)
  }

  selectedItem(item){
    let list = this.state.selectedImages
    
    let date = new Date()
    let nome = date.valueOf(); 
    
    let ext = item.url.split('')
    ext = ext[ext.length-4] + ext[ext.length-3] + ext[ext.length-2] + ext[ext.length-1]
    
    let numeroPatrimonio = this.state.data['numero-serie']

    list.push({url: item.url, nome: nome + ext, numeroPatrimonio: numeroPatrimonio })
    console.log(list)

    this.setState({ selectedImages: list})
  }

  renderImages(){
    const { classes } = this.props
    let list = this.state.images || []

    return list.map((item, index) => (
      <Card className={classes.card} key={index}>
          <Image src={item.url} onClick={() => this.selectedItem(item)}/>
      </Card>
    ))
  }

  render() {
    return (
      <React.Fragment>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Selecione as imagens do seu produto</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Você pode selecionar até 3 imagens para vincular a seu produto.
            </DialogContentText>
            { this.renderImages()}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button onClick={this.handleSave} color="secondary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

Modal.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch => bindActionCreators({ saveToServer }, dispatch)
export default withStyles(styles)(connect(null, mapDispatchToProps)(Modal))
