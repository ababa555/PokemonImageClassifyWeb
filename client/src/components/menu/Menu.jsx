import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { BlockOutlined, Home as HomeIcon } from '@material-ui/icons';

const Menu = (props) => {
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => {
    const o = !open
    setOpen(o)
    props.onOpen(o)
  } 

  return (
    <div className="menu-root">
      <ClickAwayListener onClickAway={() => {
        setOpen(false)
        props.onOpen(false)
      }}>
      <AppBar
        position="fixed"
        className="appbar"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleOpen}
            edge="start"
            className="menuButton"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            ポケモン画像判定
          </Typography>
        </Toolbar>
      </AppBar>
      </ClickAwayListener>
      <Drawer
        className="drawer"
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: "drawerPaper"
        }}
      >
        <div className="toolbar" />
        <List>
          <ListItem button key="home" onClick={() => props.history.push('/')}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="ホーム" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {['Coming soon'].map((text, index) => (
            <ListItem button key={text}
            onClick={() => {}}
            >
              <ListItemIcon><BlockOutlined /></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default Menu;