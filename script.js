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
  });
  tl.from("#hero1 h1, #hero2 h1, #hero3 h2, #hero4 h1", {
    y: 100,
    stagger: 0.3,
  });
  tl.from("#hero3 h3", {
    opacity: 0,
  });
}
loaderAnimation();
// Loader Animation End

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

// Shery.textAnimate(".hero h1" , {
//   style: 1,
//   y: 50,
//   delay: 0.1,
//   duration: 1,
//   ease: "cubic-bezier(0.23, 1, 0.320, 1)",
//   multiplier: 0.1,
// });
