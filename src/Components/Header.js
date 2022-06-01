import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header className="App-header">
        <form className="store-select">
          <h2>Please Enter a Store</h2>
          <input type="text" required placeholder="Store Name" />
          <button type="submit">Visit Store</button>
        </form>
      </header>
    );
  }
}

export default Header;
