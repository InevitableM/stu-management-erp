import React from 'react';
import{useState,useEffect} from 'react';
import Slider from 'react-slick';
import './css/dashboard.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
export default function Dashboard() {
const [notices,setNotices]=useState([]);
const [newNotice,setNewNotice]=useState({title:'',content:'',forwho:''});
const [news,setNews]=useState([]);
const [newNews,setNewNews]=useState({title:'',content:''});
const [image,setImage]=useState(null);
const [title,setTitle]=useState('');
const [images,setImages]=useState([]);
const [video,setVideo]=useState(null);
const [videos,setVideos]=useState([]);
const [videotitle,setvideotitle]=useState('');
const [slidertil,setslidertil]=useState('');
const [slider,setSlider]=useState([]);
const [ticker,setTicker]=useState([]);
const [newTicker,setNewTicker]=useState('');
const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('');
  const[department,setDepartment]=useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [name,setName]=useState('');


const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 200,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

const handleRegister = async (e) => {
  e.preventDefault();
  if (regUsername && regPassword && regRole) {
    try {
      const resp = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({regUsername,  regPassword,regRole,name,department}),
      });
      if (resp.ok) {
        console.log("Registration Successful");
      } else {
        console.log("Registration Failed");
      }
    } catch (err) {
      console.log(err);
    }
  }
};

const handlechange=(e)=>{
  const {name,value}=e.target;
  setNewNotice({...newNotice,[name]:value});
};
const handlenewschange=(e)=>{
  const {name,value}=e.target;
  setNewNews({...newNews,[name]:value});
};

const handleImageChange=(e)=>{
  setImage(e.target.files[0]);
}
const handleTitleChange=(e)=>{
  setTitle(e.target.value);
}
const handleslidertitle=(e)=>{
  setslidertil(e.target.value);
}
const handleVideoChange=(e)=>{
  setVideo(e.target.files[0]);
}
const handleVideoTitleChange=(e)=>{
  setvideotitle(e.target.value);
}
const handletickerchange=(e)=>{
  setNewTicker(e.target.value);
}

useEffect(()=>{
    const handlenotices=async()=>{
    try{
        const data= await fetch('http://localhost:5000/shownotices');
        if(data.ok){
    const notice= await data.json();
    setNotices(notice);
    console.log(notice);
        }
        else{
            console.log('Failed to fetch notices');
          }
        }
catch(err){
    console.log(err);
}     }
handlenotices();
},[])

const handleSubmit=async(e)=>{
  e.preventDefault();
  try{const response= await fetch ('http://localhost:5000/setnotices',{
   method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(newNotice),
});
if(response.ok){
 console.log('Notice added');
}
else{
    console.log('Failed to add notice');
} } 
    catch(err){
        console.log(err);
    }
}
const deletenotice=async(id)=>{
  try{
   const response= await fetch('http://localhost:5000/deletenotice',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({id}),
   })
   if(response.ok){
    console.log('Notice deleted');
   }
    else{
      console.log('Failed to delete notice');
    }
  }
  catch(err){
    console.log(err);
  }
}

const handlenewsSubmit=async(e)=>{
  e.preventDefault();
  try{const response= await fetch ('http://localhost:5000/setnews',{
   method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(newNews),
});
if(response.ok){
 console.log('news added');
}
else{
    console.log('Failed to add news');
} } 
    catch(err){
        console.log(err);
    }
}
const deletenews=async(id)=>{
  try{
   const response= await fetch('http://localhost:5000/deletenews',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({id}),
   })
   if(response.ok){
    console.log('News deleted');
   }
    else{
      console.log('Failed to delete news');
    }
  }
  catch(err){
    console.log(err);
  }
}
useEffect(()=>{
  const handlenews=async()=>{
  try{
      const data= await fetch('http://localhost:5000/shownews');
      if(data.ok){
  const news= await data.json();
  setNews(news);
  console.log(news);
      }
      else{
          console.log('Failed to fetch news');}
      }
catch(err){
  console.log(err);
}     }
handlenews();
},[])

