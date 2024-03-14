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

  let currentBackground = 'titanic.jpeg'; // Default background image

  function goToSection(targetIndex) {
    if (targetIndex === 1) {
      index = 2;
    } 
    if (targetIndex === 2) {
      index = 4;
    } 
    if (targetIndex === 3) {
      index = 6;
    }
    if (targetIndex === 4) {
      index = 8;
    }
    index = targetIndex; // Update the current index
    // Dynamically generate the section ID based on the targetIndex
    const sectionId = `section-${targetIndex}-bg`;
    // Attempt to find the section element by its ID
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      // Scroll to the sectionElement smoothly
      sectionElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }

  // Update the background image based on the current page index
  $: if (index === 6) { // Assuming pages are 0-indexed, so page 5 has an index of 4
    currentBackground = 'gender.jpg';
  } else if (index === 2){
    currentBackground = 'Pclass.jpg';
  } else if (index === 8){
    currentBackground = 'https://github.com/jiangqiw/DSC106_Final_Project_DP/blob/main/static/Age.jpg';
  } else if (index === 4){
    currentBackground = 'Fare.jpg';
  }
  else {
    currentBackground = '/titanic.jpeg';
  }

  let pieData_1 = [
        { value: 72.7, color: 'blue' },
        { value: 27.3, color: "orange"}
    ];
    let total_1 = pieData_1.reduce((acc, slice) => acc + slice.value, 0);
    let startAngle_1 = 0;
    let pieRadius = 100; // Example radius
    let labelOffset = -35; // Example offset
    let isVisible = true; // This should be controlled based on your conditions

    pieData_1.forEach(slice => {
        let slicePercentage_1 = slice.value / total_1;
        let endAngle_1 = startAngle_1 + slicePercentage_1 * 2 * Math.PI;

        slice.startAngle = startAngle_1;
        slice.endAngle = endAngle_1;
        slice.midAngle = (slice.startAngle + slice.endAngle) / 2;
        startAngle_1 = endAngle_1;

        let adjustedRadius_1 = pieRadius + labelOffset;
        slice.labelX = adjustedRadius_1 * Math.cos(slice.midAngle);
        slice.labelY = adjustedRadius_1 * Math.sin(slice.midAngle);
        slice.label = `${Math.round((slice.value / total_1) * 100)}%`;
    });

    let pieData_2 = [
        { value: 61.9, color: 'blue' },
        {value: 38.1, color: "orange"}
    ];

    let total = pieData_2.reduce((acc, slice) => acc + slice.value, 0);
    let startAngle = 0;

    pieData_2.forEach(slice => {
        let slicePercentage = slice.value / total;
        let endAngle = startAngle + slicePercentage * 2 * Math.PI;
        let adjustedRadius = pieRadius + labelOffset;
        slice.startAngle = startAngle;
        slice.endAngle = endAngle;
        slice.midAngle = (slice.startAngle + slice.endAngle) / 2;
        startAngle = endAngle;
        slice.labelX = adjustedRadius * Math.cos(slice.midAngle);
        slice.labelY = adjustedRadius * Math.sin(slice.midAngle);
        slice.label = `${Math.round((slice.value / total) * 100)}%`;
    });

    let pieData = [
        { value: 56.0, color: 'blue' },
        {value: 44.0, color: "orange"}
    ];

    pieData.forEach(slice => {
        let slicePercentage = slice.value / total;
        let endAngle = startAngle + slicePercentage * 2 * Math.PI;


        let adjustedRadius = pieRadius + labelOffset;

        slice.startAngle = startAngle;
        slice.endAngle = endAngle;
        slice.midAngle = (slice.startAngle + slice.endAngle) / 2;
        startAngle = endAngle;
        slice.labelX = adjustedRadius * Math.cos(slice.midAngle);
        slice.labelY = adjustedRadius * Math.sin(slice.midAngle);
        slice.label = `${Math.round((slice.value / total) * 100)}%`;
    });
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

