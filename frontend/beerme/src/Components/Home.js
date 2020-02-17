import React, { Component } from "react";
import BOTD_Photo from "./BOTD_photo.png";
import Separator from "./Sep_Img.png";
import Logo from "./BeerMe_Logo.png"; // Tell Webpack this JS file uses this image

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topTen: ["1. Pilsner", "2. IPA", "3. Ale", "4. Lager"]
    };
  }

  renderTopTen() {
    return (
      <div style={styles.inRowStyle}>
        {this.renderBOTD()}
        <img src={Separator} alt="Separator" />
        <div style={styles.inColumnStyle}>
          <h2>Top Ten Beer Styles</h2>
          {this.state.topTen.map(beer => (
            <h4>{beer}</h4>
          ))}
        </div>
      </div>
    );
  }

  renderBOTD() {
    return (
      <div style={styles.inRowStyle}>
        <img src={BOTD_Photo} alt="BOTD_Photo" />
        <div style={styles.inColumnStyle}>
          <h2>Beer Of The Day</h2>
          <p>This is where the Beer of The Day explanation lives.</p>
          <p>More information about the Beer of The Day here.</p>
          <p>And we continue to talk about the Beer of the Day.</p>
          <p>Final thoughts about the beer. Wow, what a great beer!</p>
        </div>
      </div>
    );
  }

  renderLogo() {
    return (
      <div style={styles.logoStyle}>
        <img src={Logo} alt="Logo" />
      </div>
    );
  }

  render() {
    return (
      <div>
        <div
          style={{
            marginLeft: "200px",
            marginRight: "200px",
            marginTop: "45px",
            alignContent: "center"
          }}
        >
          {this.renderLogo()}
          {this.renderTopTen()}
        </div>
      </div>
    );
  }
}

const styles = {
  logoStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  inRowStyle: {
    marginRight: "20px",
    marginLeft: "20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  inColumnStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default Home;
