import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar } from 'react-bootstrap';

export default function Footer() {


    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" >
            <Navbar.Brand>Navigate to My Projects</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mx-4">
                    <Nav.Link href="/">Portfolio</Nav.Link>
                </Nav>
                <Nav className="mx-4">
                    <Nav.Link href="/memories">Memories</Nav.Link>
                </Nav>
                <Nav className="mx-4">
                    <Nav.Link href="/video-chat">Video-Chat</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
