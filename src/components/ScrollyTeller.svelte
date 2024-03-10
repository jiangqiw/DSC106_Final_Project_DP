<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import Map from "./Map.svelte";
  import { geoMercator } from "d3-geo";
  import Graph from "./Graph.svelte";
  import GenderPointsPage from "./gender_points_page.svelte";
  import Pclass_1Page from "./passenger_class1_points_page.svelte";
  import { fade } from 'svelte/transition';
  import GenderPointsAlive from "./gender_points_page_alive.svelte";
  import Pclass_Survival from "./passenger_class1_points_survival_page.svelte";
  import AgePoints from "./age_points.svelte";
  import AgePointsAlive from "./age_points_survival.svelte";
  import FareAmountPointsPage from "./fare_amount_points_page.svelte";
  import FareAmountPointsAlivePage from "./fare_amount_points_alive_page.svelte";
  import { onMount } from 'svelte';

  let htmlContent = '';
  let count, index, offset, progress;
  let width, height;
  let currentVisualization = 'gender';
  let pclassVisualization = 'class1';
  let ageVisualization = 'age';
  let fareVisualization = 'fare';
  let showCasualtyLegend_gender = false;
  let showCausaltyLegend_pclass = false;
  let showCasultyLegend_age = false;
  let showCasualtyLegend_fare = false;

  // let adjustedWidth = width * 1;
  // let adjustedHeight = height * 1;

  let geoJsonToFit = {
    type: "FeatureCollection",
    features: [ 
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [1, 0],
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [0, 1],
        },
      },
    ],
  };

  $: projection = geoMercator().fitSize([width * 1.05, height * 1.05], geoJsonToFit);

  onMount(async () => {
    const response = await fetch("src/components/index.html");
    htmlContent = await response.text();
  });

  function toggleVisualization_pclass() {
    // If the current visualization is 'gender', switch to 'gender_alive'
    if (pclassVisualization === 'class1') {
        pclassVisualization = 'casualty';
        showCausaltyLegend_pclass = true;
    } else {
        // In any other case (including when it's 'gender_alive' or any 'pclass' state), switch back to 'gender'
        pclassVisualization = 'class1';
        showCausaltyLegend_pclass = false;
    }
}
  function toggleVisualization_age() {
      // If the current visualization is 'gender', switch to 'gender_alive'
      if (ageVisualization === 'age') {
          ageVisualization = 'casualty';
          showCasultyLegend_age = true;
      } else {
          // In any other case (including when it's 'gender_alive' or any 'pclass' state), switch back to 'gender'
          ageVisualization = 'age';
          showCasultyLegend_age = false;
      }
  }

  function toggleVisualization_fare() {
      // If the current visualization is 'gender', switch to 'gender_alive'
      if (fareVisualization === 'fare') {
          fareVisualization = 'casualty';
          showCasualtyLegend_fare = true;
      } else {
          // In any other case (including when it's 'gender_alive' or any 'pclass' state), switch back to 'gender'
          fareVisualization = 'fare';
          showCasualtyLegend_fare = false;
      }
  }


  function toggleVisualization_gender() {
    // If the current visualization is 'gender', switch to 'gender_alive'
    if (currentVisualization === 'gender') {
        currentVisualization = 'casualty';
        showCasualtyLegend_gender = true;
    } else {
        // In any other case (including when it's 'gender_alive' or any 'pclass' state), switch back to 'gender'
        currentVisualization = 'gender';
        showCasualtyLegend_gender = false;
    }
}

  let currentBackground = '/titanic.jpeg'; // Default background image

  // Update the background image based on the current page index
  $: if (index === 5) { // Assuming pages are 0-indexed, so page 5 has an index of 4
    currentBackground = '/gender.jpg';
  } else if (index === 1){
    currentBackground = '/Pclass.jpg';
  } else if (index === 7){
    currentBackground = '/Age.jpg';
  } else if (index === 3){
    currentBackground = '/Fare.jpg';
  }
  else {
    currentBackground = '/titanic.jpeg';
  }
