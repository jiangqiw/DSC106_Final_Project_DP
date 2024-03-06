<script>
    import { onMount } from 'svelte';
    export let index;
    export let currentVisuallization_pclass;

    let points = [];
    const spacing = 12;
    let radius = 4;
    const pointsPerSideX = 50;
    let totalGeneratedPoints = 323; // Adjust based on visualization

    // Reactive statement to regenerate points when currentVisualization changes
    $: {
        if (currentVisuallization_pclass === 'class1') {
            generatePoints();
        }
    }

    function generatePoints() {
        // Reset points array
        points = [];
        
        // Adjust total points based on the current visualization
        totalGeneratedPoints = 323;

        for (let i = 0; i < totalGeneratedPoints; i++) {
            const x = i % pointsPerSideX;
            const y = Math.floor(i / pointsPerSideX);
            const isGreen =  i < 200 ;
            points.push({ x: x * spacing + radius, y: y * spacing + radius, isGreen, animationDelay: i * 5 });
        }
    }

    let isVisible = false;
    $: isVisible = index === 4 && (currentVisuallization_pclass === 'class1');
</script>


<div class="graph-container">
<svg class="graph" width="100vw" height="100vh" class:visible={isVisible}>
    {#if index === 4}
        {#each points as point, i}
        <circle cx={point.x} cy={point.y} r="4" 
            class:point={point.isGreen} 
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
        animation: turnGreen 0.5s forwards; /* Adjust timing as needed */
    }

    /* Keyframes to animate the fill color */
    @keyframes turnGreen {
        to {
            fill: green;
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
        position: absolute;
        top: 0; /* Adjust this value to move the graph up or down */
        left: 0; /* Adjust as needed */
        width: 100%; /* Ensure it spans the width of its parent */
    }
</style>