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
        }, 25);
      },
    },
    "anim"
  );

  tl.to(".line , .loader-text", {
    opacity: 0,
    duration: 1,
    delay: 2.3,
    onComplete: function () {
      document.querySelector("main").style.display = "block";
    },
  });

  tl.to("#loader", {
    y: "-100%",
    ease: "power3.out",
    duration: 0.5,
    onComplete: function () {
      document.querySelector("#loader").style.display = "none";
    },
  });
}
loaderAnimation()
// Loader Animation End
