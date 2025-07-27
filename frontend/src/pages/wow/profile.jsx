import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Left from "./component/left";
import Right from "./component/right";

function Profile() {
  return (
    <div className="page-container">
      <Header />
      <div style={{ display: "flex" }}>
        <Left />
        <div style={{ flex: 1, position: "relative" }}>
          <div style={{ marginTop: "70px", padding: "24px" }}>
            <div style={{ display: "flex" }}>
              <Right />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile