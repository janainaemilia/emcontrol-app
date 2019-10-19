import './css/style.css'

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { bindActionCreators } from 'redux'

import { logout } from '../../actions/authActions'
import { connect } from 'react-redux'

import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import Explorer from '@material-ui/icons/Explore'
import Add from '@material-ui/icons/Add'
import Settings from '@material-ui/icons/Settings'
import Build from '@material-ui/icons/Build'
import FormatListBulleted from '@material-ui/icons/FormatListBulleted'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockOpen from '@material-ui/icons/LockOpen'

import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'

import logo from '../../common/images/logo2.png'
const drawerWidth = 240

import If from '../operator/if'

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#17516dd9'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  logo: {
      width: '160px'
  },
  logoImage: {
    width: '115px',
    margin: '0px auto',
  }
});

/**
 * Header
 * @class
 * @memberof Commom
 */
class Header extends Component {
    constructor(props){
        super(props)
        this.state = { open: false, openItem: false, tabs: { avaliacoes: false, manutencoes: false, equipametos: false, perfil: false } }
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
        this.handleDrawerClose = this.handleDrawerClose.bind(this)
        this.handleItem = this.handleItem.bind(this)
        this.routeChange = this.routeChange.bind(this)
        this._logout = this._logout.bind(this)
    }

    handleDrawerOpen() {
        this.setState({ open: true })
    }
    
    handleDrawerClose() {
        this.setState({ open: false })
    }

    handleItem(tab) {
        
        let tabs = this.state.tabs 

        let oldState = tabs[tab]

        for (let i = 0; i < tabs.length; i++)
            tabs[i] = false

        tabs[tab] = !oldState
        
        this.setState({ ...this.state, tabs: tabs })        
    }

    routeChange(route){
        this.props.history.push(route)
    }

    _logout(){
        this.props.logout()
        this.props.history.push('/')
    }
    
	/**
	 * 
	 */
	render() {
        const { classes, theme } = this.props
        const { open, tabs } = this.state

        return (
            <If test={this.props.auth.validToken}>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar position="fixed"
                            className={classNames(classes.appBar, {
                                [classes.appBarShift]: open,
                            })}>
                        <Toolbar disableGutters={!open}>
                            <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                            >
                            <MenuIcon />
                            </IconButton>                            
                            <Typography variant="h6" color="inherit" noWrap>
                                EMControl
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}>
                        <div className={classes.drawerHeader}>
                            <IconButton className={'headerDrawer'} onClick={this.handleDrawerClose}>
                            <div className={classes.logo}>
                                <img src={logo} className={classes.logoImage} alt="EMControl" />
                            </div>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            <ListItem button key={'explorar'} onClick={() => this.routeChange('/explorar')}>
                                <ListItemIcon><Explorer /></ListItemIcon>
                                <ListItemText primary={'Explorar'} />
                            </ListItem>
                            {/* <ListItem button key={'avaliacoes'} onClick={() => this.routeChange('/avaliacoes')}>
                                <ListItemIcon><Assessment /></ListItemIcon>
                                <ListItemText primary={'Avaliações'} />
                            </ListItem> */}
                            {/* <ListItem button key={'avaliacoes'} onClick={() => this.handleItem('avaliacoes')}>
                                <ListItemIcon><Assessment /></ListItemIcon>
                                <ListItemText primary={'Avaliações'} />
                                {tabs.avaliacoes ? <ExpandLess /> : <ExpandMore />}                                
                            </ListItem>
                            <Collapse in={tabs.avaliacoes} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button key={'avaliar-equipamento'} className={classes.nested} onClick={() => this.routeChange('/avaliar-equipamento')}>
                                        <ListItemIcon>
                                            <Add />
                                        </ListItemIcon>
                                        <ListItemText inset primary="Avaliar Equipamento" />
                                    </ListItem>
                                </List>
                            </Collapse> */}
                            <ListItem button key={'manutencoes'} onClick={() => this.routeChange('/manutencoes')}>
                                <ListItemIcon><Settings /></ListItemIcon>
                                <ListItemText primary={'Manutenções'} />
                            </ListItem>
                            {/* <ListItem button key={'manutencoes'} onClick={() => this.handleItem('manutencoes')}>
                                <ListItemIcon><Settings /></ListItemIcon>
                                <ListItemText primary={'Manutenções'} />
                                {tabs.manutencoes ? <ExpandLess /> : <ExpandMore />}                             
                            </ListItem>
                            <Collapse in={tabs.manutencoes} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button key={'nova-manutencao'} className={classes.nested} onClick={() => this.routeChange('/new-manutencao')}>
                                        <ListItemIcon>
                                            <Add />
                                        </ListItemIcon>
                                        <ListItemText inset primary="Novo" />
                                    </ListItem>
                                </List>
                            </Collapse> */}
                            <ListItem button key={'meu-equipamentos'} onClick={() => this.handleItem('equipamentos')}>
                                <ListItemIcon><Build /></ListItemIcon>
                                <ListItemText primary={'Equipamentos'} />
                                {tabs.equipamentos ? <ExpandLess /> : <ExpandMore />}                                
                            </ListItem>
                            <Collapse in={tabs.equipamentos} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button key={'add-equipamento'} className={classes.nested} onClick={() => this.routeChange('/new-equipament')}>
                                        <ListItemIcon>
                                            <Add />
                                        </ListItemIcon>
                                        <ListItemText inset primary="Novo" />
                                    </ListItem>
                                    <ListItem button key={'list-equipament'} className={classes.nested} onClick={() => this.routeChange('/meus-equipamentos')}>
                                        <ListItemIcon>
                                            <FormatListBulleted />
                                        </ListItemIcon>
                                        <ListItemText inset primary="Meus Equipamentos" />
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem button key={'perfil'} onClick={() => this.handleItem('perfil')}>
                                <ListItemIcon><AccountCircle /></ListItemIcon>
                                <ListItemText primary={'Meu Perfil'} />
                                {tabs.perfil ? <ExpandLess /> : <ExpandMore />}                                
                            </ListItem> 
                            <Collapse in={tabs.perfil} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button key={'editar-perfil'} className={classes.nested} onClick={() => this.routeChange('/edit-profile')}>
                                        <ListItemIcon>
                                            <FormatListBulleted />
                                        </ListItemIcon>
                                        <ListItemText inset primary="Editar" />
                                    </ListItem>
                                    <ListItem button key={'logout'} className={classes.nested} onClick={() => this._logout()}>
                                        <ListItemIcon>
                                            <LockOpen />
                                        </ListItemIcon>
                                        <ListItemText inset primary="Logout" />
                                    </ListItem>
                                </List>
                            </Collapse>                                                      
                        </List>
                    </Drawer>                    
                </div>
            </If>        
        )
	}
}

const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({logout}, dispatch)
export default withRouter(withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Header)))