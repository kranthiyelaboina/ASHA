import React,{useState,useEffect}from 'react';
import './App.css';
import {Heart,Mail,User,MessageSquare,Quote,Loader,Phone,MapPin,ChevronLeft,ChevronRight,Shield,Users,BookOpen,Send}from 'lucide-react';
function App(){
const[formData,setFormData]=useState({name:'',email:'',message:''});
const[quotes,setQuotes]=useState([]);
const[quotesLoading,setQuotesLoading]=useState(true);
const[currentQuoteIndex,setCurrentQuoteIndex]=useState(0);
const[formSubmitted,setFormSubmitted]=useState(false);
const[isAnimating,setIsAnimating]=useState(false);
const fetchQuotes=async()=>{
try{
const apiResponse=await fetch('https://zenquotes.io/api/quotes',{mode:'cors'});
if(!apiResponse.ok){
console.error('API response not ok:',apiResponse.status);
setQuotes(fallbackQuotes);
return;
}
const quotesData=await apiResponse.json();
if(quotesData&&Array.isArray(quotesData)&&quotesData.length>0){
const newQuotes=quotesData.map(item=>({
quote:item.q,
author:item.a,
id:`${item.q}-${item.a}`
}));
setQuotes(newQuotes);
}else{
setQuotes(fallbackQuotes);
}
}catch(error){
console.error('Error fetching quotes:',error);
setQuotes(fallbackQuotes);
}
};
useEffect(()=>{
fetchQuotes().finally(()=>{
setQuotesLoading(false);
});
const refreshInterval=setInterval(()=>{
fetchQuotes();
},3600000);
return()=>clearInterval(refreshInterval);
},[]);
const nextQuote=()=>{
if(quotes.length===0)return;
setIsAnimating(true);
setTimeout(()=>{
setCurrentQuoteIndex(prev=>(prev+1)%quotes.length);
setIsAnimating(false);
},300);
};
const prevQuote=()=>{
if(quotes.length===0)return;
setIsAnimating(true);
setTimeout(()=>{
setCurrentQuoteIndex(prev=>(prev-1+quotes.length)%quotes.length);
setIsAnimating(false);
},300);
};
useEffect(()=>{
if(quotes.length>0){
const quoteInterval=setInterval(()=>{
setIsAnimating(true);
setTimeout(()=>{
setCurrentQuoteIndex(prev=>(prev+1)%quotes.length);
setIsAnimating(false);
},300);
},5000);
return()=>clearInterval(quoteInterval);
}
},[quotes.length]);
const handleInputChange=(event)=>{
const{name,value}=event.target;
setFormData(prevData=>({...prevData,[name]:value}));
};
const handleFormSubmit=(event)=>{
event.preventDefault();
setFormSubmitted(true);
setTimeout(()=>{
setFormData({name:'',email:'',message:''});
setFormSubmitted(false);
},3000);
};
return(
<div className="app-container">
<header className="header-section">
<nav className="navbar">
<div className="nav-content">
<div className="logo-container">
<Heart className="logo-icon"/>
<span className="logo-text">ASHA</span>
</div>
<div className="nav-links">
<a href="#home" className="nav-link">Home</a>
<a href="#quotes" className="nav-link">Inspiration</a>
<a href="#contact" className="nav-link">Contact</a>
</div>
</div>
</nav>
</header>
<main>
<section id="home" className="hero-section">
<div className="hero-overlay"></div>
<div className="hero-content">
<h1 className="hero-title">Together We Fight, Together We Heal</h1>
<p className="hero-subtitle">ASHA provides hope, support, and comprehensive resources for cancer patients and their families on their journey to recovery</p>
<a href="#contact" className="cta-button-hero">
Get Support <Send size={20}/>
</a>
</div>
</section>
<section className="about-section">
<div className="container">
<div className="section-header">
<h2 className="section-title">Our Mission</h2>
<div className="title-underline"></div>
</div>
<div className="about-grid">
<div className="about-card">
<div className="card-icon-wrapper">
<Shield className="card-icon"/>
</div>
<h3 className="card-title">Empowering Patients</h3>
<p className="card-text">Providing knowledge, resources, and unwavering support throughout the healing journey with comprehensive care and guidance.</p>
</div>
<div className="about-card">
<div className="card-icon-wrapper">
<Users className="card-icon"/>
</div>
<h3 className="card-title">Community Support</h3>
<p className="card-text">Building a compassionate network where patients and families find strength, hope, and understanding together in their journey.</p>
</div>
<div className="about-card">
<div className="card-icon-wrapper">
<BookOpen className="card-icon"/>
</div>
<h3 className="card-title">Education & Awareness</h3>
<p className="card-text">Offering comprehensive information about cancer prevention, treatment options, and wellness strategies for better outcomes.</p>
</div>
</div>
</div>
</section>
<section id="quotes" className="quotes-section">
<div className="container">
<div className="section-header">
<Quote className="section-icon"/>
<h2 className="section-title">Words of Inspiration</h2>
<div className="title-underline"></div>
</div>
<div className="quotes-container">
{quotesLoading?(
<div className="quotes-loading">
<Loader className="spinner"/>
<p>Loading inspiration...</p>
</div>
):quotes.length>0?(
<div className="quote-slider-wrapper">
<button className="quote-nav-btn prev" onClick={prevQuote} disabled={quotesLoading||quotes.length===0}>
<ChevronLeft size={28}/>
</button>
<div className="quote-display">
<div className={`quote-content ${isAnimating?'fade-out':'fade-in'}`}>
<Quote className="quote-mark"/>
<blockquote className="quote-text">{quotes[currentQuoteIndex].quote}</blockquote>
<cite className="quote-author">— {quotes[currentQuoteIndex].author}</cite>
</div>
</div>
<button className="quote-nav-btn next" onClick={nextQuote} disabled={quotesLoading||quotes.length===0}>
<ChevronRight size={28}/>
</button>
</div>
):null}
</div>
</div>
</section>
<section id="contact" className="contact-section">
<div className="container">
<div className="section-header">
<h2 className="section-title">Get In Touch</h2>
<div className="title-underline"></div>
<p className="section-description">We are here to listen and support you every step of the way</p>
</div>
<div className="contact-grid">
<div className="contact-info">
<h3 className="contact-info-title">Reach Out To Us</h3>
<div className="contact-details">
<div className="contact-item">
<div className="contact-icon-wrapper">
<Phone className="contact-icon"/>
</div>
<div className="contact-text">
<h4>Phone</h4>
<p>+91 9652256543</p>
</div>
</div>
<div className="contact-item">
<div className="contact-icon-wrapper">
<Mail className="contact-icon"/>
</div>
<div className="contact-text">
<h4>Email</h4>
<p>support@asha-care.org</p>
</div>
</div>
<div className="contact-item">
<div className="contact-icon-wrapper">
<MapPin className="contact-icon"/>
</div>
<div className="contact-text">
<h4>Address</h4>
<p>Banjara Hills, Hyderabad</p>
</div>
</div>
</div>
</div>
<div className="contact-form-wrapper">
<form onSubmit={handleFormSubmit} className="contact-form">
<div className="form-group">
<label htmlFor="name" className="form-label">
<User className="label-icon"/>
Name
</label>
<input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="form-input" placeholder="Your full name" required/>
</div>
<div className="form-group">
<label htmlFor="email" className="form-label">
<Mail className="label-icon"/>
Email
</label>
<input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="form-input" placeholder="your.email@example.com" required/>
</div>
<div className="form-group">
<label htmlFor="message" className="form-label">
<MessageSquare className="label-icon"/>
Message
</label>
<textarea id="message" name="message" value={formData.message} onChange={handleInputChange} className="form-textarea" placeholder="Share your thoughts or questions..." rows="5" required></textarea>
</div>
<button type="submit" className="submit-button">
<span>Send Message</span>
<Heart className="button-icon"/>
</button>
{formSubmitted&&(
<div className="success-message">
<Heart className="success-icon"/>
<p>Thank you for reaching out. We will get back to you soon!</p>
</div>
)}
</form>
</div>
</div>
</div>
</section>
</main>
<footer className="footer">
<div className="container">
<div className="footer-content">
<div className="footer-logo">
<Heart className="logo-icon"/>
<span className="logo-text">ASHA</span>
</div>
<p className="footer-text">Empowering lives through awareness, support, and hope</p>
<p className="footer-copyright">© 2025 ASHA Cancer Awareness & Support. All rights reserved.</p>
</div>
</div>
</footer>
</div>
);
}
const fallbackQuotes=[{quote:"The only way to do great work is to love what you do.",author:"Steve Jobs"},{quote:"Success is not final, failure is not fatal: it is the courage to continue that counts.",author:"Winston Churchill"},{quote:"Believe you can and you're halfway there.",author:"Theodore Roosevelt"},{quote:"The future belongs to those who believe in the beauty of their dreams.",author:"Eleanor Roosevelt"},{quote:"It does not matter how slowly you go as long as you do not stop.",author:"Confucius"},{quote:"Everything you've ever wanted is on the other side of fear.",author:"George Addair"},{quote:"Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.",author:"Roy T. Bennett"},{quote:"I learned that courage was not the absence of fear, but the triumph over it.",author:"Nelson Mandela"},{quote:"There is only one way to avoid criticism: do nothing, say nothing, and be nothing.",author:"Aristotle"},{quote:"Do what you can with all you have, wherever you are.",author:"Theodore Roosevelt"},{quote:"The best time to plant a tree was 20 years ago. The second best time is now.",author:"Chinese Proverb"},{quote:"Your limitation—it's only your imagination.",author:"Unknown"},{quote:"Push yourself, because no one else is going to do it for you.",author:"Unknown"},{quote:"Great things never come from comfort zones.",author:"Unknown"},{quote:"Dream it. Wish it. Do it.",author:"Unknown"},{quote:"Success doesn't just find you. You have to go out and get it.",author:"Unknown"},{quote:"The harder you work for something, the greater you'll feel when you achieve it.",author:"Unknown"},{quote:"Dream bigger. Do bigger.",author:"Unknown"},{quote:"Don't stop when you're tired. Stop when you're done.",author:"Unknown"},{quote:"Wake up with determination. Go to bed with satisfaction.",author:"Unknown"},{quote:"Do something today that your future self will thank you for.",author:"Unknown"},{quote:"Little things make big days.",author:"Unknown"},{quote:"It's going to be hard, but hard does not mean impossible.",author:"Unknown"},{quote:"Don't wait for opportunity. Create it.",author:"Unknown"},{quote:"Sometimes we're tested not to show our weaknesses, but to discover our strengths.",author:"Unknown"},{quote:"The key to success is to focus on goals, not obstacles.",author:"Unknown"},{quote:"Dream it. Believe it. Build it.",author:"Unknown"},{quote:"What we think, we become.",author:"Buddha"},{quote:"All our dreams can come true, if we have the courage to pursue them.",author:"Walt Disney"},{quote:"The secret of getting ahead is getting started.",author:"Mark Twain"}];
export default App;
