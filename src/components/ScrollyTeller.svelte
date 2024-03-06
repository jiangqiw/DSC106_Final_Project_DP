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
  let fareVisualization = 'fare'

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
    } else {
        // In any other case (including when it's 'gender_alive' or any 'pclass' state), switch back to 'gender'
        pclassVisualization = 'class1';
    }
}
  function toggleVisualization_age() {
      // If the current visualization is 'gender', switch to 'gender_alive'
      if (ageVisualization === 'age') {
          ageVisualization = 'casualty';
      } else {
          // In any other case (including when it's 'gender_alive' or any 'pclass' state), switch back to 'gender'
          ageVisualization = 'age';
      }
  }

  function toggleVisualization_fare() {
      // If the current visualization is 'gender', switch to 'gender_alive'
      if (fareVisualization === 'fare') {
          fareVisualization = 'casualty';
      } else {
          // In any other case (including when it's 'gender_alive' or any 'pclass' state), switch back to 'gender'
          fareVisualization = 'fare';
      }
  }


  function toggleVisualization_gender() {
    // If the current visualization is 'gender', switch to 'gender_alive'
    if (currentVisualization === 'gender') {
        currentVisualization = 'casualty';
    } else {
        // In any other case (including when it's 'gender_alive' or any 'pclass' state), switch back to 'gender'
        currentVisualization = 'gender';
    }
}


//   function toggleVisualization_pclass() {
//     if (currentVisuallization_pclass === 'class1') {
//         currentVisuallization_pclass = 'class2';
//     } else if (currentVisuallization_pclass === 'class2') {
//         currentVisuallization_pclass = 'class3';
//     } else {
//         currentVisuallization_pclass = 'class1';
//     }
// }

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
      width: 100%;
      height: 100vh;
      outline: none;
      position: relative; /* This should ensure that z-index is properly applied to children */
    }

    .background::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url('/titanic.jpeg');
      background-size: cover;
      background-position: center;
      opacity: 0.3;
      z-index: -1; /* This should be uncommented to ensure it stays behind the Map component */
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
    background: rgba(168, 168, 169, 0.2) /*  40% opaque */;
    visibility: visible;
  }
  

  section {
    height: 100vh;
    /* background-color: rgba(0, 0, 0, 0.2); 20% opaque */
    background-color: none;
    /* color: white; */
    /* outline: rgb(196, 193, 196) solid 3px; */
    outline: none;
    text-align: center;
    max-width: 1000px; /* adjust at will */
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
    <Map bind:geoJsonToFit {index} />
    <Graph {index} {width} {height} {projection} />
    <!-- <GenderPointsPage {index} /> -->
    <div class="progress-bars">
      <p>total progress:<strong>{index + 1}/{count}</strong></p >
      <progress value={progress || 0} />
    </div>
  </div>

  <div class="foreground" slot="foreground">
    <section>This is the first section.
      <div class="background-info">
        On April 15, 1912, the RMS Titanic, a marvel of early 20th-century engineering, embarked on its maiden voyage from Southampton to New York City. However, this journey was tragically cut short after the ship collided with an iceberg in the North Atlantic. This disaster resulted in the loss of over 1,500 lives, making it one of the deadliest peacetime maritime disasters in history. The Titanic's sinking has since captivated the public imagination, leading to numerous investigations, studies, and narratives that seek to understand the circumstances and decisions that led to such high mortality. Factors such as social class, gender, age, and access to lifeboats have been extensively analyzed to comprehend the disparities in survival rates among the passengers.
      </div>
      <div class="background-info">
        This visualization project aims to delve into the intricate dynamics of survival aboard the Titanic, focusing on how various factors influenced the chances of surviving the disaster. Our research question centers on comparing the survival rates across different demographics and circumstances, including gender, passenger class (Pclass), fare price, availability of lifeboats, and age. By examining these variables, we seek to uncover patterns and insights that can provide a deeper understanding of the social, economic, and logistical elements that played a critical role in determining who survived and who perished in this tragic event. Through this analysis, we aspire to contribute to the ongoing discussion about the Titanic, offering a nuanced perspective on how different factors intersected to affect survival chances on that fateful night.
      <div class="reminder">
        Please Full Screen to Gain Maximized Experience
      </div>
      </section>
    <section>This is the second section.</section>
    <section>This is the third section.</section>
    <section>This is the fourth section.</section>
    <section>
      This is the fifth section.
      <div class = "button-container">
        <button on:click={toggleVisualization_gender}>Click to see casualty</button>
        <!-- <button on:click={toggleVisualization}>Go to age report</button> -->
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
    <section>
      Hi
    </section>
    <section>
      This is the sixth section.
      <div class = "button-container_1">
        <button on:click={toggleVisualization_pclass}>Click to see casualty</button>
        <!-- <button on:click={toggleVisualization}>Go to age report</button> -->
      </div>
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
    <section>
      Hi
    </section>
    <section>
      This is the seventh section.
      <div class = "button-container_2">
        <button on:click={toggleVisualization_age}>Click to see casualty</button>
        <!-- <button on:click={toggleVisualization}>Go to age report</button> -->
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
      Hi
    </section>
    <section>
      This is the eighth section.
      <div class = "button-container_3">
        <button on:click={toggleVisualization_fare}>Click to see casualty</button>
        <div class="visualization-container">
          <div transition:fade>
            <FareAmountPointsPage {index} {fareVisualization} />
          </div>
          <div transition:fade>
            <FareAmountPointsAlivePage {index} {fareVisualization} />   
          </div>

      </div>
    </section>
  </div>

</Scroller>