.dot-orange {
    background-color: orange;
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
.aesthetic-button-goto {
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

.aesthetic-button-goto:hover {
    background-color: #45a049; /* Darker shade of green on hover */
}

.aesthetic-button-goto:focus {
    outline: none; /* Removes outline on focus for aesthetics, ensure accessibility in other ways */
}
.button-container {
  display: flex; /* This will make the container a flex container */
    flex-wrap: nowrap; /* This prevents the buttons from wrapping to the next line */
    justify-content: space-between; /* This spaces out the buttons evenly */
    align-items: center; /* This aligns the buttons vertically */
    gap: 10px; /* Optional: adds some space between the buttons */
}
.button-container-2 {
  display: flex; /* This will make the container a flex container */
    flex-wrap: nowrap; /* This prevents the buttons from wrapping to the next line */
    justify-content: space-between; /* This spaces out the buttons evenly */
    align-items: center; /* This aligns the buttons vertically */
    gap: 0px; /* Optional: adds some space between the buttons */
    margin-left: 200px;
    margin-top: -200px;
}

.graph_1{
      width: 50%;
        height: 100vh;
        margin: -10;
        margin-top: 0px;
        margin-right:-200px;
        margin-left: -500px;
        margin-bottom: 300px;
        position: relative;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.5s, visibility 0.5s;
        justify-content: center;
        align-items: center;
}

.graph_1.visible {
        margin: none;
        opacity: 1;
        visibility: visible;
        padding:0%;
    }

.graph_2{
        width: 50%;
        height: 100vh;
        margin: -10;
        margin-top: 0px;
        margin-right:-200px;
        margin-left: -500px;
        margin-bottom: 300px;
        position: relative;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.5s, visibility 0.5s;
        justify-content: center;
        align-items: center;
}

.graph_2.visible {
        margin: none;
        opacity: 1;
        visibility: visible;
        padding:0%;
}

.graph_3{
        width: 50%;
        height: 100vh;
        margin: -10;
        margin-top: 0px;
        margin-right:-200px;
        margin-left: -500px;
        margin-bottom: 300px;
        position: relative;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.5s, visibility 0.5s;
        justify-content: center;
        align-items: center;
}

.graph_3.visible {
        margin: none;
        opacity: 1;
        visibility: visible;
        padding:0%;
}
.chart-title {
  font-family: 'Arial', sans-serif; /* Choose a font */
  font-size: 15px; /* Choose your size */
  fill: #333; /* Choose your text color */
  font-weight: bold; /* Optional: if you want bold text */
  /* Additional styling */
  margin-top: 100;
  width: 100;
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

<header>Surviving the Titanic: The Role of Class, Fare, Gender, and Age</header>

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
    <section>
      <p style="font-size: 20px; font-family: 'Arial', sans-serif;">Takeaway:</p>
    </section>
    <section style="font-size: 30px; font-family: 'Georgia', serif;">The Maiden Journey of Dreams and Tragedy</section>
    <section id="section-1-bg" style="font-size: 30px; font-family: 'Georgia', serif;">Many would believe that the survival on the Titanic would be highly correlated with the social class and wealth of the passenger. Is that true back in the tragedic sunk in 1912? Let's find out by looking at the survival rate relating to the passenger's class</section>
    <section id="section-1">
      <div class = "button-container">
        <button class = "aesthetic-button" on:click={toggleVisualization_pclass}>Switch Visualization</button>
        <button class="aesthetic-button-goto" on:click={() => goToSection(2)}>Go to Fare</button>
        <button class="aesthetic-button-goto" on:click={() => goToSection(3)}>Go to Gender</button>
        <button class="aesthetic-button-goto" on:click={() => goToSection(4)}>Go to Age</button>
        <!-- <button on:click={toggleVisualization}>Go to age report</button> -->
      </div>
      <p></p>
      <div class="legend">
        <div class="legend-item">
            <span class="dot dot-blue"></span> Blue - [Class-1 passenger]
        </div>
        <div class="legend-item">
            <span class="dot dot-red"></span> Red - [Class-2 passenger]
        </div>
        <div class="legend-item">
          <span class="dot dot-green"></span> Green - [Class-3 passenger]
        </div>
        {#if showCausaltyLegend_pclass}
          <div class="legend-item">
              <span class="dot dot-lightblue"></span> Light Blue - [Class-1 passenger dead]
          </div>
          <div class="legend-item">
              <span class="dot dot-lightred"></span> Light Red - [Class-2 passenger dead]
          </div>
          <div class="legend-item">
            <span class="dot dot-lightgreen"></span> Light Green - [Class-3 passenger dead]
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
    <section id="section-2-bg" style="font-size: 30px; font-family: 'Georgia', serif;">Clearly, with higher passenger's class, the chance of survival steady increase, which could be related to the the fact that the first class passengers are usually accomondate in the upper room. Fare, on the other hand, as feature that is highly related to passenger's class, should also have similar impact on the sruvival rate. Let's see!</section>
    <section id="section-2">
      <div class = "button-container">
        <button class = "aesthetic-button" on:click={toggleVisualization_fare}>Switch Visualization</button>
        <button class="aesthetic-button-goto" on:click={() => goToSection(1)}>Go to Passenger Class</button>
        <button class="aesthetic-button-goto" on:click={() => goToSection(3)}>Go to Gender</button>
        <button class="aesthetic-button-goto" on:click={() => goToSection(4)}>Go to Age</button>
      </div>
        <div class="legend">
          <div class="legend-item">
            <span class="dot dot-blue"></span> Blue - [less than 30]
        </div>
        <div class="legend-item">
            <span class="dot dot-red"></span> Red - [30 to 100]
        </div>
        <div class="legend-item">
          <span class="dot dot-green"></span> Green - [greater than 100]
        </div>
          {#if showCasualtyLegend_fare}
          <div class="legend-item">
            <span class="dot dot-lightblue"></span> Light Blue - [less than 30 dead]
          </div>
          <div class="legend-item">
              <span class="dot dot-lightred"></span> Light Red - [30 yrs to 100 dead]
          </div>
          <div class="legend-item">
            <span class="dot dot-lightgreen"></span> Light Green - [greater than 100 dead]
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
    <section id="section-3-bg" style="font-size: 30px; font-family: 'Georgia', serif;">Despite features relating to the wealth and status, are there any feature that could impact the chance of survival? We first make a intuitive assumption that male and young adults, with greater strength, should have greater chance of survival. Let's test our assumptions!</section>
    <section id="section-3">
      <div class = "button-container">
        <button class="aesthetic-button" on:click={toggleVisualization_gender}>Switch Visualization</button>
        <button class="aesthetic-button-goto" on:click={() => goToSection(1)}>Go to Passenger Class</button>
        <button class="aesthetic-button-goto" on:click={() => goToSection(2)}>Go to Fare</button>
        <button class="aesthetic-button-goto" on:click={() => goToSection(4)}>Go to Age</button>

        <p></p>
      </div>
      <p></p>
      <div class="legend">
        <div class="legend-item">
            <span class="dot dot-blue"></span> Blue - [Male]
        </div>
        <div class="legend-item">
            <span class="dot dot-red"></span> Red - [Female]
        </div>
        {#if showCasualtyLegend_gender}
          <div class="legend-item">
              <span class="dot dot-lightblue"></span> Light Blue - [Male dead]
          </div>
          <div class="legend-item">
              <span class="dot dot-lightred"></span> Light Red - [Female dead]
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
    <section id="section-4-bg" style="font-size: 30px; font-family: 'Georgia', serif; color: black; opacity: 1">Surprisingly, female actually have much higher survival rate! We will then divide passengers into different age groups and find out the association between age and survival rate.</section>
    <section id="section-4">
      <div class = "button-container">
        <button class = "aesthetic-button" on:click={toggleVisualization_age}>Switch Visualization</button>
        <button class="aesthetic-button-goto" on:click={() => goToSection(1)}>Go to Passenger Class</button>
        <button class="aesthetic-button-goto" on:click={() => goToSection(2)}>Go to Fare</button>
        <button class="aesthetic-button-goto" on:click={() => goToSection(3)}>Go to Gender</button>
        <!-- <button on:click={toggleVisualization}>Go to age report</button> -->
      </div>
      <div class="legend">
        <div class="legend-item">
            <span class="dot dot-blue"></span> Blue - [less than 15 yrs]
        </div>
        <div class="legend-item">
            <span class="dot dot-red"></span> Red - [15 yrs to 40 yrs]
        </div>
        <div class="legend-item">
          <span class="dot dot-green"></span> Green - [greater than 40 yrs]
        </div>
        {#if showCasultyLegend_age}
        <div class="legend-item">
          <span class="dot dot-lightblue"></span> Light Blue - [less than 15 yrs dead]
      </div>
      <div class="legend-item">
          <span class="dot dot-lightred"></span> Light Red - [15 yrs to 40 yrs dead]
      </div>
      <div class="legend-item">
        <span class="dot dot-lightgreen"></span> Light Green - [greater than 40 yrs dead]
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
    
    <section>
      <p style="font-size: 20px; font-family: 'Arial', sans-serif;">Takeaway:</p>
      <div class = "legend">
        <div class="legend-item">
          <span class="dot dot-blue"></span> Blue - [Survived]
        </div>
        <div class="legend-item">
          <span class="dot dot-orange"></span> Orange - [Dead]
        </div>
      </div>
      <div class="button-container-2">
      <svg class="graph_2" width="200" height="200" viewBox="-100 -100 200 200" class:visible={isVisible}>
        <text x="0" y="-120" text-anchor="middle" class="chart-title">Women Survival Rates</text>
        {#each pieData_1 as slice}
        <path d="M 0 0 L {pieRadius * Math.cos(slice.startAngle)} {pieRadius * Math.sin(slice.startAngle)}
                    A {pieRadius} {pieRadius} 0 {(slice.endAngle - slice.startAngle > Math.PI) ? 1 : 0} 1
                    {pieRadius * Math.cos(slice.endAngle)} {pieRadius * Math.sin(slice.endAngle)} Z"
                fill="{slice.color}"
                fill-opacity="{slice.opacity}"
                />
        <text x={slice.labelX} y={slice.labelY} text-anchor="middle" fill="white" dy=".3em">
                    {slice.label}
        </text>
        {/each}
    </svg>

    <svg class="graph_1" width="200" height="200" viewBox="-100 -100 200 200" class:visible={isVisible}>
      <text x="0" y="-120" text-anchor="middle" class="chart-title">1st class Survival Rate</text>
      {#each pieData_2 as slice}
      <path d="M 0 0 L {pieRadius * Math.cos(slice.startAngle)} {pieRadius * Math.sin(slice.startAngle)}
                  A {pieRadius} {pieRadius} 0 {(slice.endAngle - slice.startAngle > Math.PI) ? 1 : 0} 1
                  {pieRadius * Math.cos(slice.endAngle)} {pieRadius * Math.sin(slice.endAngle)} Z"
              fill="{slice.color}"
              fill-opacity="{slice.opacity}"
              />
      <text x={slice.labelX} y={slice.labelY} text-anchor="middle" fill="white" dy=".3em">
                  {slice.label}
      </text>
      {/each}
  </svg>

  <svg class="graph_3" width="200" height="200" viewBox="-100 -100 200 200" class:visible={isVisible}>
    <text x="0" y="-120" text-anchor="middle" class="chart-title"> Under Age 15 Survival Rate</text>
    {#each pieData as slice}
    <path d="M 0 0 L {pieRadius * Math.cos(slice.startAngle)} {pieRadius * Math.sin(slice.startAngle)}
                A {pieRadius} {pieRadius} 0 {(slice.endAngle - slice.startAngle > Math.PI) ? 1 : 0} 1
                {pieRadius * Math.cos(slice.endAngle)} {pieRadius * Math.sin(slice.endAngle)} Z"
            fill="{slice.color}"
            fill-opacity="{slice.opacity}"
            />
    <text x={slice.labelX} y={slice.labelY} text-anchor="middle" fill="white" dy=".3em">
                {slice.label}
    </text>
    {/each}
  </svg>
  </div>
  </section>
  
    
  </div>

</Scroller>
