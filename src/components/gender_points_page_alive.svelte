<script>
    import { onMount } from 'svelte';
    export let index;
    export let currentVisualization_gender;

    let points = [];
    const spacing = 12;
    let radius = 5;

    onMount(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const pointsPerSideX = 50;
        const pointsPerSideY = 40;
        const totalGeneratedPoints = 1309 + 108;

        // Assuming a fixed number of points for simplicity
        for (let i = 0; i < totalGeneratedPoints; i++) {
            const x = i % pointsPerSideX;
            const y = Math.floor(i / pointsPerSideX);
            points.push({
                x: x * spacing + radius,
                y: y * spacing + radius,
                isTransparent: i > 842 && i < 842 + 108,
                isBlue: i < 162, // male
                isBlueDead: (i < 843 && i > 161),
                isRed: (i > 841+108 && i < 1183+108), // female
                isRedDead: i > 1182 + 108,
                // Increment delay for each point, adjusting the multiplier as needed
                animationDelay: i * 5 // Adjust this value for the desired effect
            });
        }
    });

    let isVisible = false;
    $: isVisible = index === 4 && currentVisualization_gender === 'casualty';
</script>

<div class="graph-container">
<svg class="graph" width="100vw" height="100vh" class:visible={isVisible}>
    {#if index === 4}
        {#each points as point, i}
        <circle cx={point.x} cy={point.y} r="4"
            class:point_transparent={point.isTransparent}
            class:point={point.isBlue} 
            class:point_red={point.isRed}
            class:point_blue_dead={point.isBlueDead}
            class:point_red_dead={point.isRedDead}
            style="animation-delay: {point.animationDelay}ms; {point.isTransparent ? 'opacity: 0;' : ''}"  
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
    .point_blue_dead {
        fill: black;
        animation: turnBlueBlack 1s forwards;
    }
    .point_red_dead {
        fill: black;
        animation: turnRedBlack 1s forwards;
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


