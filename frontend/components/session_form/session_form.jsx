import React from 'react';
import { Link, withRouter } from 'react-router';
import { Dialog,
         FlatButton,
         RaisedButton,
         TextField } from 'material-ui';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const buttonStyle = {
  width: '100%'
}

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      open: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  componentDidUpdate() {
    this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn() {
    if (this.props.loggedIn) {
      this.props.router.push("/");
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    this.props.processForm({user});
  }

  handleGuestLogin(e){
    e.preventDefault();
    const user = {
      username: 'guest',
      password: 'password'
    };
    this.props.login({user});
  }

  render() {
    let text, link, linkText, linkDesc, guestLogin;
    if (this.props.formType === "login") {
      text = "Log In";
      link = '/signup';
      linkDesc = "Want an account kiddo?"
      linkText = 'Sign Up';
    } else {
      text = 'Sign up';
      link = '/login';
      linkDesc = 'Have an acount?';
      linkText = 'Log In;'
      guestLogin = (
        <FlatButton label='Guest Login' secondary={true} onClick={this.handleGuestLogin}/>
      )
    }
    return (
      <div className='session-form'>
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Dialog open={this.state.open} onRequestClose={this.handleOpen}>
            <div className="login-form-container">
            <form onSubmit={this.handleSubmit} className="login-form-box">
              <div className="login-form">
                  <TextField type="text"
                    hintText = "Username"
                    floatingLabelText="Username"
                    value={this.state.username}
                    onChange={this.update("username")}
                    className="login-input" />
                  <TextField type="password"
                    hintText = "Username"
                    floatingLabelText="Username"
                    value={this.state.password}
                    onChange={this.update("password")}
                    className="login-input" />
                  <br/>
                  <FlatButton label={text} type="submit" style={buttonStyle} />
                  <br/>
                  {guestLogin}
              </div>
            </form>
            </div>
          <Link to={link}>{linkText}</Link>
        </Dialog>
      </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(SessionForm);