</script>

<style>
  header {
    width: 100%;
    text-align: center;
    font-size: 2em; 
    margin: 1em 0;
    outline: none;
  }

  /* .background {
    width: 100%;
    height: 100vh;
    outline: none;
  }

  .background::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('titanic.jpeg');
    background-size: cover;
    background-position: center;
    opacity: 0.3; }  */
    /* z-index: -1; */

    .background {
    /* Keep your background styles but remove the opacity here */
    width: 100%;
    height: 100vh;
    position: relative;
    background-size: cover;
    background-position: center;
    z-index: -1;
  }

  .background-image {
    /* New class for the actual background image with opacity */
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.3; /* Set your desired opacity for the background image here */
    z-index: -2; /* Ensure it's behind everything else */
  }


  .foreground {
    width: 50%;
    margin: auto;
    height: auto;
    position: relative;
    /* outline: rgb(134, 130, 130) solid 3px; */
    margin-left: auto;
    margin-right: auto; 
  }

  .progress-bars {
    position: absolute;
    background: rgba(168, 168, 169, 0.2) ;
    visibility: visible;
    opacity:1;
    z-index:auto;
  }
  

  section {
    height: 100vh;
    /* background-color: rgba(0, 0, 0, 0.2); 20% opaque */
    background-color: none;
    /* color: white; */
    /* outline: rgb(196, 193, 196) solid 3px; */
    outline: none;
    text-align: center;
    max-width: 1000; /* adjust at will */
    color: black;
    padding: 2em;
    margin: 0 0 2em 0;
  }
  .background-info {
    font-size:20px;
    padding:10px;
  }
  .reminder {
    bottom:0;
    font-size:25px;
    margin-top:100px;
    color:red;
  }

  .visualization-container {
  position: relative;
  height: 100vh; /* Adjust based on your content */
  width: 100%; /* This could also be a specific width depending on your design */
  top: 0px;
  margin-top: none;
  padding: none;
  }

  .legend {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 10px;
    margin-bottom: 0px;
    margin-right: 100px;
    /* Add more styling as needed */
}

.legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px; /* Space between legend items */
}

.dot {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 5px;
}

.dot-blue {
    background-color: blue;
}

.dot-red {
    background-color: red;
}

.dot-green {
    background-color: green;
}

.dot-lightblue {
    background-color: blue;
    opacity: 0.3;
}

.dot-lightred {
    background-color: red;
    opacity: 0.3;
}

.dot-lightgreen {
    background-color: green;
    opacity: 0.3;
}

.aesthetic-button {
    background-color: #a1620a; /* Green background */
    color: white; /* White text */
    padding: 15px 32px; /* Some padding */
    font-size: 16px; /* Text size */
    border: none; /* No borders */
    border-radius: 5px; /* Rounded corners */
    cursor: pointer; /* Pointer cursor on hover */
    transition: background-color 0.3s ease; /* Smooth transition for hover effect */
    box-shadow: 0 2px 4px rgba(0,0,0,0.2); /* Subtle shadow */
}

.aesthetic-button:hover {
    background-color: #45a049; /* Darker shade of green on hover */
}

.aesthetic-button:focus {
    outline: none; /* Removes outline on focus for aesthetics, ensure accessibility in other ways */
}


/* Assuming GenderPointsPage and Pclass_1Page have a top-level element you can target */
/* .gender-points, .pclass-1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
} */

</style>

<header>Surviving the Titanic: The Role of Age, Gender, Class, and Occupation</header>

<Scroller
  top={0.0}
  bottom={1}
  threshold={0.5}
  bind:count
  bind:index
  bind:offset
  bind:progress
