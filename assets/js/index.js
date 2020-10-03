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




document.addEventListener(
  "click",
  function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches(".servizio-link")) return;

    // Don't follow the link
    event.preventDefault();

    contentAnimation();

    setTimeout(function () {
      renderText(event.target.dataset);
    }, 1000);
  },
  false
);

function renderText(data) {
  var tl = gsap.timeline();
  if(data.counter != 01){
      

      tl.to("#box", {
        duration: 0.5,
        scaleX: 1,
        opacity: 0,
        ease: Power2.easeInOut,
        stagger: 0.1,
      });
    
  }else{
    tl.to("#box", {
      duration: 0.5,
      scaleX: 1,
      opacity: 1,
      ease: Power2.easeInOut,
      stagger: 0.1,
    });
  }

  // var template = document.getElementById('template').innerHTML;
  var titolo = document.getElementById("template-titolo").innerHTML;
  var contenuto = document.getElementById("template-contenuto").innerHTML;
  var lista = document.getElementById("template-lista").innerHTML;
  var counter = document.getElementById("template-counter").innerHTML;

  var json = {
    titolo: data.titolo,
    contenuto: data.contenuto,
    box_title: data.box_title,
    items: data.items.split(";"),
  };
  
  

  var renderedTitolo = Mustache.render(titolo, { titolo: data.titolo });
  var renderedContenuto = Mustache.render(contenuto, {
    contenuto: data.contenuto,
  });

  
  
  
  var renderedLista = Mustache.render(lista, { items: data.items.split(";") });
  var renderedCounter = Mustache.render(counter, { counter: data.counter });
  
  

  document.getElementById("data-titolo").innerHTML = renderedTitolo;
  document.getElementById("data-contenuto").innerHTML = renderedContenuto;
  document.getElementById("data-lista").innerHTML = renderedLista;
  document.getElementById("data-counter").innerHTML = renderedCounter;
  
  
  
  

}

function contentAnimation() {

  
  var tl4 = gsap.timeline();
  tl4
    .to(".text__first-bg", 0.5, {
      scaleX: 1,
      ease: Power2.easeInOut,
      stagger: 0.1,
    })
    .to(".text__word", { opacity: 1, ease: Power2.easeInOut }, "-=0.1")
    .to(".text__first-bg", { scaleX: 0, ease: Power2.easeInOut });

  var tl5 = gsap.timeline();
  tl5
    .to(".number", {
      duration: 0.8,
      opacity: 0,
      scale: 100,
      ease: Power2.easeInOut,
    })
    .to(
      ".number",
      {
        delay: 0.4,
        duration: 0.3,
        opacity: 0.4,
        scale: 1,
        ease: Power2.easeInOut,
      },
      "-=0.1"
    );

  var tl6 = gsap.timeline();
  tl6.from(".cover", 1, { scaleX: 0, transformOrigin: "right" });
  tl6.to(".cover", 1, { scaleX: 0, transformOrigin: "left" }, "reveal");
  tl6.from("main.case-history .carousel-item.active", 1, { opacity: 0 }, "reveal");

  var tl7 = gsap.timeline();
  tl7.from("#rectangle rect", {
    scaleX: 0,
    transformOrigin: "right",
    delay: 1,
    ease: Power2.easeOut,
  });
  tl7.to("#rectangle rect", { scaleX: 1, transformOrigin: "left" }, "reveal");

  var tl8 = gsap.timeline();
  tl8.from("#rectangleblack rect", {
    scaleX: 0,
    transformOrigin: "right",
    delay: 1.5,
    ease: Power2.easeOut,
  });
  tl8.to(
    "#rectangleblack rect",
    { scaleX: 1, transformOrigin: "left" },
    "reveal"
  );

  var tl9 = gsap.timeline();
  var path = document.querySelector("#circle circle");

  if (path) {
    var lenght = path.getTotalLength();
    tl9.set(path, { strokeDasharray: lenght });
    tl9.fromTo(path, 3, { strokeDashoffset: lenght }, { strokeDashoffset: 0 });
  }


  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const servizio = urlParams.get('servizio')
  if(servizio != null){
    const link = document.querySelectorAll("[data-index='"+servizio+"']");
    link[0].children[0].click()
  }

  
  

}
function resetScroll(){
  window.scrollTo(0, 0);
  console.log('ciao');

}
function leaveAnimation() {}



function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
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
        resetScroll();
      },

      async once(data) {
        contentAnimation();
      },
    },
  ],
});


AOS.init();