function locomotivescrol() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}

locomotivescrol();

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
  tl.from(
    "nav",
    {
      opacity: 0,
      duration: 1,
    },
    "a"
  );
  tl.from("#hero1 h1, #hero2 h1, #hero3 h2, #hero4 h1", {
    y: 100,
    stagger: 0.3,
  });
  tl.from("#hero3 h3", {
    opacity: 0,
  });
  tl.to(
    ".hero-text",
    {
      "--opacity": 1,
      delay: 1,
    },
    "a"
  );
}
// loaderAnimation();

// Navbar Animation Start

  // Initialize variables
  const navbar = document.querySelector('.navbar');
  let prevState = document.documentElement.scrollTop || document.body.scrollTop;

  document.addEventListener('scroll', () => {
    let currentState = document.documentElement.scrollTop || document.body.scrollTop;

    console.log('Previous State:', prevState, 'Current State:', currentState);

    if (prevState > currentState) {
      // Scrolling up, show the navbar
      gsap.to(navbar, {
        y: 0,
        duration: 0.5,
      });
    } else {
      // Scrolling down, hide the navbar
      gsap.to(navbar, {
        y: -navbar.offsetHeight,
        duration: 0.5,
      });
    }

    // Update prevState for the next scroll event
    prevState = currentState;
  });


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

function sheryAnimation() {
  // Shery.imageEffect(".images", {
  //   style: 5,
  //   // debug: true,
  //   config: {
  //     a: { value: 2.29, range: [0, 30] },
  //     b: { value: 0.53, range: [-1, 1] },
  //     zindex: { value: -9996999, range: [-9999999, 9999999] },
  //     aspect: { value: 0.7999771228123689 },
  //     ignoreShapeAspect: { value: true },
  //     shapePosition: { value: { x: 0, y: 0 } },
  //     shapeScale: { value: { x: 0.5, y: 0.5 } },
  //     shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
  //     shapeRadius: { value: 0, range: [0, 2] },
  //     currentScroll: { value: 0 },
  //     scrollLerp: { value: 0.07 },
  //     gooey: { value: true },
  //     infiniteGooey: { value: false },
  //     growSize: { value: 4, range: [1, 15] },
  //     durationOut: { value: 1, range: [0.1, 5] },
  //     durationIn: { value: 1.5, range: [0.1, 5] },
  //     displaceAmount: { value: 0.5 },
  //     masker: { value: false },
  //     maskVal: { value: 1, range: [1, 5] },
  //     scrollType: { value: 0 },
  //     geoVertex: { range: [1, 64], value: 1 },
  //     noEffectGooey: { value: true },
  //     onMouse: { value: 1 },
  //     noise_speed: { value: 0.31, range: [0, 10] },
  //     metaball: { value: 0.41, range: [0, 2] },
  //     discard_threshold: { value: 0.5, range: [0, 1] },
  //     antialias_threshold: { value: 0, range: [0, 0.1] },
  //     noise_height: { value: 0.5, range: [0, 2] },
  //     noise_scale: { value: 10, range: [0, 100] },
  //   },
  //   gooey: true,
  // });
}
sheryAnimation();

// Magnet Effect
function magnetAnimation() {
  const magneto = document.querySelector(".magneto");

  const magnetoText = document.querySelector("#magnet-text");

  // const dbgr = document.querySelector(".dbgr")

  //mouse move stuff

  const activateMagneto = (event) => {
    let boundBox = magneto.getBoundingClientRect();
    let magnetoStr = 70;
    let magnetoTextStr = 100;
    const newX = (event.clientX - boundBox.left) / magneto.offsetWidth - 0.5;
    const newY = (event.clientY - boundBox.top) / magneto.offsetHeight - 0.5;

    //this helps for debugging
    // dbgr.innerHTML = "cursorX:" + event.clientX + "<br>boxleft: " + Math.ceil(boundBox.left) + "<br>cursorInsideButton: " + Math.ceil(event.clientX - boundBox.left) + "<br>realtiveToTotalwidth: " + ((event.clientX - boundBox.left)/magneto.offsetWidth).toFixed(2) + "<br>shifted: " + ((event.clientX - boundBox.left)/magneto.offsetWidth - 0.5).toFixed(2)

    gsap.to(magneto, {
      duration: 1,
      x: newX * magnetoStr,
      y: newY * magnetoStr,
      ease: Power4.easeOut,
    });

    gsap.to(magnetoText, {
      duration: 0.5,
      x: newX * magnetoTextStr,
      y: newY * magnetoTextStr,
      ease: Power4.easeOut,
    });
  };

  //mouse leave stuff
  const removeMagneto = (event) => {
    gsap.to(magneto, {
      duration: 1,
      x: 0,
      y: 0,
      ease: Elastic.easeOut,
    });

    gsap.to(magnetoText, {
      duration: 1,
      x: 0,
      y: 0,
      ease: Elastic.easeOut,
    });
  };

  magneto.addEventListener("mousemove", activateMagneto);
  magneto.addEventListener("mouseleave", removeMagneto);
}
magnetAnimation();


console.log("Akash")
console.log(window)

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', () => {
    console.log('Scroll event detected after DOM loaded');
  });
});
console.log(window.addEventListener);


