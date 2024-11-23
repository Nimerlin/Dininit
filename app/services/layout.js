"use client"

import React from "react";
import { Container, Row, Col } from "reactstrap";

import Navbar from "../components/Navbar";

const DefaultLayout = ({ children, noNavbar, noFooter }) => (
  <Container fluid>
        {children}
        {/* {!noFooter && <MainFooter />} */}
  </Container>
);

export default DefaultLayout;
