import { animate } from "motion";

const boxes = document.querySelectorAll(".box");

animate(
  boxes,
  {
    backgroundColor: "red",
    x: 100,
    rotate: 405,
  },
  {
    duration: 2.5,
    easing: "ease-in-out",
  }
);
