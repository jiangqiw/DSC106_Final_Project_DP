<script>
  import mapboxgl from "mapbox-gl";
  import { onMount } from "svelte";
  export let index;
  export let geoJsonToFit;

  mapboxgl.accessToken =
    "pk.eyJ1IjoieXVoZXRpYW4iLCJhIjoiY2xzaTNodTd5MjJtMjJrbzBtMzI3dTVmbCJ9.vOpitaAAgbbzvPfngV4_Ug";

  let container;
  let map;

  let zoomLevel;
  let pathIndex = 0;
  const path = [
    [-2.5, 50], // Southampton
    [-2, 49.0], // Cherbourg
    [-9.5, 50.7], // Queenstown (Cobh)
    [-39.10, 44.5]  // Example Sunk point, adjust as necessary
  ];
  let cities = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -2.50, 52.3
        ]
      },
      "properties": {
        "city": "Southampton"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -1.52, 50.0
        ]
      },
      "properties": {
        "city": "Cherbourg"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -8.2943, 53.5
        ]
      },
      "properties": {
        "city": "Queenstown"
      }
    },
    {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [
          -55, 38.7128
      ]
    },
    "properties": {
      "city": "<-- New York"
    }
  },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -39, 45.5
        ]
      },
      "properties": {
        "city": "Sunk Point"
      }
    }
  ]
}

  function updateZoomLevel() {
    const screenWidth = window.innerWidth;
    zoomLevel = screenWidth <= 600 ? 4 : 4; // Adjust these values as needed
  }

  function handleResize() {
    updateZoomLevel();
    map.setZoom(zoomLevel);
  }


  function animateDot() {
  if (pathIndex >= path.length) {
    pathIndex = 0; // Reset or stop the animation based on your preference
    startAnimation();
    return;
  }
  
  const coordinates = path[pathIndex];
  map.getSource('moving-dot').setData({
    type: 'Point',
    coordinates
  });
  // console.log(coordinates);

  // Check if the current index is the last point in the path
  if (pathIndex === path.length - 1) {
    // Switch to the second image for the last point
    map.setLayoutProperty('dot', 'icon-image', 'custom-dot-final');
  } else {
    // Ensure the original image is used for other points
    map.setLayoutProperty('dot', 'icon-image', 'custom-dot');
  }

  pathIndex++;
  setTimeout(animateDot, 1000); // Adjust timing as needed
}

  function startAnimation() {
    pathIndex = 0; // Reset path index to start from Southampton
    if (map && map.isStyleLoaded()) {
      // Ensure the map and style are fully loaded before attempting to set data
      map.getSource('moving-dot').setData({
        type: 'Point',
        coordinates: path[0] // Southampton coordinates
      });
      animateDot(); // Restart the animation
    }
  }

  onMount(() => {
    updateZoomLevel();
    map = new mapboxgl.Map({
      container,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [-25, 50],
      zoom: zoomLevel,
      attributionControl: true, // removes attribution from the bottom of the map
    });

    window.addEventListener("resize", handleResize);

    function hideLabelLayers() {
      const labelLayerIds = map
        .getStyle()
        .layers.filter(
          (layer) =>
            layer.type === "symbol" && /label|text|place/.test(layer.id)
        )
        .map((layer) => layer.id);

      for (const layerId of labelLayerIds) {
        map.setLayoutProperty(layerId, "visibility", "none");
      }
    }

    map.on("load", () => {
      hideLabelLayers();
      updateBounds();
      map.on("zoom", updateBounds);
      map.on("drag", updateBounds);
      map.on("move", updateBounds);
      
      // Load a local image to use as the moving dot
      map.loadImage('good_ship.jpg', (error, image) => {
        if (error) throw error;
        
        // Add the image to the map style
        map.addImage('custom-dot', image);
        
        // Now add the source for the moving dot
        map.addSource('moving-dot', {
          type: 'geojson',
          data: {
            type: 'Point',
            coordinates: path[0] // Start at the first point
          }
        });
        // map.addSource('cities', {
        //   type: 'geojson',
        //   data: cities
        // });

        map.addLayer({
          id: 'city-points',
          type: 'symbol',
          source: 'cities',
          layout: {
            'icon-image': 'marker-15', // Use an appropriate marker icon
            'icon-size': 1.5, // Adjust icon size
            'text-field': '{city}', // Use the city property as label
            'text-offset': [0, 1.5], // Offset text to be above the icon
            'text-anchor': 'top'
          }
        });
      
      map.loadImage('bad_ship.jpg', (error, image) => {
        if (error) throw error;
        map.addImage('custom-dot-final', image);
      });
        
        // Replace the circle layer with a symbol layer that uses the loaded image
        map.addLayer({
          id: 'dot',
          source: 'moving-dot',
          type: 'symbol',
          layout: {
            'icon-image': 'custom-dot',
            // These properties scale the image and adjust its position
            'icon-size': 0.1, // Adjust based on your image size and preference
            'icon-anchor': 'bottom' // Adjust if necessary to position the image correctly
          }
        });
        
        animateDot();
      });
  });
});
  
  function updateBounds() {
    const bounds = map.getBounds();
    geoJsonToFit.features[0].geometry.coordinates = [
           bounds._ne.lng,
           bounds._ne.lat,
          ];
    geoJsonToFit.features[1].geometry.coordinates = [
           bounds._sw.lng,
           bounds._sw.lat,
     ];
   }
  let isVisible = false;
  $: if (index === 0) {
    isVisible = true;
    startAnimation();
  } else {
    isVisible = false;
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://api.mapbox.com/mapbox-gl-js/v2.14.0/mapbox-gl.css"
  />
</svelte:head>

<div class="map" class:visible={isVisible} bind:this={container} />

<style>
  
  .map {
    width: 100%;
    height: 100vh; /* check problem when setting width */
    position: absolute;
    opacity: 0;
    visibility: hidden;
    transition: opacity 2s, visibility 2s;
    outline: blue solid 3px;
  }

  .map.visible {
    opacity: 1;
    visibility: visible;
  }
</style>