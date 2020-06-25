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

function contentAnimation() {
  var tl = gsap.timeline();
  var tl2 = gsap.timeline();
  var tl3 = gsap.timeline();
  tl.from(".guido img, .guido h1,.guido h2,.guido h3,.guido h4,.guido p", {  duration: 1.2, translateX: 50, opacity: 0, stagger: 0.2 });
  tl2.from(".mirko img, .mirko h1,.mirko h2,.mirko h3,.mirko h4,.mirko p", { duration: 1.2, translateX: 50, opacity: 0, stagger: 0.2 });
  // tl3.from(".azienda h1,.azienda h2,.azienda h3,.azienda h4,.azienda p", {   duration: 1.2, translateX: 50, opacity: 0, stagger: 0.2 });
  
}

function leaveAnimation() {
  var tl = gsap.timeline();
  var tl2 = gsap.timeline();
  var tl3 = gsap.timeline();
  tl.from(".guido img, .guido h1,.guido h2,.guido h3,.guido h4,.guido p", {  duration: 1.2, translateX: -50, opacity: 0, stagger: 0.1 });
  tl2.from(".mirko img, .mirko h1,.mirko h2,.mirko h3,.mirko h4,.mirko p", { duration: 1.2, translateX: -50, opacity: 0, stagger: 0.1 });
  // tl3.from(".azienda h1,.azienda h2,.azienda h3,.azienda h4,.azienda p", {   duration: 1.2, translateX: -50, opacity: 0, stagger: 0.1 });
  
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
