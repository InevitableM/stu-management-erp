import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import './css/view.css';
import {useNavigate} from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
export default function View() {
  const [studentCount, setStudentCount] = useState([]);
  const [teacherCount, setTeacherCount] = useState([]);
  const [news, setNews] = useState([]);
  const [images, setImages] = useState([]);
  const [slider, setSlider] = useState([]);
  const [videos, setVideos] = useState([]);
  const [ticker,setTicker]= useState([]);
  const [contact , setContact]=useState({name:'', email:'', message:''});
  const navigate=useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/studentcount');
        const jsonData = await response.json();
        console.log(jsonData);
        setStudentCount(jsonData);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchteacherCount = async () => {
        try {
          const response = await fetch('http://localhost:5000/teachercount');
          const jsonData = await response.json();
          console.log(jsonData);
          setTeacherCount(jsonData);
        } catch (err) {
          console.log(err);
        }
      };

      const fetchNews=async()=>{
        try{
          const response =await fetch('http://localhost:5000/shownews');
          const jsonData=await response.json();
          setNews(jsonData);
        }
        catch(err){
          console.log(err);
        }
      }

      const showimage=async()=>{
        try{
            const data= await fetch('http://localhost:5000/showimage');
            if(data.ok){
        const image= await data.json();
        setImages(image);
        console.log('imagess fetched');
            }
            else{
                console.log('Failed to fetch images');}
            }
      catch(err){
        console.log(err);
      }     }

      const showslider=async()=>{
        try{
          const response= await fetch('http://localhost:5000/showslider');
          if(response.ok){
            const silder= await response.json();
            setSlider(silder);
          }
          else{
            console.log('error fetching slider');
          }
        }
        catch(err){
          console.log(err);
        }
      }

      const showvideo=async()=>{
        try{
            const data= await fetch('http://localhost:5000/showvideo');
            if(data.ok){
              const vid= await data.json();
              setVideos(vid);
              console.log('videos fetched');}
        }
        catch(err){
            console.log(err);
        }
        }
        const tickekers=async()=>{
          try{
            const response= await fetch('http://localhost:5000/showticker');
            if(response.ok){
              const data= await response.json();
              setTicker(data);
            }
            else{
              console.log('error fetching tickers');
            }
          }
          catch(err){
            console.log(err);
          }
        }
        fetchStudentCount();
        fetchteacherCount();
        fetchNews();
        showimage();
        showslider();
        showvideo();
        tickekers();

  }, []);
  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleNewsClick = () => {
    navigate('/news');
  };

  const handleImagesClick = () => {
    navigate('/images');
  };

  const sendcontact = async()=>{
    try{
     const response= await fetch('http://localhost:5000/sendcontact',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({name:contact.name,message:contact.message,email:contact.email}),
     });
     if(response.ok){
     console.log('contact sent');
     alert('contact sent');
     }
     else{
       console.log('contact not sent');
    }}
    catch(err){
      console.log(err);
    }
  }
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);
  return (
<div className="view-container">
  
<Navbar expand="lg" className="bg-body-tertiary navbar-custom">
        <Container>
          <Navbar.Brand href="#home">EduSparkErp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#news-section">News</Nav.Link>
              <Nav.Link href="#image-gallery">Image Gallery</Nav.Link>
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item href="#contact-section">Contact Us</NavDropdown.Item>
                <NavDropdown.Item href="#video-section">Video Gallery</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Button variant="dark" onClick={handleLoginClick}>Login</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

{ticker.length > 0 && (
  <section className="ticker-section">
    <div className="ticker-container">
      <div className="ticker-content">
        {ticker.map((item) => (
          <span key={item.id} className="ticker-item">
            {item.message}
          </span>
        ))}
      </div>
    </div>
  </section>
)}
<div className="description">
  <p>
    This is a student management ERP Where there are three types of Users. Admin, Teacher and Student. Admin can add, delete, update, view. Teacher can view and update student details and schedule exam. Student can view their details and give feedback.
  </p>
</div>

<Carousel>
        {slider.length > 0 ? (
          slider.map((image) => (
            <Carousel.Item key={image.id}>
              <img
                src={`http://localhost:5000${image.imageUrl}`}
                alt={image.title}
                className="d-block w-100 carousel-image"
              />
              <Carousel.Caption>
                <h3>{image.title}</h3>
                <p>{image.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))
        ) : (
          <Carousel.Item>
            <img src='' alt="No images available" className="d-block w-100 carousel-image" />
            <Carousel.Caption>
              <h3>No images available</h3>
              <p>Please add some images to the slider.</p>
            </Carousel.Caption>
          </Carousel.Item>
        )}
      </Carousel>

      <section className="table-section">
        <div className="table-container">
          <div className="table-wrapper">
            <h2>Student Data</h2>
            {studentCount.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Branch</th>
                    <th>Student Count</th>
                  </tr>
                </thead>
                <tbody>
                  {studentCount.map((e) => (
                    <tr key={e.departdiv}>
                      <td>{e.department}</td>
                      <td>{e.studentcount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No student data available</p>
            )}
          </div>

          <div className="table-wrapper">
            <h2>Teacher Data</h2>
            {teacherCount.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Branch</th>
                    <th>Teacher Count</th>
                  </tr>
                </thead>
                <tbody>
                  {teacherCount.map((e) => (
                    <tr key={e.department}>
                      <td>{e.department}</td>
                      <td>{e.teachercount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No teacher data available</p>
            )}
          </div>
        </div>
      </section>

      <section id ="news-section"className="news-section">
        <h2>News</h2>
        {news.length > 0 ? (
          <ul>
            {news.map((e) => (
              <li key={e.id} className="news-item">
                <h3>{e.title}</h3>
                <p>{e.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No news available</p>
        )}
      </section>

      <section id="image-gallery"className="image-gallery">
        <h2>Image Gallery</h2>
        {images.length > 0 ? (
          <div className="images-grid">
            {images.map((image) => (
              <div key={image.id} className="image-card">
                <h4>{image.title}</h4>
                <img
                  src={`http://localhost:5000${image.imageUrl}`}
                  alt={image.title}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No images available</p>
        )}
      </section>

      <section className="video-section" id='video-section'>
        <h2>Videos</h2>
        {videos.length > 0 ? (
          <div className="videos-grid">
            {videos.map((video) => (
              <div key={video.id} className="video-card">
                <h4>{video.title}</h4>
                <video controls>
                  <source
                    src={`http://localhost:5000${video.videoUrl}`}
                    type="video/mp4"
                  />
                </video>
              </div>
            ))}
          </div>
        ) : (
          <p>No videos available</p>
        )}
      </section>

      <section className="contact-section" id='contact-section'>
        <h2>Contact</h2>
        <form onSubmit={sendcontact}>
          <label>Name:</label>
          <input type="text" value={contact.name} required onChange={(e) => setContact({ ...contact, name: e.target.value })} />
          <label>Email:</label>
          <input type="email" value={contact.email} required onChange={(e) => setContact({ ...contact, email: e.target.value })} />
          <label>Message:</label>
          <textarea value={contact.message} required onChange={(e) => setContact({ ...contact, message: e.target.value })} />
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
  
}