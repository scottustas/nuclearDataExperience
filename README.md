# Nuclear Data Experience

An interactive data visualization exploring the global footprint of nuclear detonations between 1945 and 2017.

The experience presents nuclear test data spatially, allowing users to explore individual detonations and view details such as year, yield, test type, and test site.

## Features

- Interactive global visualization of nuclear detonations
- Clickable data points for individual tests
- Detail panel displaying information about each detonation
- Animated introduction and interactive visual effects
- Yield-based visual effects for individual detonations
- Responsive, editorial-style presentation

## Built With

- HTML
- CSS
- JavaScript
- GSAP for animation
- JSON for the underlying dataset
- Google Fonts — Inter and DM Mono

## Data

The visualization uses a local JSON dataset containing information about nuclear detonations, including geographic coordinates, dates, yields, test types, and test sites.

## Project Structure

```text
nuclearDataExperience/
├── index.html
├── styles.css
├── app.js
├── README.md
├── img/
│   └── map.svg
└── data/
    └── nuclear-detonations.json
```

## Approach

The approach was to create interactive points on a map representing nuclear detonations. Since latitude and longitude data was provided, I was able to use an SVG map as a base and overlay each detonation at its corresponding location.

Once the map was established, I wanted to animate each point when clicked and create a visual comparison between the detonations based on their yield. From there, the focus shifted to typography, visual hierarchy, and GSAP animation to bring the experience together.
What I Cut

I intentionally kept the experience focused on the map, individual detonation records, and motion rather than adding filters, search, or additional data visualizations. The goal was to prioritize visual hierarchy, interaction, and a clear editorial experience within the available time.
Running Locally

The project can be run locally using the Live Server extension in VS Code.

Open the project folder in VS Code, launch index.html with Live Server, and the experience will load in your browser.

The project loads its data from:

./data/nuclear-detonations.json

## Purpose

This project is an exploration of how historical data can be presented through interactive visual storytelling. It focuses on the geographic and temporal footprint of the nuclear age and provides a way to explore individual records within the larger dataset.

