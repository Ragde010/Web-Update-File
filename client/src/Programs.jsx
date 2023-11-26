import React from "react";
import Navigation from "./Navigation";
import "./CSS/Programs.css";
import Footer from "./components/Footer";
import {
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaDesktop,
} from "react-icons/fa";
import { Container, Row, Col, Button } from "react-bootstrap";

function Programs() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="d-flex flex-column">
      <Navigation />
      <div
        className="vh-50 d-flex flex-column flex-grow-1 justify-content-end p-3"
        style={{
          backgroundImage:
            "url('https://bowvalleycollege.ca/-/media/bvc/programs-and-courses/creative--technologies/images/hero-software-development.ashx')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="d-flex align-items-center justify-content-center vh-100">
          <div className="col-sm-12 col-md-8">
            <h2 className="text-white text-uppercase mt-5 fw-extrabold">
              Diploma
            </h2>
            <h1
              className="text-white fw-extrabold"
              style={{ fontSize: "70px" }}
            >
              Software Development
            </h1>
            <h1
              className="text-white fw-extrabold"
              style={{ fontSize: "70px" }}
            >
              Diploma
            </h1>
            <p
              className="text-white"
              style={{
                fontFamily: "Montserrat",
                fontSize: "24px",
                marginRight: "20px",
              }}
            >
              Gain the skills you need to create the latest computer, mobile,
              and gaming applications. Prepare to transform your ideas into
              reality all while developing your problem-solving skills.
            </p>
            <Button variant="primary" className="text-bold">
              Apply Now
            </Button>
          </div>
        </div>
      </div>
      <section className="custom-bg-gray py-2 ">
        <Container className="my-5 bg-white  shadow-lg rounded">
          <Row>
            <Col sm={3}>
              <div className="p-4 d-flex  align-items-center ">
                <div className="banner-info-section">
                  <h4 className="text-dark">
                    <FaCalendarAlt size="30px" color="darkblue" />{" "}
                    <strong>Start Dates:</strong>
                  </h4>
                  <p className="text-dark fw-bold">September 1, January 5</p>
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <div className="p-4 d-flex  align-items-center ">
                <div className="banner-info-section">
                  <h4 className="text-dark">
                    <FaClock size="30px" color="darkblue" />{" "}
                    <strong>Duration:</strong>
                  </h4>
                  <div className="text-center">
                    <h4 className="text-dark fw-extrabold">4</h4>
                    <p className="h5 fw-bold text-dark">Terms</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <div className="p-4 d-flex  align-items-center ">
                <div className="banner-info-section">
                  <h4 className="text-dark">
                    <FaDesktop size="30px" color="darkblue" />{" "}
                    <strong>Program Delivery</strong>
                  </h4>
                  <div className="text-center">
                    <p className="my-0 fw-bold text-dark">In-class</p>
                    <p className="my-0 fw-bold text-dark">Real-time Online</p>
                    <p className="my-0 fw-bold text-dark">Combined Online</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <div className="p-4 d-flex align-items-center">
                <div className="banner-info-section">
                  <h4 className="text-dark">
                    <FaDollarSign size="30px" color="darkblue" />{" "}
                    <strong>Tuition & Fees:</strong>
                  </h4>
                  <p className="my-0 fw-bold text-dark">
                    Domestic:{" "}
                    <span className="text-green fw-extrabold">CAD $15,676</span>
                  </p>
                  <p className="my-0 fw-bold text-dark">
                    International:{" "}
                    <span className="text-green fw-extrabold">CAD $39,173</span>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      <section className="bg-white py-5">
        <Container>
          <Row>
            <Col>
              <h1>Program Description</h1>
              <p>
                Gain practical experience in the cycles of software development
                through hands-on learning and real projects. You'll gain an
                understanding of industry standards of planning, developing, and
                quality assurance testing.
              </p>
              <hr />
              <h1>Program Description</h1>
              <p>
                Gain practical experience in the cycles of software development
                through hands-on learning and real projects. You'll gain an
                understanding of industry standards of planning, developing, and
                quality assurance testing.
              </p>
            </Col>
            <Col>
              <Button variant="primary">Click me</Button>
              <Button variant="secondary">Click me</Button>
              <Button variant="warning">Click me</Button>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="bg-darkblue py-5">
        <Container className="bg-blue">
          <Row>
            <Col className="bg-dark">1</Col>
            <Col className="bg-dark">2</Col>
          </Row>
        </Container>
      </section>

      <section className="bg-white py-5">
        <Container>
          <Row className="py-5">
            <Col className="text-center">
              <h1 className="text-4xl mb-4">Course Listing</h1>
              <p className="text-lg">
                Curriculum subject to change. Current students should confirm
                program requirements with their academic advisor.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h1 className="text-2xl mb-4">Term 1</h1>
            </Col>
          </Row>
        </Container>
        <Container className="bg-darkblue">
          <Row className="py-3">
            <Col>SODV1101 - Programming Fundamentals</Col>
            <Col md="auto">Credits of 3</Col>
            <Col xs lg="2"></Col>
          </Row>
          <hr />
          <Row className="py-3">
            <Col>SODV1101 - Programming Fundamentals</Col>
            <Col md="auto">Credits of 3</Col>
            <Col xs lg="2"></Col>
          </Row>
          <hr />
          <Row className="py-3">
            <Col>SODV1101 - Programming Fundamentals</Col>
            <Col md="auto">Credits of 3</Col>
            <Col xs lg="2"></Col>
          </Row>
          <hr />
          <Row className="py-3">
            <Col>SODV1101 - Programming Fundamentals</Col>
            <Col md="auto">Credits of 3</Col>
            <Col xs lg="2"></Col>
          </Row>
        </Container>
        <Container>
          <Row className="py-5">
            <Col className="text-center">
              <h1 className="text-4xl mb-4">Course Listing</h1>
              <p className="text-lg">
                Curriculum subject to change. Current students should confirm
                program requirements with their academic advisor.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h1 className="text-2xl mb-4">Term 2</h1>
            </Col>
          </Row>
        </Container>
        <Container className="bg-darkblue">
          <Row className="py-3">
            <Col>SODV1101 - Programming Fundamentals</Col>
            <Col md="auto">Credits of 3</Col>
            <Col xs lg="2"></Col>
          </Row>
          <hr />
          <Row className="py-3">
            <Col>SODV1101 - Programming Fundamentals</Col>
            <Col md="auto">Credits of 3</Col>
            <Col xs lg="2"></Col>
          </Row>
          <hr />
          <Row className="py-3">
            <Col>SODV1101 - Programming Fundamentals</Col>
            <Col md="auto">Credits of 3</Col>
            <Col xs lg="2"></Col>
          </Row>
          <hr />
          <Row className="py-3">
            <Col>SODV1101 - Programming Fundamentals</Col>
            <Col md="auto">Credits of 3</Col>
            <Col xs lg="2"></Col>
          </Row>
        </Container>
        <Container>
          <Row className="py-5">
            <Col className="text-center">
              <h1 className="text-4xl mb-4">Course Listing</h1>
              <p className="text-lg">
                Curriculum subject to change. Current students should confirm
                program requirements with their academic advisor.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h1 className="text-2xl mb-4">Term 1</h1>
            </Col>
          </Row>
        </Container>
        <Container className="bg-darkblue">
          <Row className="py-3">
            <Col>SODV1101 - Programming Fundamentals</Col>
            <Col md="auto">Credits of 3</Col>
            <Col xs lg="2"></Col>
          </Row>
          <hr />
          <Row className="py-3">
            <Col>SODV1101 - Programming Fundamentals</Col>
            <Col md="auto">Credits of 3</Col>
            <Col xs lg="2"></Col>
          </Row>
          <hr />
          <Row className="py-3">
            <Col>SODV1101 - Programming Fundamentals</Col>
            <Col md="auto">Credits of 3</Col>
            <Col xs lg="2"></Col>
          </Row>
          <hr />
          <Row className="py-3">
            <Col>SODV1101 - Programming Fundamentals</Col>
            <Col md="auto">Credits of 3</Col>
            <Col xs lg="2"></Col>
          </Row>
        </Container>
        <Container>
          <Row className="py-5">
            <Col className="text-center">
              <h1 className="text-4xl mb-4">Course Listing</h1>
              <p className="text-lg">
                Curriculum subject to change. Current students should confirm
                program requirements with their academic advisor.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h1 className="text-2xl mb-4">Term 3</h1>
            </Col>
          </Row>
        </Container>
        <Container className="bg-darkblue">
          <Row className="py-3">
            <Col>SODV1101 - Programming Fundamentals</Col>
            <Col md="auto">Credits of 3</Col>
            <Col xs lg="2"></Col>
          </Row>
          <hr />
          <Row className="py-3">
            <Col>SODV1101 - Programming Fundamentals</Col>
            <Col md="auto">Credits of 3</Col>
            <Col xs lg="2"></Col>
          </Row>
          <hr />
          <Row className="py-3">
            <Col>SODV1101 - Programming Fundamentals</Col>
            <Col md="auto">Credits of 3</Col>
            <Col xs lg="2"></Col>
          </Row>
          <hr />
          <Row className="py-3">
            <Col>SODV1101 - Programming Fundamentals</Col>
            <Col md="auto">Credits of 3</Col>
            <Col xs lg="2"></Col>
          </Row>
        </Container>
  </section> 
      
      <Footer currentYear={currentYear} />
    </div>
  );
}

export default Programs;
