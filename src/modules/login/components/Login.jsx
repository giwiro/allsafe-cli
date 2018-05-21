// @flow
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import posed from 'react-pose'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import logo from '../../../assets/images/icon/128x128.png';

import style from './Login.scss';

type Props = {};

type State = {
  password: string,
  inputShow: boolean,
  isValidating: boolean,
};

const TIMER_DURATION = 3000;

const EntranceAnimated = posed.div({
  idle: { scale: 1 },
  hidden: { scale: 0 },
});

export default class Login extends Component<void, State> {
  timerHelper: TimeoutID;
  state = {
    password: '',
    inputShow: false,
    isValidating: false,
  };

  startTimer() {
    this.timerHelper = setTimeout(() =>
      this.setState({ inputShow: false }), TIMER_DURATION);
  }

  resetTimer() {
    clearTimeout(this.timerHelper);
    this.timerHelper = setTimeout(() =>
      this.setState({ inputShow: false }), TIMER_DURATION);
  }

  handleChange(e: Event) {
    this.resetTimer();
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        password: e.target.value,
      });
    }
  }

  onStart(e: Event) {
    this.setState({
      inputShow: true,
    });
    this.startTimer();
  }

  onSubmit(e: Event) {
    e.preventDefault();
    this.setState({
      isValidating: true,
    });
  }

  render() {
    const { password, inputShow, isValidating } = this.state;

    return (
      <main className={style.loginWrap}>
        <EntranceAnimated pose={inputShow ? 'hidden' : 'idle'}
                          className={style.centered}>
          <Button type="button"
                  variant="outlined"
                  size="large"
                  color="primary"
                  onClick={this.onStart.bind(this)}>
            Start
          </Button>
        </EntranceAnimated>
        <EntranceAnimated pose={inputShow ? 'idle' : 'hidden'}
                          className={style.centered}>
          <Paper>
            <Paper zDepth={1}
                   className={style.paperLogo}
                   style={{ overflow: 'hidden' }}>
              <img src={logo}
                   className={style.logo}
                   draggable="false"
                   alt="logo"/>
            </Paper>
            <form className={style.loginForm}
                  onSubmit={this.onSubmit.bind(this)}>
              <TextField
                id="password"
                label="Password"
                value={password}
                autoFocus
                fullWidth
                onChange={this.handleChange.bind(this)}
                margin="normal"
                disabled={isValidating}
              />
              <br/>
              <Button type="submit"
                      variant="outlined"
                      size="medium"
                      color="primary"
                      fullWidth
                      disabled={isValidating}>
                Validate
              </Button>
            </form>
          </Paper>
        </EntranceAnimated>
      </main>
    );
  }
}
