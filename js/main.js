"use strict";
/*****************************************************************/
// Animate images
/*****************************************************************/
let images = document.querySelectorAll(".road-point>figure");
let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
};
let imgObserver = new IntersectionObserver(animateImg, options);

function animateImg(entries, observer) {
  let originalImg;
  let clonedImg;
  entries.forEach(entry => {
    originalImg = entry.target;
    const ratio = entry.intersectionRatio;
    const boundingRect = entry.boundingClientRect;
    const intersectionRect = entry.intersectionRect;
    if (entry.isIntersecting && boundingRect.top == intersectionRect.top) {
      console.log("entering from bottom");
      cloneElem(originalImg);
      document.addEventListener("scroll", getImgLocation);
    }
    if (
      !entry.isIntersecting &&
      boundingRect.top > 0 &&
      boundingRect.top < 100 + innerHeight
    ) {
      console.log("exiting from bottom");
      document.removeEventListener("scroll", getImgLocation);
      unCloneElem(originalImg);
    }
    if (
      entry.isIntersecting &&
      boundingRect.bottom > 0 &&
      boundingRect.bottom < innerHeight
    ) {
      console.log("entering from top");
      cloneElem(originalImg);
      document.addEventListener("scroll", getImgLocation);
    }
    if (!entry.isIntersecting && boundingRect.bottom <= 0) {
      console.log("exiting from top");
      document.removeEventListener("scroll", getImgLocation);
      unCloneElem(originalImg);
    }
  });
  function cloneElem(elem) {
    clonedImg = elem.cloneNode(true);
    clonedImg.classList.add("clone-img");
    document.body.appendChild(clonedImg);
    elem.style.visibility = "hidden";
  }
  function unCloneElem(elem) {
    document.querySelector(".clone-img")?.remove();
    clonedImg?.remove();
    elem.style.visibility = "";
  }
  function getImgLocation(isVerticalAnimation = true) {
    let phase = Math.abs(
      1 -
        (originalImg.getBoundingClientRect().top + originalImg.offsetHeight) /
          (innerHeight + originalImg.offsetHeight)
    );
    let perspective = "500";
    let scale = phase + 0.5;
    let rotatePivot = isVerticalAnimation ? "X" : "Y";
    let rotation = phase < 0.5 ? 0 : (phase - 0.5) * 40;
    let direction = isVerticalAnimation ? "Y" : "X";
    let translation = phase < 0.5 ? 0 : (phase - 0.5) * 900;
    clonedImg.style.transform = `perspective(${perspective}px)  rotate${rotatePivot}(${rotation}deg)  translate${direction}(calc(-50% + ${translation}px)) translateX(-50%) scale(${scale})`;
    console.log(phase);
  }
}
images.forEach(img => {
  imgObserver.observe(img);
});
// imgObserver.observe(document.querySelector(".first-img"));

/*********************************************************/
// Animate dots on svg map.
/*********************************************************/
const dotObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document
          .getElementById(`dot${entry.target.dataset.dot}`)
          .classList.add("ripple");
      } else {
        document
          .getElementById(`dot${entry.target.dataset.dot}`)
          .classList.remove("ripple");
      }
    });
  },
  { rootMargin: "-60% 0px -10%" }
);
document
  .querySelectorAll(".road-point")
  .forEach(dot => dotObserver.observe(dot));

/*********************************************************/
// Animate segments on svg map.
/*********************************************************/
const segmentObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document
          .getElementById(`segment${entry.target.dataset.segment}`)
          .classList.add("snake");
      } else {
        document
          .getElementById(`segment${entry.target.dataset.segment}`)
          .classList.remove("snake");
      }
    });
  },
  {
    rootMargin: "-79% 0px -20%",
  }
);
document.querySelectorAll(".road-segment").forEach(segment => {
  segmentObserver.observe(segment);
});
//
// document
//   .getElementById("btn")
//   .addEventListener("click", () => console.log("a"));
// document
//   .getElementById("btn")
//   .addEventListener("click", () => console.log("B"));
