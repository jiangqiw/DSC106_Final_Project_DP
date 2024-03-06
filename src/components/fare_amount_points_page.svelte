<script>
    import { onMount } from 'svelte';
    export let index;
    export let fareVisualization;

    let points = [];
    const spacing = 12;
    let radius = 4;
    const pointsPerSideX = 50;
    let totalGeneratedPoints = 323; // Adjust based on visualization

    // Reactive statement to regenerate points when currentVisualization changes
    $: {
        if (fareVisualization === 'fare') {
            generatePoints();
        }
    }

    function generatePoints() {
        // Reset points array
        points = [];
        
        // Adjust total points based on the current visualization
        totalGeneratedPoints = 1309 + 62 + 64 + 30 + 12 + 8;

        for (let i = 0; i < totalGeneratedPoints; i++) {
            const x = i % pointsPerSideX;
            const y = Math.floor(i / pointsPerSideX);
            points.push({
                x: x * spacing + radius,
                y: y * spacing + radius,
                isTransparent: (i > 958 && i < 958 + 62 + 30) || (i >= 958+62+266 && i < 958 + 62 + 266 + 62 + 64 - 12),
                isBlue: i < 959, // <30
                isRed: i >= 958 + 62 + 30 && i < 958+62+266, // 30-100
                isGreen: i >= 958+62+266+62+64-20, // >100
                // Increment delay for each point, adjusting the multiplier as needed
                animationDelay: i * 5 // Adjust this value for the desired effect
            });
        }
    }

    let isVisible = false;
    // $: isVisible = index === 5 && (currentVisuallization_pclass === 'class1');
    $: isVisible = index === 10 && (fareVisualization === 'fare');
</script>


<div class="graph-container">
<svg class="graph" width="100vw" height="100vh" class:visible={isVisible}>
    {#if index === 10}
        {#each points as point, i}
        <circle cx={point.x} cy={point.y} r="4" 
            class:point={point.isGreen}
            class:point_transparent={point.isTransparent}
            class:point_blue={point.isBlue} 
            class:point_red={point.isRed}
            style="animation-delay: {point.animationDelay}ms; opacity: {point.isTransparent ? '0' : '1'};" 
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
    .point_red {
        fill: black; /* Default color */
        animation: turnRed 1s forwards; /* Adjust timing as needed */
    }
    .point_transparent {
        fill: black;
        animation: turnTransparent 1s forwards;
    }
    .point_blue {
        fill: black;
        animation: turnBlue 1s forwards;
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
        position: absolute;
        top: 0; /* Adjust this value to move the graph up or down */
        left: 0; /* Adjust as needed */
        width: 100%; /* Ensure it spans the width of its parent */
    }
</style>