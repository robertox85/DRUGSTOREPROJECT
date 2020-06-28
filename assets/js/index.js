var html = document.documentElement;
var body = document.body;

var scroller = {
  target: document.querySelector("#scroll-container"),
  ease: 0.05, // <= scroll speed
  endY: 0,
  y: 0,
  resizeRequest: 1,
  scrollRequest: 0,
};

var requestId = null;

// setScoller();

function setScoller() {
  TweenLite.set(scroller.target, {
    rotation: 0.01,
    force3D: true,
  });
}

// window.addEventListener("load", onLoad);

function pageTransition() {
  var tl = gsap.timeline();

  tl.to("ul.transition li", {
    duration: 0.5,
    scaleX: 1,
    transformOrigin: "left",
    stagger: 0.2,
  });

  tl.to("ul.transition li", {
    duration: 0.5,
    scaleX: 0,
    transformOrigin: "left",
    stagger: 0.1,
    delay: 0.1,
  });
}

document.addEventListener('click', function (event) {

	// If the clicked element doesn't have the right selector, bail
	if (!event.target.matches('.servizio-link')) return;

	// Don't follow the link
  event.preventDefault();
  

  
  contentAnimation();

  setTimeout(function(){
    renderHello(event.target.dataset);  
  },1000)

}, false);


function renderHello(data) {
  // var template = document.getElementById('template').innerHTML;
  var titolo = document.getElementById('template-titolo').innerHTML;
  var contenuto = document.getElementById('template-contenuto').innerHTML;
  var lista = document.getElementById('template-lista').innerHTML;
  var counter = document.getElementById('template-counter').innerHTML;

  var json = { 
    titolo: data.titolo,
    contenuto: data.contenuto,
    items: data.items.split(';')
  };
  
  var renderedTitolo = Mustache.render(titolo, {titolo:data.titolo});
  var renderedContenuto = Mustache.render(contenuto, {contenuto:data.contenuto});
  var renderedLista = Mustache.render(lista, {items:data.items.split(';')});
  var renderedCounter = Mustache.render(counter, {counter:data.counter});

  document.getElementById('data-titolo').innerHTML = renderedTitolo;
  document.getElementById('data-contenuto').innerHTML = renderedContenuto;
  document.getElementById('data-lista').innerHTML = renderedLista;
  document.getElementById('data-counter').innerHTML = renderedCounter;

  
  
}

function contentAnimation() {
  var tl = gsap.timeline();
  var tl2 = gsap.timeline();
  var tl3 = gsap.timeline();
  tl.from(".guido img, .guido h1,.guido h2,.guido h3,.guido h4,.guido p", {  duration: 1.2, translateX: 50, opacity: 0, stagger: 0.2 });
  tl2.from(".mirko img, .mirko h1,.mirko h2,.mirko h3,.mirko h4,.mirko p", { duration: 1.2, translateX: 50, opacity: 0, stagger: 0.2 });
  // tl3.from(".azienda h1,.azienda h2,.azienda h3,.azienda h4,.azienda p", {   duration: 1.2, translateX: 50, opacity: 0, stagger: 0.2 });


  
  var tl4 = gsap.timeline();
  var tl5 = gsap.timeline();
  tl5
  .to('.number', {          duration: .8,  opacity:0,   scale:100,  ease:  Power2.easeInOut})
  .to('.number', {delay:.4, duration: 0.3, opacity:.4,  scale:1,    ease:  Power2.easeInOut}, "-=0.1")

  tl4
  .to('.text__first-bg',     .5, {scaleX:1,   ease:  Power2.easeInOut, stagger:0.1})
  .to('.text__word',             {opacity:1,  ease:  Power2.easeInOut}, "-=0.1")
  .to('.text__first-bg',         {scaleX:0,   ease:  Power2.easeInOut})
  
  
  
  
}

function leaveAnimation() {
  // var tl = gsap.timeline();
  // var tl2 = gsap.timeline();
  // var tl3 = gsap.timeline();
  // tl.from(".guido img, .guido h1,.guido h2,.guido h3,.guido h4,.guido p", {  duration: 1.2, translateX: -50, opacity: 0, stagger: 0.1 });
  // tl2.from(".mirko img, .mirko h1,.mirko h2,.mirko h3,.mirko h4,.mirko p", { duration: 1.2, translateX: -50, opacity: 0, stagger: 0.1 });
  // tl3.from(".azienda h1,.azienda h2,.azienda h3,.azienda h4,.azienda p", {   duration: 1.2, translateX: -50, opacity: 0, stagger: 0.1 });

  var tl4 = gsap.timeline();
  tl4
  .to('.text__first-bg', {scaleX:1,   ease:  Power2.easeInOut})
  .to('.text__word',     {opacity:1,  ease:  Power2.easeInOut}, "-=0.1")
  .to('.text__first-bg', {scaleX:0,   ease:  Power2.easeInOut})
  
  
}

function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

function onLoad() {
  updateScroller();
  window.focus();
  window.addEventListener("resize", onResize);
  document.addEventListener("scroll", onScroll);
}

function updateScroller() {
  var resized = scroller.resizeRequest > 0;

  if (resized) {
    var height = scroller.target.clientHeight;
    body.style.height = height + "px";
    scroller.resizeRequest = 0;
  }

  var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

  scroller.endY = scrollY;
  scroller.y += (scrollY - scroller.y) * scroller.ease;

  if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
    scroller.y = scrollY;
    scroller.scrollRequest = 0;
  }

  TweenLite.set(scroller.target, {
    y: -scroller.y,
  });

  requestId =
    scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
}

function onScroll() {
  scroller.scrollRequest++;
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
  }
}

function onResize() {
  scroller.resizeRequest++;
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
  }
}

barba.init({
  sync: true,
  transitions: [
    {
      async leave(data) {
        const done = this.async();

        // leaveAnimation();
        pageTransition();
        await delay(1200);
        done();

        
      },

      async enter(data) {
        contentAnimation();
      },

      async once(data) {
        contentAnimation();
      },
    },
  ],
});
