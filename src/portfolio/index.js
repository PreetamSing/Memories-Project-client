import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Jumbotron, Container, ResponsiveEmbed } from 'react-bootstrap';

export default function Index() {
    const jumbotronStyle = {
        marginTop: '30px',
        marginBottom: "0px",
        padding: "30px",
        backgroundColor: "rgba(0, 0, 0, 0.77)",
        color: "#eeeeee",
        borderTop: "5px solid black",
    }

    const headingStyle = {
        display: "flex",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        alignItems: "center",
        color: "#efefef",
        borderRadius: "10px",
        justifyContent: "center",
        maxWidth: "600px"
    }

    const cardStyle = {
        background: "inherit",
        backgroundColor: "rgba(2, 2, 2, 0.6)",
        border: 0
    }

    const cardImgStyle = {
        maxWidth: "80%",
        eight: "auto"
    }

    const yourServer = `localhost:5000`
    const My_Resume = `http://${yourServer}/api/portfolio/pdf/My_Resume`;
    const m103Certificate = "https://university.mongodb.com/course_completion/04023815-9e4e-447b-be03-63e1f3a2ca65/printable?format=img";
    const m103Verify = "https://university.mongodb.com/course_completion/04023815-9e4e-447b-be03-63e1f3a2ca65?utm_source=copy&utm_medium=social&utm_campaign=university_social_sharing";
    const m001Certificate = "https://university.mongodb.com/course_completion/19e612f6-a867-441b-a731-9ec681849524/printable?format=img";
    const m001Verify = "https://university.mongodb.com/course_completion/19e612f6-a867-441b-a731-9ec681849524?utm_source=copy&utm_medium=social&utm_campaign=university_social_sharing";
    const jsCertificate = `http://${yourServer}/api/portfolio/img/js`;
    const jsVerify = "https://freecodecamp.org/certification/preetamsinghrathore/javascript-algorithms-and-data-structures";
    const rwdCertificate = `http://${yourServer}/api/portfolio/img/rwd`;
    const rwdVerify = "https://freecodecamp.org/certification/preetamsinghrathore/responsive-web-design";

    return (
        <>
            {/* <Container className="my-3">
                <div style={{ width: "auto", height: 'auto' }}>
                    <ResponsiveEmbed aspectRatio="16by9">
                        <iframe width="560" height="315" src={videoResume} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </ResponsiveEmbed>
                </div>
            </Container> */}
            <Container className="my-3">
                <div style={{ width: "auto", height: 'auto' }}>
                    <ResponsiveEmbed aspectRatio="1by1">
                        <embed src={My_Resume} alt="My Resume" />
                    </ResponsiveEmbed>
                </div>
            </Container>
            <h3 style={headingStyle}>Certificates (Web Development)</h3>
            <Container>
                <Card style={cardStyle} className="my-3">
                    <Card.Img variant="top" src={m001Certificate} style={cardImgStyle} className="m-auto pt-3" alt="MongoDB Basics" />
                    <Card.Body className="m-auto" >
                        <Button variant="primary" href={m001Verify} target="_blank">Click to Check Verification</Button>
                    </Card.Body>
                </Card>
            </Container>
            <Container>
                <Card style={cardStyle} className="my-3">
                    <Card.Img variant="top" src={m103Certificate} style={cardImgStyle} className="m-auto pt-3" alt="Basics of Cluster Administration Certificate" />
                    <Card.Body className="m-auto" >
                        <Button variant="primary" href={m103Verify} target="_blank">Click to Check Verification</Button>
                    </Card.Body>
                </Card>
            </Container>
            <Container>
                <Card style={cardStyle} className="my-3">
                    <Card.Img variant="top" src={jsCertificate} style={cardImgStyle} className="m-auto pt-3" alt="JavaScript Algorithms and Data Structures Certificate" />
                    <Card.Body className="m-auto" >
                        <Button variant="primary" href={jsVerify} target="_blank">Click to Check Verification</Button>
                    </Card.Body>
                </Card>
            </Container>
            <Container>
                <Card style={cardStyle} className="my-3">
                    <Card.Img variant="top" src={rwdCertificate} style={cardImgStyle} className="m-auto pt-3" alt="Responsive Web Designing Certificate" />
                    <Card.Body className="m-auto" >
                        <Button variant="primary" href={rwdVerify} target="_blank">Click to Check Verification</Button>
                    </Card.Body>
                </Card>
            </Container>
            <Jumbotron style={jumbotronStyle} >
                <Container>
                    <h4 className="mx-2 mb-3">My Projects</h4>
                    <Button variant="outline-light" className="mx-2 my-2 d-flex justify-content-center" size="lg" href="/">Portfolio</Button>
                    <Button variant="outline-light" className="mx-2 my-2 d-flex justify-content-center" size="lg" href="/memories">Memories</Button>
                    <Button variant="outline-light" className="mx-2 my-2 d-flex justify-content-center" size="lg" href="/video-chat">Video-Chat</Button>
                </Container>
            </Jumbotron>
        </>
    )
}
