import {useState,useEffect} from 'react';
import Navigation from './Navigation';
import { Col, Container, Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
// import './CSS/Programs.css'
// import {useTypewriter, Cursor} from 'react-simple-typewriter'


function Home() {
  const words = [<span style={{ color: 'white', fontFamily: 'sans-serif' }}>Succeeding</span>,
                <span style={{ color: 'lightblue', fontFamily: 'sans-serif' }}>Winning</span>,
                <span style={{ color: 'white', fontFamily: 'sans-serif' }}>Earning</span>,
                <span style={{ color: 'lightblue', fontFamily: 'sans-serif' }}>Contributing</span>,];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex === words.length - 1 ? 0 : prevIndex + 1));
    }, 2000); 
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  
  return (
    <div className="d-flex flex-column">
    <Navigation />
      <div className='vh-100 d-flex flex-column flex-grow-1 justify-content-end p-3'  style={{ backgroundImage: "url('https://bowvalleycollege.ca/-/media/bvc/home/hero-banners/hero.ashx')", backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center center'}}>

    <div className="darkblue text-white p-3 text-center " 
        style={{
        width: '100%', 
        left:0, 
        right: 0, 
        top: '10px',
        height: '20%'
        }}>
      <Container>
        <Row>
          <Col className='sm-3'>
            <h2 className='text-bold'>Your journey starts at our open house</h2>
            <h5>The next Open House event is March 9th, 2024 | 10 a.m. to 2 p.m.</h5>
          </Col>
            <Col className='sm-3'>
            <Button className='btn btn-danger btn-lg w-50'>Open House</Button>
          </Col>
        </Row>
      </Container>
        </div>
       
        <div
          className="darkblue text-white p-3 text-center"
          style={{
            position: 'absolute',
            top: '15%', 
            left: 0,
            right: 0,
            width: '100%',
          }}
        >
            <Container>
              <Row >
          
                <Col className='sm-3'>
                <h1 style={{ fontSize: '90px'}}> Hit the ground</h1></Col>
                
                <Col className='sm-3'>
                <h1 style={{fontSize: '110px'}}className="fade-in">{words[currentWordIndex]}</h1>
                </Col>
              </Row>
            </Container>
        </div>
        </div>
    </div>
  );
}

export default Home;
