import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import DirectUploadCalendar from "../modules/calendar/DirectUploadCalendar";
import InstagramCalendar from "../modules/calendar/InstagramCalendar";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>
              <h1 className="heading-name">
                I'M <strong className="main-name"> SOUMYAJIT BEHERA</strong>
              </h1>
              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>
            <Col md={5} style={{ paddingBottom: 20 }}>
              <img src={homeLogo} alt="home pic" className="img-fluid" style={{ maxHeight: "450px" }} />
            </Col>
          </Row>
        </Container>
      </Container>

      <Container fluid className="calendar-section">
        <Row>
          <Col md={12}>
            <h2 className="calendar-heading">Direct Upload Calendar</h2>
            <DirectUploadCalendar />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h2 className="calendar-heading">Instagram Calendar</h2>
            <InstagramCalendar />
          </Col>
        </Row>
      </Container>

      <Home2 />
    </section>
  );
}

export default Home;
