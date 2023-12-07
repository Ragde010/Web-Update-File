import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import Footer from './components/Footer';
import { Col, Container, Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
// import './CSS/Programs.css'
// import {useTypewriter, Cursor} from 'react-simple-typewriter'


function Home() {
  const currentYear = new Date().getFullYear();
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
    <>
      <Navigation className='d-block sticky-top' />

      <div id='Main' className='d-block'>

        <div className='position-relative' style={{ height: '120px', backgroundColor: 'darkblue' }}>
          <div className='d-block align-items-center'>
            <div className='d-inline mx-5 px-5 text-white'>
              <h1 className='d-inline' style={{ fontSize: '70px', fontWeight: 'bold', }}> Hit the ground </h1>
              <h1 style={{ fontSize: '90px', fontWeight: 'bold', }} className="d-inline fade-in">{words[currentWordIndex]}</h1>
            </div>
          </div>
        </div>

        <div className='d-flex flex-column h-100'>
          <img src="https://bowvalleycollege.ca/-/media/bvc/home/hero-banners/hero.ashx" />
          <div className='w-100 py-5'>
            <div className='d-flex flex-row w-100 justify-content-around'>
              <div className='d-flex flex-column'>
                <h2 className='text-bold' >Your journey starts at our open house</h2>
                <h5>The next Open House event is March 9th, 2024 | 10 a.m. to 2 p.m.</h5>
              </div>
              <Button className='btn btn-danger btn-lg w-10'>Open House</Button>
            </div>
          </div>

        </div>



      </div >
      <Footer currentYear={currentYear} />
    </>

  );
}

export default Home;
