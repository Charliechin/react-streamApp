import React from 'react'


class GoogleAuth extends React.Component {

  state = { isSignedIn: null }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: '31869013918-vhnep3a3jfij0uq4mfndcvgsjpkdgqio.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() })
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  }


  onSignInClick = () => {
    this.auth.signIn();
    this.auth.signOut()
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {

      return (
        <button onClick={this.onSignOutClick} className="ui green image label" >
          <img alt="iconcillo" src="https://semantic-ui.com/images/avatar/small/christian.jpg" />
            Carlos Diaz
          <div className="detail" >Sign Out</div>
        </button >)
    }
    else {
      return (
        <button onClick={this.onSignInClick} className="ui red image label">
          <img alt="iconcillo" src="https://semantic-ui.com/images/avatar/small/christian.jpg" />
            Sign In with Google
          <div className="detail">Not Signed in</div>
        </button>)
    }
  };

  render() {
    return (
      <div>{this.renderAuthButton()}</div>
      // <div>Google Auth</div>
    )
  }
}

export default GoogleAuth;