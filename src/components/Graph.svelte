<script>
  import { fly, draw } from "svelte/transition";
  import { tweened } from "svelte/motion";
  import { cubicOut, cubicInOut } from "svelte/easing";
  import { cities } from "../data/cities";
  import { points } from "../data/points"


  export let index, width, height, projection;

  const tweenOptions = {
    delay: 0,
    duration: 1000,
    easing: cubicOut,
  };

  cities.features.forEach((city) => {
    console.log(city.properties.city + ': ' + city.geometry.coordinates);
  });

  const tweenedX = tweened(
    cities.features.map((city) => projection(city.geometry.coordinates)[0]),
    tweenOptions
  );

  const tweenedY = tweened(
    cities.features.map((city) => projection(city.geometry.coordinates)[1]),
    tweenOptions
  );

  const tweenedX_point = tweened(
    points.features.map((point) => projection(point.geometry.coordinates)[0]),
    tweenOptions
  );

  const tweenedY_point = tweened(
    points.features.map((point) => projection(point.geometry.coordinates)[1]),
    tweenOptions
  );

  $: tweenedData = cities.features.map((city, i) => ({
    x: $tweenedX[i],
    y: $tweenedY[i],
    properties: city.properties,
  })
);

$: tweenedData_point = points.features.map((point, i) => ({
    x: $tweenedX_point[i],
    y: $tweenedY_point[i],
    properties: point.properties,
  })
);

  $: {
    // if (index === 1) {
    //   tweenedX.set(cities.features.map((city) => width / 2));
    //   tweenedY.set(cities.features.map((city, i) => height / 2 + i * 20));
    // }

    // if ( index === 1) {
    //   tweenedX.set(
    //     cities.features.map((city) => projection(city.geometry.coordinates)[0])
    //   );
    //   tweenedY.set(
    //     cities.features.map((city) => projection(city.geometry.coordinates)[1])
    //   );
    //   tweenedX_point.set(
    //     points.features.map((point) => projection(point.geometry.coordinates)[0])
    //   );
    //   tweenedY_point.set(
    //     points.features.map((point) => projection(point.geometry.coordinates)[1])
    //   );
    // }

    // if ( index > 1 || index < 1) {
    //   tweenedX.set(
    //     cities.features.map((city) => 0),
    //   );
    //   tweenedY.set(
    //     cities.features.map((city) => 0),
    //   );
    //   tweenedX_point.set(
    //     points.features.map((point) => 0)
    //   );
    //   tweenedY_point.set(
    //     points.features.map((point) => 0)
    //   );
    // }


  }


</script>

<svg class="graph">
    {#each tweenedData as city, i}
      {#if city.x && city.y}
        <text
          x={city.x}
          y={city.y}
          id={city.properties.name}
          in:fly={{ x: -300, duration: 200 * i }}
          out:fly={{ x: -300, duration: 200 * i }}
          >{city.properties.city}
        </text>
      {/if}
    {/each}
    {#each tweenedData_point as point, i}
      {#if point.x && point.y}
        <circle
        cx={point.x}
        cy={point.y }
        r="3" 
        fill="black"
      />
      {/if}
    {/each}
</svg>

<style>
    .graph {
      width: 100%;
      height: 100vh; /* check problem when setting width */
      position: absolute;
      outline: none;
    }
  </style>