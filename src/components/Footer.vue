<template>
<div class="row footer">
<!-- Contact Section -->
<section id="contact" class="col-md-6">
  <div class="wrapper">
    <div class="form-wrapper">
      <h4>填寫信箱獲取更多sophie的最新資訊</h4>
      <form id="form" action="https://www.freecodecamp.com/email-submit">
        <input type="email" id="email" name="email" placeholder="Your email" required>
        <input type="submit" id="submit" value="OK" class="submit">
      </form>
    </div>
  </div>
</section>
    <div class="contact-wrapper col-md-6">
      <h4>聯絡sophie</h4>
      <div class="wrapper">
        <div class="social-menu">
          <li><a href="#"><i class="fab fa-pinterest-p" aria-hidden="true"></i></a></li>
          <li><a href="#"><i class="fab fa-instagram" aria-hidden="true"></i></a></li>
          <li><a href="#"><i class="fab fa-facebook" aria-hidden="true"></i></a></li>
        </div>
        <a class="contact-footer contact-tel" href="#"><i class="fa fa-phone" aria-hidden="true"></i>(02)8888-8888</a>
        <a class="contact-footer contact-email" href="#"><i class="far fa-envelope"></i>email@sophie.com</a>
      </div>
    </div>
    <div class="copy-wrapper">
      <h6><i class="fa fa-copyright" aria-hidden="true"></i>僅供學習使用，無商業用途</h6>
    </div>
    </div>
</template>

<style lang="scss" scoped>
/* Global */
* {
  box-sizing: border-box;
}
body{
  color: #090b08;
  margin:  0;
  font-family: 'Raleway', sans-serif;
  font-weight: 300;
  background-color: #ffe9ef;
}
h1{
  font-size: 1.7em;
  font-weight: 700;
  line-height: 1.5em;
  text-transform: uppercase;
}
h2{
  text-transform: uppercase;
}
h4{
  font-size: .8em;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}
h6{
  font-weight: 500;
}
a{
  text-decoration: none;
  color: #090b08;
}
ul{
  list-style: none;
}
section{
  padding: 5.8em 2em 0;
}
.title{
  display: flex;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding-bottom: 1em;
}
.title.title-right{
  justify-content: flex-end;
}
.line{
  width: 3em;
  height: 1px;
  background-color: #000;
  margin-right: 1em;
}
.line.line-right{
  order: 2;
  margin-right: 0;
  margin-left: 1em;
}
.btn{
  display: inline-block;
  padding: .5em 1.5em;
  border: solid 1px white;
  transition: all .3s ease-in;
  color:white
}
.btn2{
  display: inline-block;
  padding: .5em 1.5em;
  border: solid 1px #2c3e50;
  transition: all .3s ease-in;
  border-radius: 0.25rem;
}
.btn:hover, .btn:focus, .btn2:hover, .btn2:focus{
  transform: translate(0px, -2px);
  -webkit-box-shadow: 0px 10px 7px -9px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 10px 7px -9px rgba(0,0,0,0.75);
  box-shadow: 0px 10px 7px -9px rgba(0,0,0,0.75);
  transition: all .3s ease-out;
}
/* Contact Section */
.footer{
  background-color: #f5d9d6;
}
section#contact{
  padding: 3em 2em .5em;
}
.form-wrapper{
  text-align:left
}
.form-wrapper:after,
.contact-wrapper:after{
  display: block;
  content: "";
  margin: 2em auto;
  border-bottom: solid 1px #dadada;
}
form{
  display: flex;
}
form input:first-child{
  flex: 1 0 80%;
  background-color: transparent;
}
form input:last-child{
  flex: 1 0 20%;
  border-left: 0;
  cursor: pointer;
  background-color: #f5d9d6;
  transition: all .25s ease;
}
#submit:hover {
background-color: #000;
color: #fff;
  transition: all .25s ease;
}
input{
  padding: 1em;
  border: 1px solid #000;
}
.contact-wrapper{
  text-align:left
}
.contact-wrapper .wrapper{
  display: flex;
  text-align: center;
  flex-wrap: wrap;
}
.contact-wrapper .social-menu{
  flex: 1 0 100%;
  justify-content: center;
  list-style-type:none
}
.contact-wrapper .social-menu li a {
font-size: 1.5em;
  padding: 0;
  margin: 0 1.5em 0 0;
}
.contact-wrapper a i{
  width: 100%;
  padding-bottom: .2em;
}
.contact-footer{
  padding: 1em 0;
  border: 1px solid #000;
}
.contact-footer:last-child{
  border-left: 0;
}
.contact-footer:hover{
  background-color: #f5d9d6;
}
.contact-tel{
  flex: 1 0 50%;
}
.contact-email{
  flex: 1 0 50%;
}
.copy-wrapper a{
  font-weight: 700;
}

