"use client"

import React from "react";
import { Container, Row, Col } from "reactstrap";

import UserNavbar from "/app/components/dashboard/userNavbar";

const DefaultLayout = ({ children, noNavbar, noFooter }) => (
  <Container fluid>
      <UserNavbar/>
        {children}
        {/* {!noFooter && <MainFooter />} */}
  </Container>
);

export default DefaultLayout;