>
<div class="background" slot="background" bind:clientWidth={width} bind:clientHeight={height}>
  <!-- Separate container for the background image to control its opacity independently -->
  <div class="background-image" style="background-image: url({currentBackground});"></div>
  <Map bind:geoJsonToFit {index} />
  <Graph {index} {width} {height} {projection} />
  <div class="progress-bars">
    <p>total progress:<strong>{index + 1}/{count}</strong></p >
    <progress value={progress || 0}></progress>
  </div>
</div>

  <div class="foreground" slot="foreground">
    <!-- <section>This is the first section.
      <div class="background-info">
        On April 15, 1912, the RMS Titanic, a marvel of early 20th-century engineering, embarked on its maiden voyage from Southampton to New York City. However, this journey was tragically cut short after the ship collided with an iceberg in the North Atlantic. This disaster resulted in the loss of over 1,500 lives, making it one of the deadliest peacetime maritime disasters in history. The Titanic's sinking has since captivated the public imagination, leading to numerous investigations, studies, and narratives that seek to understand the circumstances and decisions that led to such high mortality. Factors such as social class, gender, age, and access to lifeboats have been extensively analyzed to comprehend the disparities in survival rates among the passengers.
      </div>
      <div class="background-info">
        This visualization project aims to delve into the intricate dynamics of survival aboard the Titanic, focusing on how various factors influenced the chances of surviving the disaster. Our research question centers on comparing the survival rates across different demographics and circumstances, including gender, passenger class (Pclass), fare price, availability of lifeboats, and age. By examining these variables, we seek to uncover patterns and insights that can provide a deeper understanding of the social, economic, and logistical elements that played a critical role in determining who survived and who perished in this tragic event. Through this analysis, we aspire to contribute to the ongoing discussion about the Titanic, offering a nuanced perspective on how different factors intersected to affect survival chances on that fateful night.
      <div class="reminder">
        Please Full Screen to Gain Maximized Experience
      </div>
      </section> -->
    <!-- <section>This is the second section.</section> -->
    <section style="font-size: 30px; font-family: 'Georgia', serif;">The Maiden Journey of Dreams and Tragedy</section>
    <section style="font-size: 30px; font-family: 'Georgia', serif;">Proceeding to the Passenger class aspect Analysis</section>
    <section>
      <div class = "button-container_1">
        <button class = "aesthetic-button" on:click={toggleVisualization_pclass}>Switch Visualization</button>
        <!-- <button on:click={toggleVisualization}>Go to age report</button> -->
      </div>
      <p></p>
      <div class="legend">
        <div class="legend-item">
            <span class="dot dot-blue"></span> Blue Dot - [Class-1 passenger]
        </div>
        <div class="legend-item">
            <span class="dot dot-red"></span> Red Dot - [Class-2 passenger]
        </div>
        <div class="legend-item">
          <span class="dot dot-green"></span> Green Dot - [Class-3 passenger]
        </div>
        {#if showCausaltyLegend_pclass}
          <div class="legend-item">
              <span class="dot dot-lightblue"></span> Light Blue Dot - [Class-1 passenger dead]
          </div>
          <div class="legend-item">
              <span class="dot dot-lightred"></span> Light Red Dot - [Class-2 passenger dead]
          </div>
          <div class="legend-item">
            <span class="dot dot-lightgreen"></span> Green Dot - [Class-3 passenger dead]
        </div>
        {/if}
      </div>
      <p></p>
      <div class="visualization-container">
        <div transition:fade>
          <Pclass_1Page {index} {pclassVisualization} />
        </div>
        <div transition:fade>
          <Pclass_Survival {index} {pclassVisualization} />   
        </div>
        <!-- <div>
          <Pclass_1Page {index} {currentVisuallization_pclass} />
        </div> -->
      </div>
    </section>
    <section style="font-size: 30px; font-family: 'Georgia', serif;">Proceeding to the Fare Amount aspect Analysis</section>
    <section>
      <div class = "button-container_3">
        <button class = "aesthetic-button" on:click={toggleVisualization_fare}>Switch Visualization</button>
        <div class="legend">
          <div class="legend-item">
            <span class="dot dot-blue"></span> Blue Dot - [less than 30]
        </div>
        <div class="legend-item">
            <span class="dot dot-red"></span> Red Dot - [30 to 100]
        </div>
        <div class="legend-item">
          <span class="dot dot-green"></span> Green Dot - [greater than 100]
        </div>
          {#if showCasualtyLegend_fare}
          <div class="legend-item">
            <span class="dot dot-lightblue"></span> Light Blue Dot - [less than 30 dead]
          </div>
          <div class="legend-item">
              <span class="dot dot-lightred"></span> Light Red Dot - [30 yrs to 100 dead]
          </div>
          <div class="legend-item">
            <span class="dot dot-lightgreen"></span> Green Dot - [greater than 100 dead]
        </div>
          {/if}
        </div>
        <div class="visualization-container">
          <div transition:fade>
            <FareAmountPointsPage {index} {fareVisualization} />
          </div>
          <div transition:fade>
            <FareAmountPointsAlivePage {index} {fareVisualization} />   
          </div>

      </div>
    </section>
    <section style="font-size: 30px; font-family: 'Georgia', serif;">Proceeding to the Gender aspect Analysis</section>
    <section>
      <div class = "button-container">
        <button class="aesthetic-button" on:click={toggleVisualization_gender}>Switch Visualization</button>
        <p></p>
      </div>
      <p></p>
      <div class="legend">
        <div class="legend-item">
            <span class="dot dot-blue"></span> Blue Dot - [Male]
        </div>
        <div class="legend-item">
            <span class="dot dot-red"></span> Red Dot - [Female]
        </div>
        {#if showCasualtyLegend_gender}
          <div class="legend-item">
              <span class="dot dot-lightblue"></span> Light Blue Dot - [Male dead]
          </div>
          <div class="legend-item">
              <span class="dot dot-lightred"></span> Light Red Dot - [Female dead]
          </div>
        {/if}
      </div>
      
      <div class="visualization-container">
        <div transition:fade>
          <GenderPointsPage {index} {currentVisualization} />
        </div>
        <div transition:fade>
          <GenderPointsAlive {index} {currentVisualization} />   
        </div>
        <!-- <div>
          <Pclass_1Page {index} {currentVisuallization_pclass} />
        </div> -->
      </div>
    </section>
    <section style="font-size: 30px; font-family: 'Georgia', serif;">Proceeding to the Age aspect Analysis</section>
    <section>
      <div class = "button-container_2">
        <button class = "aesthetic-button" on:click={toggleVisualization_age}>Switch Visualization</button>
        <!-- <button on:click={toggleVisualization}>Go to age report</button> -->
      </div>
      <div class="legend">
        <div class="legend-item">
            <span class="dot dot-blue"></span> Blue Dot - [less than 15 yrs]
        </div>
        <div class="legend-item">
            <span class="dot dot-red"></span> Red Dot - [15 yrs to 40 yrs]
        </div>
        <div class="legend-item">
          <span class="dot dot-green"></span> Green Dot - [greater tahn 40 yrs]
        </div>
        {#if showCasultyLegend_age}
        <div class="legend-item">
          <span class="dot dot-lightblue"></span> Light Blue Dot - [less than 15 yrs dead]
      </div>
      <div class="legend-item">
          <span class="dot dot-lightred"></span> Light Red Dot - [15 yrs to 40 yrs dead]
      </div>
      <div class="legend-item">
        <span class="dot dot-lightgreen"></span> Green Dot - [greater than 40 yrs dead]
    </div>
        {/if}
      </div>
      <div class="visualization-container">
        <div transition:fade>
          <AgePoints {index} {ageVisualization} />
        </div>
        <div transition:fade>
          <AgePointsAlive {index} {ageVisualization} />   
        </div>
        <!-- <div>
          <Pclass_1Page {index} {currentVisuallization_pclass} />
        </div> -->
      </div>
    </section>
    
  </div>

</Scroller>