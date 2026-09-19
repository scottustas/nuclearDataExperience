console.log("🔥 NEW APP.JS IS RUNNING");

const canvas = document.querySelector("#dataCanvas");
const recordCount = document.querySelector("#recordCount");

const exploreButton = document.querySelector("#exploreButton");

const detailNumber = document.querySelector("#detailNumber");
const detailTitle = document.querySelector("#detailTitle");
const detailFieldOne = document.querySelector("#detailFieldOne");
const detailFieldTwo = document.querySelector("#detailFieldTwo");
const detailFieldThree = document.querySelector("#detailFieldThree");

let data = [];


// -----------------------------------------
// LOAD JSON
// -----------------------------------------

async function loadData() {
  console.log("Loading JSON...");

  try {
    const response = await fetch("./data/nuclear-detonations.json");

    console.log("Response:", response.status);

    if (!response.ok) {
      throw new Error(`JSON request failed: ${response.status}`);
    }

    data = await response.json();

    console.log("✅ Loaded records:", data.length);
    console.log("First record:", data[0]);

    initializeExperience();

  } catch (error) {
    console.error("❌ DATA ERROR:", error);

    if (recordCount) {
      recordCount.textContent = "DATA ERROR";
    }
  }
}


// -----------------------------------------
// INITIALIZE
// -----------------------------------------

function initializeExperience() {

  console.log("Initializing experience...");

  recordCount.textContent =
    `${data.length} DETONATIONS`;

  renderPoints();

  setupInteractions();

  setupAnimations();

  console.log(
    "Rendered points:",
    document.querySelectorAll(".data-point").length
  );
}


// -----------------------------------------
// RENDER POINTS
// -----------------------------------------

function renderPoints() {

  console.log("Rendering points...");

  canvas.innerHTML = "";

  data.forEach((record, index) => {

    const point = document.createElement("button");

    point.className = "data-point";

    point.type = "button";

    point.title = record.name;

    point.setAttribute(
      "aria-label",
      record.name
    );

    /*
      Convert longitude / latitude
      into percentages.

      longitude:
      -180 → 0%
       180 → 100%

      latitude:
       90 → 0%
      -90 → 100%
    */

    const x =
      ((record.longitude + 180) / 360) * 100;

    const y =
      ((90 - record.latitude) / 180) * 100;

    point.style.left = `${x}%`;
    point.style.top = `${y}%`;

    point.dataset.index = index;

    canvas.appendChild(point);
  });
}


// -----------------------------------------
// INTERACTION
// -----------------------------------------

function setupInteractions() {

  const points =
    document.querySelectorAll(".data-point");

  points.forEach(point => {

    point.addEventListener("click", () => {

      const index =
        Number(point.dataset.index);

      const record = data[index];

      showRecord(record);
    });

  });


  if (exploreButton) {

    exploreButton.addEventListener("click", () => {

      document
        .querySelector("#visualization")
        .scrollIntoView({
          behavior: "smooth"
        });

    });

  }
}


// -----------------------------------------
// DETAIL CARD
// -----------------------------------------

function showRecord(record) {

  detailNumber.textContent =
    String(data.indexOf(record) + 1)
      .padStart(3, "0");

  detailTitle.textContent =
    record.name;

  detailFieldOne.textContent =
    record.year;

  detailFieldTwo.textContent =
    `${record.yield_kt} kt`;

  detailFieldThree.textContent =
    record.site;


  if (typeof gsap !== "undefined") {

    gsap.fromTo(
      "#detailCard",
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out"
      }
    );

  }

}


// -----------------------------------------
// GSAP
// -----------------------------------------

function setupAnimations() {

  const points =
    document.querySelectorAll(".data-point");

  console.log(
    "GSAP points:",
    points.length
  );

  if (typeof gsap === "undefined") {

    console.warn("GSAP isn't loaded.");

    return;
  }


  const intro = gsap.timeline({
    defaults: {
      ease: "power3.out"
    }
  });


  intro
    .from(".eyebrow", {
      opacity: 0,
      y: 20,
      duration: 0.6
    })
    .from(".hero-title", {
      opacity: 0,
      y: 60,
      duration: 1
    }, "-=0.3")
    .from(".hero-description", {
      opacity: 0,
      y: 20,
      duration: 0.6
    }, "-=0.5")
    .from(".explore-button", {
      opacity: 0,
      y: 20,
      duration: 0.6
    }, "-=0.4");


// if (points.length) {
//     gsap.from(points, {
//       opacity: 0,
//       duration: 0.6,
//       stagger: 0.015,
//       ease: "power2.out",
//       delay: 1
//     });
//   }
}


// -----------------------------------------
// START
// -----------------------------------------

loadData();