/* Responsive Style */
@media(min-width: 320px){
    .hero-text{
    padding: 0 0 0 12em;
  }
}
@media(min-width: 576px){
  /*  Global  */
  h1{
    font-size: 2em;
  }
  /*  Hero Section  */
  .hero{
    justify-content: center;
    overflow: hidden;
  }
  .hero-img{
    padding-top: 6.5em;
  }
  .hero-img img{
    display: block;
    width: 14em;
    height: auto;
  }
  .hero-text{
    padding: 0 2em 0 25em;
  }
  /*  Featured Section  */
  .text{
    margin: 2em 2em auto;
  }
  /*  Collections Section  */
  #collections .wrapper{
    display: flex;
    flex-wrap: wrap;
  }
  .box{
    padding: 4em;
  }
  .box1{
    flex: 1 0 20%;
    margin-right: 1em;
    height:235px
  }
  .box2{
    flex: 1 0 20%;
    margin-right: 1em;
  }
  .box3{
    flex: 1 0 20%;
    margin-right: 1em;
  }
.box1 .image {
  opacity: 1;
  display: block;
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height:auto;
  transition: .5s ease;
  backface-visibility: hidden;
}
.box2 .image {
  opacity: 1;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: .5s ease;
  backface-visibility: hidden;
}
.box3 .image {
  opacity: 1;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: .5s ease;
  backface-visibility: hidden;
}
.box1 .middle{
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}
.box2 .middle{
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}
.box3 .middle{
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}
.box1:hover .image {
  opacity: 0;
}
.box2:hover .image {
  opacity: 0;
}
.box3:hover .image {
  opacity: 0;
}
.box1:hover .middle {
  opacity: 1;
}
.box2:hover .middle {
  opacity: 1;
}
.box3:hover .middle {
  opacity: 1;
}
  /*  About Section  */
  .video-wrapper{
    margin: 0 2em;
  }
}
@media(min-width: 768px){
  /*  Global  */
  .wrapper{
    display: flex;
  }
  /*  Header  */
  .nav-brand img{
    height: 3em;
    margin-top:1em
  }
  .toggle-menu{
    display: none;
  }
  .navbar{
    display: flex;
    position: relative;
    height: auto;
    width: auto;
    background-color: transparent;
    z-index: 1;
  }
  .menu{
    flex-direction: row;
    padding: 0;
    justify-content: flex-end;
  }
  .social-menu{
    display: none;
  }
  .menu li{
    margin-top: 0;
  }
  a.nav-link{
    margin-right: 3em;
  }
  /*  Featured Section  */
  .text{
    text-align: left;
    margin: 0 0 auto 4em;
  }
  #featured .text{
    flex: 1;
    order: 1;
  }
  #featured .image{
    flex: 1 0 12em;
    order: 2;
  }
  /*  Collections Section  */
  #collections .wrapper{
    margin: 0 4em;
  }
  /*  About Section  */
  #about .wrapper{
    display: block;
  }
  #about .text{
    margin-right: 4em;
  }
  .video-wrapper{
    margin: auto 4em;
  }
  /* Contact Section  */
  #contact .wrapper{
    flex-wrap: wrap;
  }
  .form-wrapper, .contact-wrapper{
    flex: 1 0 50%;
    align-self: center;
    padding: 0 1em;
  }
  .copy-wrapper{
    flex: 1 0 100%;
    padding: 0 1em;
    text-align: left;
    margin-left: 5%
  }
  .form-wrapper:after,
  .contact-wrapper:after{
    display: none;
  }
  .contact-footer{
    border: 0;
    padding: 0;
    margin: .6em auto;
    text-align: left;
  }
  .contact-footer:hover{
    background-color: transparent;
  }
  .contact-wrapper a.contact-footer:hover i{
  }
  .contact-wrapper a i{
    width: auto;
    padding-right: 1em;
  }
  .contact-wrapper .social-menu{
    display: flex;
    order: 3;
    justify-content: flex-start;
  }
  .contact-wrapper .social-menu a i{
    padding-right: 0;
  }
  .copy-wrapper:before{
    display: block;
    content: "";
    margin: 2em auto;
    border-bottom: solid 1px #dadada;
  }
}
@media(min-width: 992px){
  /*  Global  */
  section{
    padding: 5.8em 7em 0;
  }
  .title.title-left{
    margin-left: -2.5em;
  }
  .title.title-right{
    margin-right: -2.5em;
  }
  .line{
    width: 5.5em;
  }
  /*  Hero Section  */
  .hero-img img{
    width: 100%;
  }
  /*  Featured Section  */
  #featured .image{
    margin-top: -2em;
  }
  /* About Section  */
  #about .wrapper{
    display: flex;
  }
  #about .text{
    flex: 1 0 40%;
    margin-right: 1em;
    padding-bottom: 0;
  }
  .video-wrapper{
    flex: 2 0 55%;
    padding-bottom: 33.25%;
    align-self: center;
    margin: 1.4em 0;
  }
  .contact-tel{
    flex-basis: 20%;
  }
}
@media(min-width: 1200px){
  /*  Global  */
  h1{
    font-size: 2.4em;
  }
  section{
    padding: 5.8em 11em 0;
  }
  /*  Hero Section  */
  .hero-img img{
    width: 100%;
  }
  /*  Featured Section  */
  #featured .image{
    margin-top: -4em;
  }
  /*  About Section  */
  #about .text{
    padding-right: 3em;
    padding-bottom: 0;
  }
  .video-wrapper{
    margin: 0;
  }
}
</style>
