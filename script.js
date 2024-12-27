function locomotivescrol (){
  gsap.registerPlugin(ScrollTrigger);


const locoScroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true
});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },

  pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
});
 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();
}
locomotivescrol()

// Loader Animation Start
function loaderAnimation() {
  let tl = gsap.timeline();

  tl.from(".line h1, .line h2", {
    y: 150,
    stagger: 0.3,
    duration: 0.6,
    delay: 0.5,
  });

  tl.from(
    ".loader-text",
    {
      opacity: 0,
      duration: 0.4,
    },
    "anim"
  );

  tl.from(
    ".line1-part1",
    {
      opacity: 0,
      onStart: function () {
        let line1h5 = document.querySelector(".line1-part1 h5");
        let counter = 0;

        const intervalId = setInterval(() => {
          counter++;
          line1h5.textContent = counter;

          if (counter >= 100) {
            clearInterval(intervalId);
          }
        }, 35);
      },
    },
    "anim"
  );

  tl.to(".line , .loader-text", {
    opacity: 0,
    duration: 1,
    delay: 3.5,
    onComplete: function () {
      document.querySelector("main").style.display = "block";
    },
  });

  tl.to("#loader", {
    y: "-100%",
    ease: "power3.out",
    duration: 0.8,
    onComplete: function () {
      document.querySelector("#loader").style.display = "none";
    },
  });
  tl.from("nav", {
    opacity: 0,
    duration: 1,
  },"a");
  tl.from("#hero1 h1, #hero2 h1, #hero3 h2, #hero4 h1", {
    y: 100,
    stagger: 0.3,
  });
  tl.from("#hero3 h3", {
    opacity: 0,
  });
  tl.to(".hero-text",{
    "--opacity": 1,
    delay: 1,
  }, "a")
}
// loaderAnimation();

//Cursor Animation Start
function cursorAnimation() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to(".cursor", {
      top: dets.y,
      left: dets.x,
    });
  });
  Shery.makeMagnet(".nav-links a");
  Shery.makeMagnet(".nav-icon svg", {
    duration: 1,
  });
  Shery.makeMagnet(".obys-logo svg", {
    duration: 1,
  });
}
cursorAnimation();

