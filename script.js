function locomotivescrol() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  //  window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
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
    opacity: 0,
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
loaderAnimation();

//Cursor Animation Start
function cursorAnimation() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to(".cursor", {
      display: "block",
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

  let hero3 = document.querySelector("#hero3");

  hero3.addEventListener("mousemove", function (event) {
    const hero3Bound = hero3.getBoundingClientRect();
    const newX = event.clientX - hero3Bound.left;
    const newY = event.clientY - hero3Bound.top;
    gsap.to("#flag", {
      opacity: 1,
      left: newX + "px",
      top: newY + "px",
    });
  });
  hero3.addEventListener("mouseleave", function (event) {
    gsap.to("#flag", {
      opacity: 0,
    });
  });

  let vidContainer = document.querySelector(".video-container");

  vidContainer.addEventListener("mousemove", function (event) {
    const vidConBound = vidContainer.getBoundingClientRect();
    const newX = event.clientX - vidConBound.left;
    const newY = event.clientY - vidConBound.top;

    gsap.to(".cursor", {
      opacity: 0,
      duration: 0.3,
    });
    gsap.to(".secnd-crsr", {
      left: newX + "px",
      top: newY + "px",
    });
  });

  vidContainer.addEventListener("mouseleave", function () {
    gsap.to(".cursor", {
      opacity: 1,
      duration: 0.3,
    });
    gsap.to(".secnd-crsr", {
      left: initialPosition.left,
      top: initialPosition.top,
      ease: "power2.out",
      duration: 0.5,
    });
  });

  const initialPosition = { top: "0%", left: "75%" };
  let secCursor = document.querySelector(".secnd-crsr");
  let video = document.querySelector(".video-container video");
  let img = document.querySelector(".video-container img");

  let videoPlaying = false;

  vidContainer.addEventListener("click", () => {
    if (!videoPlaying) {
      video.play();
      video.style.opacity = 1;
      img.style.opacity = 0;
      secCursor.innerHTML = `<i class="ri-pause-large-fill"></i>`;
      gsap.to(secCursor, {
        scale: 0.6,
      });
      videoPlaying = true;
    } else {
      video.pause();
      video.style.opacity = 0;
      img.style.opacity = 1;
      secCursor.innerHTML = `<i class="ri-play-large-fill"></i>`;
      gsap.to(secCursor, {
        scale: 1,
      });
      videoPlaying = false;
    }
  });
}
cursorAnimation();

function sheryAnimation() {
  Shery.imageEffect(".images", {
    style: 5,
    // debug: true,
    duration: 0.01,
    config: {
      a: { value: 2.29, range: [0, 30] },
      b: { value: 0.53, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7999771228123689 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: false },
      maskVal: { value: 1, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.31, range: [0, 10] },
      metaball: { value: 0.41, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
    gooey: true,
  });
}
// sheryAnimation();

// Scroll Animation
function scrollAnimation() {
  const animations = [
    { selector: "#sec2-title-h1", trigger: "#section2", y: 100 },
    { selector: "#sec3-title-h1", trigger: "#section3", y: 100 },
    { selector: ".footer-title", trigger: ".footer" },
    { selector: ".unline1", trigger: "#section2", width: 0 },
    { selector: ".unline2", trigger: "#section3", width: 0 },
    { selector: ".unline3", trigger: ".unline3", width: 0 },
    {
      selector: ".unline4",
      trigger: ".unline4",
      width: 0,
      start: "top 80%",
      end: "top 35%",
    },
    {
      selector: ".unline5",
      trigger: ".unline4",
      width: 0,
      start: "top 80%",
      end: "top 35%",
    },
  ];

  animations.forEach(
    ({
      selector,
      trigger,
      y = 0,
      width,
      start = "top 70%",
      end = "top 40%",
    }) => {
      gsap.from(selector, {
        y,
        width,
        opacity: 0,
        duration: 0.6,
        ease: "power4.Out",
        scrollTrigger: {
          trigger,
          scroller: "main",
          start,
          end,
        },
      });
    }
  );
}
scrollAnimation();

// Animate Paragraph
function animateParagraph() {
  const split = new SplitType(".split-para", { types: "lines" });

  gsap.from(split.lines, {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.05,
    scrollTrigger: {
      trigger: "#section3",
      scroller: "main",
      start: "top 20%",
      end: "top 0%",
      // scrub: 1,
      // markers: true,
    },
  });

  document.querySelectorAll(".split-para div").forEach((line) => {
    line.style.fontFamily = "inherit";
    line.style.display = "block";
    line.style.whiteSpace = "pre";
  });
}
animateParagraph();

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

// Text Animation
function TextAnimation() {
  let FooterTitle = document.querySelector(".footer-title");

  const split = new SplitType("#fade-text", { types: "chars" });
  FooterTitle.addEventListener("mouseenter", function () {
    gsap.fromTo(
      split.chars,
      {
        opacity: 0, 
      },
      {
        opacity: 1,
        y: 0, 
        duration: 1, 
        stagger: 0.05, 
        onStart: () => {
          gsap.set(split.chars, {
            fontFamily: "silk-serif",
            WebkitTextStroke: "1px #fff",
            color: "transparent",
            fontWeight: 100,
          });
        },
      }
    );
    gsap.to(".foot-arrow", {
      x: 50,
      duration: 0.3,
      ease: "power4.Out",
    });
    console.log("Hovered");
  });
  FooterTitle.addEventListener("mouseleave", function () {
    gsap.fromTo(
      split.chars,
      {
        opacity: 0, 
      },
      {
        opacity: 1, 
        duration: 1, 
        stagger: 0.05, 
        onStart: () => {
          gsap.set(split.chars, {
            webkitTextStroke: "0px #000", 
            color: "inherit", 
            fontFamily: "DM", 
            fontWeight: 900,
          });
        },
      }
    );
    gsap.to(".foot-arrow", {
      x: 0,
      duration: 0.1,
    });
    console.log("Mouse left");
  });
}
TextAnimation();

// Menu TextAnimation
function MenuTextAnimation() {
  const pageLinks = document.querySelectorAll(".page-links a");

  pageLinks.forEach((link) => {
    const split = new SplitType(link, { types: "chars" });
    link.addEventListener("mouseenter", function () {
      gsap.fromTo(
        split.chars,
        {
          opacity: 0, // Starting opacity
        },
        {
          opacity: 1, // Final opacity
          y: 0, // Final position
          duration: 1, // Animation duration
          stagger: 0.1, // Delay between characters
          onStart: () => {
            // Apply animation styles only if not active
            gsap.set(split.chars, {
              fontFamily: "silk-serif",
              WebkitTextStroke: "1px #fff",
              color: "transparent",
              fontWeight: 100,
            });
          },
        }
      );
    });
    link.addEventListener("mouseleave", function () {
      gsap.fromTo(
        split.chars,
        {
          opacity: 0, // Current state
        },
        {
          opacity: 1, // Reverse the y position (optional)
          duration: 1, // Animation duration
          stagger: 0.1, // Delay between characters
          onStart: () => {
            // Reset webkit text stroke and font-family only if not active
            gsap.set(split.chars, {
              WebkitTextStroke: "0px #000", // Reset stroke
              fontFamily: "DM", // Original font-family
              color: "inherit", // Reset color
              fontWeight: 900,
            });
          },
        }
      );
    });
  });
}
MenuTextAnimation();

// Toggle Menu Animation
function toggleNavMenu({
  navIconSelector = ".nav-icon",
  linksSelector = ".link a",
  navPart2Selector = ".nav-part2",
  dropMenuSelector = ".drop-menu",
  pageLinksDivSelector = ".page-links-div",
}) {
  const navIcon = document.querySelector(navIconSelector);
  const links = document.querySelectorAll(linksSelector);
  const navPart2 = document.querySelector(navPart2Selector);
  const dropMenu = document.querySelector(dropMenuSelector);
  const pageLinksDiv = document.querySelector(pageLinksDivSelector);


  let toggle = false;

  navIcon.addEventListener("click", function () {
    
    const tl = gsap.timeline();

    if (!toggle) {
      tl.to(navPart2, {
        display: "none",
        opacity: 0,
        duration: 0.3,
        ease: "circ.out",
      });
      tl.fromTo(
        dropMenu,
        { y: "-100%" },
        {
          y: "0%",
          duration: 0.6,
          ease: "circ.out",
        }
      );
      tl.fromTo(
        links,
        { y: "-100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.3,
          ease: "circ.out",
          stagger: 0.1,
        }
      );
      tl.fromTo(
        pageLinksDiv,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          ease: "circ.out",
        }
      );


      toggle = true;
    } else {
      tl.fromTo(
        links,
        { y: "0%", opacity: 1 },
        {
          y: "-100%",
          opacity: 0,
          duration: 0.3,
          ease: "expoScale(0.5, 7, none)",
          stagger: 0.1,
        },
        "anim"
      );
      
      tl.fromTo(
        pageLinksDiv,
        { opacity: 1 },
        {
          opacity: 0,
          duration: 0.3,
          ease: "expoScale(0.5, 7, none)",
        },
        "anim"
      );
      tl.fromTo(
        dropMenu,
        { y: "0%" },
        {
          y: "-100%",
          duration: 0.6,
          delay: 0.3,
          ease: "circ.out",
        }
      );
      tl.to(navPart2, {
        display: "flex",
        opacity: 1,
        duration: 0.3,
        ease: "expoScale(0.5, 7, none)",
      });

      toggle = false;
    }
  });
}
toggleNavMenu({});

