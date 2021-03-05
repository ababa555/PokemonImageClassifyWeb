import React from 'react';
import './App.scss';
import clsx from 'clsx';
import Routes from './Routes';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import * as H from 'history';

import Menu from './components/menu/Menu';

type ContentProps = {
  history: H.History;
}

const useStyle = makeStyles(theme => ({
  main: {
    height: "100%",
    width: "100%",
    marginTop: "100px",
  },
  mainModal: {
    pointerEvents:"none",
    opacity: 0.1,
  }
}));

const App: React.FC<ContentProps> = (props) => {
  const classes = useStyle();
  const [className, setClassName] = React.useState(clsx(classes.main));

  return (
    <React.Fragment>
      <CssBaseline />
      <Menu 
        history={props.history} 
        onOpen={(open: boolean) => {
          setClassName(clsx(classes.main, { [classes.mainModal]: open }))
        }} 
      />
      <Container>
        <div className={className}>
          <Routes/>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default App;
