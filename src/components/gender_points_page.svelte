<script>
    import { onMount } from 'svelte';
    export let index;
    export let currentVisualization;

    let points = [];
    const spacing = 12;
    let radius = 4;

    onMount(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const pointsPerSideX = 50;
        const pointsPerSideY = 40;
        const totalGeneratedPoints = 1309 + 107;

        // Assuming a fixed number of points for simplicity
        for (let i = 0; i < totalGeneratedPoints; i++) {
            const x = i % pointsPerSideX;
            const y = Math.floor(i / pointsPerSideX);
            points.push({
                x: x * spacing + radius,
                y: y * spacing + radius,
                isTransparent: i > 842 && i < 842 + 107,
                isBlue: i < 843, // male
                isRed: i > 842, // female
                // Increment delay for each point, adjusting the multiplier as needed
                animationDelay: i * 5 // Adjust this value for the desired effect
            });
        }
    });

    let isVisible = false;
    $: isVisible = index === 4 && currentVisualization === 'gender';
</script>

<div class="graph-container">
<svg class="graph" width="100vw" height="100vh" class:visible={isVisible}>
    {#if index === 4}
        {#each points as point, i}
        <circle cx={point.x} cy={point.y} r="4" 
            class:point_transparent={point.isTransparent}
            class:point={point.isBlue} 
            class:point_red={point.isRed}
            style="animation-delay: {point.animationDelay}ms;" 
            fill="black" />
        {/each}
    {/if}
</svg>
</div>

<style>
    /* Apply the animation only to points that should be green */
    .point {
        fill: black; /* Default color */
        animation: turnBlue 1s forwards; /* Adjust timing as needed */
    }
    .point_red {
        fill: black; /* Default color */
        animation: turnRed 1s forwards; /* Adjust timing as needed */
    }
    .point_transparent {
        fill: black;
        animation: turnTransparent 1s forwards;
    }

    /* Keyframes to animate the fill color */
    @keyframes turnGreen {
        to {
            fill: green;
        }
    }

    @keyframes turnBlue {
        to {
            fill: blue;
        }
    }
    @keyframes turnRed {
        to {
            fill: red;
        }
    }
    @keyframes turnTransparent {
        to {
            fill: red;
            opacity:0;
        }
    }


    .graph{
        width: 100%;
        height: 100vh;
        margin: auto;
        margin-top: 150px;
        position: center;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.5s, visibility 0.5s;
        justify-content: center;
        align-items: center;
    }

    /* Other styles remain unchanged */
    .graph.visible {
        margin: none;
        opacity: 1;
        visibility: visible;
        padding:0%;
    }

    .graph-container {
  width: 100%;
  height: 400px; /* Example height, adjust based on your design */
  /* Other styles as needed */
}
</style>




  