const handleImageUpload=async(e)=>{
  e.preventDefault();
  if (!image) {
    alert('Please select an image to upload.');
    return;
  }
  const formData = new FormData();
  formData.append('title', title);
  formData.append('image', image);
  try {
    const response = await fetch('http://localhost:5000/upload-image', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      console.log('Image uploaded successfully');
      setTitle('');
      setImage(null);
    } else {
      console.log('Failed to upload image');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

const deleteimage=async(id)=>{
try{
  const response= await fetch('http://localhost:5000/deleteimage',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({id}),
  });
  if(response.ok){
    console.log('Image deleted');
  }
  else{
    console.log('Failed to delete image');
  }
}
catch(err){
  console.log(err); }
}

const handleImageslider=async(e)=>{
  e.preventDefault();
  if (!image) {
    alert('Please select an image to upload.');
    return;
  }
  const formData = new FormData();
  formData.append('title', slidertil);
  formData.append('image', image);
  try {
    const response = await fetch('http://localhost:5000/upload-image-slider', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      console.log('Image uploaded successfully');
      setTitle('');
      setImage(null);
    } else {
      console.log('Failed to upload image');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}
useEffect(()=>{
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
showimage();
showslider();
tickekers();
},[])


const handleVideoUpload=async(e)=>{
  e.preventDefault();
  if (!video) {
    alert('Please select a video to upload.');
    return;
  }
  const formData = new FormData();
  formData.append('title', videotitle);
  formData.append('video', video);
  try{
    const response = await fetch('http://localhost:5000/upload-video', {
        method: 'POST',
        body: formData,
    });
    if(response.ok){
        console.log('Video uploaded successfully');
        setvideotitle('');
        setVideo(null);
    }
  }
  catch(err){
    console.log(err);
  }
}

useEffect(()=>{
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
showvideo();
},[]);

const deletevideo=async(id)=>{
  try{
    const response= await fetch('http://localhost:5000/deletevideo',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({id}),
    });
    if(response.ok){
      console.log('video deleted');
    }
    else{
      console.log('error deleting video');
    }
  }
  catch(err){
    console.log(err);
  }
}

const handleTickerSubmit=async(e)=>{
  e.preventDefault();
  try{
    const response= await fetch('http://localhost:5000/setticker',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({message:newTicker}),
    })
    if(response.ok){
      console.log('Ticker added');
    }
    else{
      console.log('Failed to add ticker');
    }
  }
  catch(err){
    console.log(err);
  }
}

const deleteticker= async(id)=>{
  try{
    const response= await fetch('http://localhost:5000/deleteticker',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({id}),
    });
    if(response.ok){
      console.log('ticker deleted');
    }
    else{
      console.log('error deleting ticker');
    }
  }
  catch(err)
  {console.log(err);}
}

    return(
//         <div>
//        <section>
//        <button onClick={() => setShowRegister(!showRegister)}>
//         {showRegister ? 'Cancel Registration' : 'Register as New User'}
//       </button>

//       {showRegister && (
//         <div>
//           <h2>Register</h2>
//           <form onSubmit={handleRegister}>
//           <select onChange={(e) => setRegRole(e.target.value)}>
//           <option value="">Select Role</option>
//           <option value="student">Student</option>
//           <option value="teacher">Teacher</option>
//           <option value="admin">Admin</option>
//         </select>
//             <input
//               type="text"
//               placeholder="Username"
//               value={regUsername}
//               onChange={(e) => setRegUsername(e.target.value)}
//             />
//             <input tpye="text" placeholder='name' value={name} onChange={(e)=> setName(e.target.value)}>

//             </input>
//             <input
//               type="password"
//               placeholder="Password"
//               value={regPassword}
//               onChange={(e) => setRegPassword(e.target.value)}
//             />
          
//         {(regRole === 'student' || regRole === 'teacher') && (
//             <input
//               type="text"
//               placeholder="Department"
//               value={department}
//               onChange={(e) => setDepartment(e.target.value)}
//             />
//           )}
//             <button type="submit">Register</button>
//           </form>
//         </div>
//       )}
//        </section>

//     <section>
//          <h2>Notices</h2>
//          {notices.length>0?(
//         <ul>
//           {notices.map(notices => (
//             <li key={notices.id}>
//               <h3>{notices.title}</h3>
//               <p>notice: {notices.content}</p>
//               <p>for : {notices.forwho}</p>
//               <button onClick={()=>deletenotice(notices.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>)
//         :<p>No Notices</p>
// }
//     </section>
        
//     <section>
//         <form onSubmit={handleSubmit}>
//       <input placeholder='title' name="title"value={newNotice.title} onChange={handlechange}/>
//       <textarea
//             name="content"
//             placeholder="Content"
//             value={newNotice.content}
//             onChange={handlechange}
//             required
//           />
//           <select name="forwho" value={newNotice.forwho} onChange={handlechange} required>
//           <option value="">Select for who</option>
//           <option value="student">Student</option>
//           <option value="teacher">Teacher</option>
//           <option value="all">All</option>
//              </select>       
//             <button type="submit">Add Notice</button>
//           </form>
//     </section>

//     <section>
//       {
//         news.length>0 ? 
//         (
//           <ul>
//             {news.map(news => (
//               <li key={news.id}>
//                 <h3>{news.title}</h3>
//                 <p>{news.content}</p>
//                 <button onClick={()=>deletenews(news.id)}>Delete</button>
//               </li>
//             ))}
//           </ul>)
//           :
//         <p>No News</p>
//       }
//     </section>
//     <section>
//       <form onSubmit={handlenewsSubmit}>
//         <input placeholder='title' name="title"value={newNews.title} onChange={handlenewschange}/>
//         <textarea
//             name="content"
//             placeholder="Content"
//             value={newNews.content}
//             onChange={handlenewschange}
//             required
//           />
//             <button type="submit">Add News</button>
//           </form>
//     </section>

// <section>
//   <h1>Images</h1>
//   {images.length > 0 ? (
//     <ul>
//       {images.map((image) => (
//         <li key={image.id}>
//           <h3>{image.title}</h3>
//           <img src={`http://localhost:5000${image.imageUrl}`} alt={image.title}
//           style={{ width: '200px', height: 'auto' }}/>
//           <button onClick={()=>deleteimage(image.id)}>delete</button>
//         </li>
//       ))}
//     </ul>
//   ) : (
//     <p>No images</p>
//   )}
// </section>

//     <section>
//         <h2>Upload Image</h2>
//    <form onSubmit={handleImageUpload}>
//           <input
//         type="text"
//             placeholder="Enter image title"
//          value={title}
//             onChange={handleTitleChange}
//         required
//         />
//           <input type="file" accept="image/*" onChange={handleImageChange} required />
//         <button type="submit">Upload Image</button>
//         </form>
//       </section>

//        <section>
//        <h2>SLIDER</h2>
//         {slider.length > 0 ? (
//                <Slider {...sliderSettings} >
//     {slider.map((image) => (
//       <div key={image.id}>
//         <img src={`http://localhost:5000${image.imageUrl}`} alt={image.title} style={{ width: '200px', height: 'auto' }} />
//       </div>
//     ))}
//   </Slider>
//           ):(<p>no slider images</p>)
//         }
//        </section>

//       <section>
        
//    <form onSubmit={handleImageslider}>
//           <input
//         type="text"
//             placeholder="Enter image title"
//          value={slidertil}
//             onChange={handleslidertitle}
//         required
//         />
//           <input type="file" accept="image/*" onChange={handleImageChange} required />
//         <button type="submit">Upload Image</button>
//         </form>
//       </section>

//      <section>
//   <h1>Videos</h1>
//   {videos.length > 0 ? (
//     <ul>
//       {videos.map((video) => (
//        <li key={video.id}>
//        <h3>{video.title}</h3>
//       <video controls style={{ width: '200px', height: 'auto' }}>
//           <source src={`http://localhost:5000${video.videoUrl}`} type="video/mp4" />
//       </video>
//       <button onClick={()=>deletevideo(video.id)}>delete</button>
//         </li>
//       ))}
//     </ul>
//   ):(<p>No videos</p>)}
//      </section>


//       <section>
//   <h1>Videos</h1>
//   <form onSubmit={handleVideoUpload}>
//     <input
//       type="text"
//       placeholder="Enter video title"
//       value={videotitle}
//       onChange={handleVideoTitleChange}
//       required
//     />
//     <input type="file" accept="video/*" onChange={handleVideoChange} required />
//     <button type="submit">Upload Video</button>
//   </form>
//       </section>
//       <section>
//         <h3>tickers</h3>
      
//       {
//         ticker.length > 0 ? (
//            <ul>
//             {
//               ticker.map((e)=>(
//                 <li key={e.id}>
//                   <p>{e.message}</p>
//             <button onClick={()=>deleteticker(e.id)}>delete ticker</button>
//                 </li>
//               ))
//             }
//            </ul>
//         ):
//         (
//           <p></p>
//         )
//       }
        
//       <textarea
//             name="content"
//             placeholder="Content"
//             value={newTicker}
//             onChange={handletickerchange}
//             required
//           />
//           <button onClick ={handleTickerSubmit}>add ticker</button>
//       </section>
// </div>
<div className="dashboard-container">

{/* Registration Section */}
<section className="dashboard-section">
  <button onClick={() => setShowRegister(!showRegister)} className="dashboard-button">
    {showRegister ? 'Cancel Registration' : 'Register as New User'}
  </button>
  {showRegister && (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="dashboard-form">
        <select onChange={(e) => setRegRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <input type="text" placeholder="Username" value={regUsername} onChange={(e) => setRegUsername(e.target.value)} />
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="password" placeholder="Password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />
        {(regRole === 'student' || regRole === 'teacher') && (
          <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
        )}
        <button type="submit" className="form-button">Register</button>
      </form>
    </div>
  )}
</section>

{/* Notices Section */}
<section className="dashboard-section">
  <h2>Notices</h2>
  {notices.length > 0 ? (
    <ul>
      {notices.map(notice => (
        <li key={notice.id} className="card">
          <h3>{notice.title}</h3>
          <p>Notice: {notice.content}</p>
          <p>For: {notice.forwho}</p>
          <button onClick={() => deletenotice(notice.id)} className="delete-button">Delete</button>
        </li>
      ))}
    </ul>
  ) : <p className="no-content">No Notices</p>}
  <form onSubmit={handleSubmit} className="dashboard-form">
    <input placeholder="Title" name="title" value={newNotice.title} onChange={handlechange} />
    <textarea name="content" placeholder="Content" value={newNotice.content} onChange={handlechange} required />
    <select name="forwho" value={newNotice.forwho} onChange={handlechange} required>
      <option value="">Select for who</option>
      <option value="student">Student</option>
      <option value="teacher">Teacher</option>
      <option value="all">All</option>
    </select>
    <button type="submit" className="form-button">Add Notice</button>
  </form>
</section>

{/* News Section */}
<section className="dashboard-section">
  <h2>News</h2>
  {news.length > 0 ? (
    <ul>
      {news.map(item => (
        <li key={item.id} className="card">
          <h3>{item.title}</h3>
          <p>{item.content}</p>
          <button onClick={() => deletenews(item.id)} className="delete-button">Delete</button>
        </li>
      ))}
    </ul>
  ) : <p className="no-content">No News</p>}
  <form onSubmit={handlenewsSubmit} className="dashboard-form">
    <input placeholder="Title" name="title" value={newNews.title} onChange={handlenewschange} />
    <textarea name="content" placeholder="Content" value={newNews.content} onChange={handlenewschange} required />
    <button type="submit" className="form-button">Add News</button>
  </form>
</section>

{/* Images Section */}
<section className="dashboard-section">
  <h2>Images</h2>
  {images.length > 0 ? (
    <ul>
      {images.map(image => (
        <li key={image.id} className="card media-element">
          <h3>{image.title}</h3>
          <img src={`http://localhost:5000${image.imageUrl}`} alt={image.title} />
          <button onClick={() => deleteimage(image.id)} className="delete-button">Delete</button>
        </li>
      ))}
    </ul>
  ) : <p className="no-content">No Images</p>}
  <form onSubmit={handleImageUpload} className="dashboard-form">
    <input type="text" placeholder="Image Title" value={title} onChange={handleTitleChange} required />
    <input type="file" accept="image/*" onChange={handleImageChange} required />
    <button type="submit" className="upload-button">Upload Image</button>
  </form>
</section>

{/* Slider Section */}
<section className="dashboard-section">
  <h2>Slider</h2>
  {slider.length > 0 ? (
    <div className="slider-container">
      <Slider {...sliderSettings}>
        {slider.map((image) => (
          <div key={image.id}>
            <img src={`http://localhost:5000${image.imageUrl}`} alt={image.title} style={{ width: '200px', height: 'auto' }} />
          </div>
        ))}
      </Slider>
    </div>
  ) : <p className="no-content">No Slider Images</p>}
  <form onSubmit={handleImageslider} className="dashboard-form">
    <input type="text" placeholder="Slider Image Title" value={slidertil} onChange={handleslidertitle} required />
    <input type="file" accept="image/*" onChange={handleImageChange} required />
    <button type="submit" className="upload-button">Upload Slider Image</button>
  </form>
</section>

{/* Videos Section */}
<section className="dashboard-section">
  <h2>Videos</h2>
  {videos.length > 0 ? (
    <ul>
      {videos.map(video => (
        <li key={video.id} className="card media-element">
          <h3>{video.title}</h3>
          <video controls style={{ width: '200px', height: 'auto' }}>
            <source src={`http://localhost:5000${video.videoUrl}`} type="video/mp4" />
          </video>
          <button onClick={() => deletevideo(video.id)} className="delete-button">Delete</button>
        </li>
      ))}
    </ul>
  ) : <p className="no-content">No Videos</p>}
  <form onSubmit={handleVideoUpload} className="dashboard-form">
    <input type="text" placeholder="Video Title" value={videotitle} onChange={handleVideoTitleChange} required />
    <input type="file" accept="video/*" onChange={handleVideoChange} required />
    <button type="submit" className="upload-button">Upload Video</button>
  </form>
</section>

{/* Tickers Section */}
<section className="dashboard-section">
  <h2>Tickers</h2>
  {ticker.length > 0 ? (
    <ul>
      {ticker.map(e => (
        <li key={e.id} className="card">
          <p>{e.message}</p>
          <button onClick={() => deleteticker(e.id)} className="delete-button">Delete Ticker</button>
        </li>
      ))}
    </ul>
  ) : <p className="no-content">No Tickers</p>}
  <textarea
    name="content"
    placeholder="New Ticker Message"
    value={newTicker}
    onChange={handletickerchange}
    className="ticker-textarea"
    required
  />
  <button onClick={handleTickerSubmit} className="form-button">Add Ticker</button>
</section>

</div>

    );
}

