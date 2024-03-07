<script>
    import { onMount } from 'svelte';
    export let index;
    export let ageVisualization;

    let points = [];
    const spacing = 12;
    let radius = 4;
    const pointsPerSideX = 50;
    let totalGeneratedPoints = 323; // Adjust based on visualization

    // Reactive statement to regenerate points when currentVisualization changes
    $: {
        if (ageVisualization === 'casualty') {
            generatePoints();
        }
    }

    function generatePoints() {
        // Reset points array
        points = [];
        
        // Adjust total points based on the current visualization
        totalGeneratedPoints = 1309 + 62 + 64;

        for (let i = 0; i < totalGeneratedPoints; i++) {
            const x = i % pointsPerSideX;
            const y = Math.floor(i / pointsPerSideX);
            points.push({
                x: x * spacing + radius,
                y: y * spacing + radius,
                isTransparent: (i > 888 && i < 888 + 62) || (i >= 1024 + 62 && i < 1024 + 62 + 64),
                isBlue: i < 888, // 15-40
                isBlueDead: (i > 275 && i < 889),
                isRed: i >= 888 + 62 && i < 1024 + 62 + 64, // pclass1
                isRedDead: (i > 888 + 62 + 61 && i < 1024 + 62),
                isGreen: i >= 1024 + 62 + 64, // pclass2
                isGreenDead: (i >= 1024 + 62 + 64 + 90),
                // Increment delay for each point, adjusting the multiplier as needed
                // animationDelay: i * 5 // Adjust this value for the desired effect
            });
        }
    }

    let isVisible = false;
    // $: isVisible = index === 5 && (currentVisuallization_pclass === 'class1');
    $: isVisible = index === 8 && (ageVisualization === 'casualty');
</script>


<div class="graph-container">
<svg class="graph" width="100vw" height="100vh" class:visible={isVisible}>
    {#if index === 8}
        {#each points as point, i}
        <circle cx={point.x} cy={point.y} r="4" 
            class:point={point.isGreen}
            class:point_transparent={point.isTransparent}
            class:point_blue={point.isBlue} 
            class:point_blue_dead={point.isBlueDead}
            class:point_red={point.isRed}
            class:point_red_dead={point.isRedDead}
            class:point_green_dead={point.isGreenDead}
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
    .point_blue_dead {
        fill: black;
        animation: turnBlueBlack 1s forwards;
    }
    .point_red_dead {
        fill: black;
        animation: turnRedBlack 1s forwards;
    }
    .point_green_dead {
        fill: black;
        animation: turnGreenBlack 1s forwards;
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
    @keyframes turnBlueBlack {
        to {
            fill: blue;
            opacity:30%;
        }
    }
    @keyframes turnRedBlack {
        to {
            fill: red;
            opacity:30%;
        }
    }

    @keyframes turnGreenBlack {
        to {
            fill: green;
            opacity:30%;
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