import React from "react";
import Navigation from "./Navigation";
import Footer from "./components/Footer";
import "./CSS/Programs.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaDesktop,
} from "react-icons/fa";

function NewPrograms() {
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

      <section className="custom-bg-gray py-5 ">
        <Container className="my-5 bg-white shadow-lg rounded-1"></Container>
      </section>
    </div>
  );
}

export default NewPrograms;
