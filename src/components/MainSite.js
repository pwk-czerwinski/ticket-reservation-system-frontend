import React, { Component } from 'react';
import Home from './main_site_parts/Home';
import Events from './main_site_parts/Events';
import Footer from './main_site_parts/Footer';

class MainSite extends Component {
  render() {
    return (
      <div>
        <Home />
        <Events />
        <Footer />
      </div>
    );
  }
}

export default MainSite;
