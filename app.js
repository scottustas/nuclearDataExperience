const canvas = document.querySelector("#dataCanvas");
const recordCount = document.querySelector("#recordCount");

const exploreButton = document.querySelector("#exploreButton");

const detailNumber = document.querySelector("#detailNumber");
const detailTitle = document.querySelector("#detailTitle");
const detailFieldOne = document.querySelector("#detailFieldOne");
const detailFieldTwo = document.querySelector("#detailFieldTwo");
const detailFieldThree = document.querySelector("#detailFieldThree");
const detailFieldFour = document.querySelector("#detailFieldFour");

let data = [];

// -----------------------------------------
// LOAD JSON
// -----------------------------------------

async function loadData() {
  try {
    const response = await fetch("./data/nuclear-detonations.json");

    if (!response.ok) {
      throw new Error(`JSON request failed: ${response.status}`);
    }

    data = await response.json();

    console.log("Loaded records:", data.length);

    initializeExperience();

  } catch (error) {
    console.error("DATA ERROR:", error);

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
    point.setAttribute("aria-label", record.name);

    const x = ((record.longitude + 180) / 360) * 100;
    const y = ((90 - record.latitude) / 180) * 100;

    point.style.left = `${x}%`;
    point.style.top = `${y}%`;
    point.dataset.index = index;

    const randomDelay = (2.0 + Math.random() * 2.5).toFixed(2);
    point.style.animation = `pointPop 0.8s cubic-bezier(0.25, 1, 0.5, 1) ${randomDelay}s both`;

    // 🔓 Release the transform lock the moment the point finishes animating in
    point.addEventListener("animationend", () => {
      point.style.animation = "";
    }, { once: true });

    canvas.appendChild(point);
  });
}

// -----------------------------------------
// INTERACTION
// -----------------------------------------

function setupInteractions() {

  const points = document.querySelectorAll(".data-point");

  points.forEach(point => {

    point.addEventListener("click", () => {

      points.forEach(p => p.classList.remove("active"));
      point.classList.add("active");

      const index = Number(point.dataset.index);
      const record = data[index];

      const yieldVal = Number(record.yield_kt) || 1;
      const logYield = Math.log10(Math.max(yieldVal, 0.001));

      const maxRadius =
        Math.min(
          Math.max(15 + (logYield * 12), 15),
          70
        );

      if (typeof gsap !== "undefined") {

        // Prevent overlapping GSAP shockwave animations on rapid clicks
        gsap.killTweensOf(point);

        gsap.fromTo(
          point,
          {
            boxShadow: "0 0 0 8px rgba(216,255,62,0.8)"
          },
          {
            boxShadow: `0 0 0 ${maxRadius}px rgba(216,255,62,0)`,
            duration: 1.6,
            ease: "power2.out"
          }
        );
      }

      showRecord(record, index);
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

function showRecord(record, index) {

  detailNumber.textContent =
    String(index + 1).padStart(3, "0");

  detailTitle.textContent =
    record.name;

  detailFieldOne.textContent =
    record.year;

  const yieldValue = Number(record.yield_kt);

  let yieldContext;

  if (yieldValue) {
    const hiroshimaRatio =
      (yieldValue / 15).toFixed(1);

    if (hiroshimaRatio > 1) {
      yieldContext =
        `${yieldValue} kt (~${hiroshimaRatio}× estimated Hiroshima yield)`;
    } else {
      yieldContext =
        `${yieldValue} kt (below estimated Hiroshima yield)`;
    }
  } else {
    yieldContext = "Unannounced / Undisclosed";
  }

  detailFieldTwo.textContent =
    yieldContext;

  detailFieldThree.textContent =
    record.test_type;

  detailFieldFour.textContent =
    record.site;

  if (typeof gsap !== "undefined") {
    gsap.fromTo(
      "#detailCard",
      { y: 30, opacity: 0 },
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

    // Stagger each line of the hero title sequentially
    .from(".title-line", {
      opacity: 0,
      y: 50,
      duration: 2,
      stagger: .5, 
      ease: "power3.out"
    }, "-=0.3")
    .from(".hero-description", {
      opacity: 0,
      y: 20,
      duration: 1
    }, "-=1")
    .from(".explore-button", {
      opacity: 0,
      y: 20,
      duration: 1
    }, "-=1");


}


// -----------------------------------------
// START
// -----------------------------------------

loadData();
