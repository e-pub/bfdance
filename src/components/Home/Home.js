import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import Calendar from "../modules/calendar";  // 새로 만든 React Calendar 컴포넌트
import "../../Assets/css/calendar.css"; // 캘린더 스타일

function Home() {
  const isAdmin = true; // 관리자 여부 설정

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
                I'M
                <strong className="main-name"> SOUMYAJIT BEHERA</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>

          {/* 캘린더 추가 부분 */}
          
        </Container>
      </Container>
      <Row>
        <Col md={12}>
          <Calendar isAdmin={isAdmin} />  {/* Calendar 컴포넌트를 여기에 삽입 */}
        </Col>
      </Row>
      <Home2 />
    </section>
  );
}

export default Home;
