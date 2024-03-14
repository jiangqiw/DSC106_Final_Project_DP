<script>
    import { onMount } from 'svelte';
    export let index;
    export let fareVisualization;

    let points = [];
    const spacing = 12;
    let radius = 4;
    const pointsPerSideX = 30;
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
                isTransparent: (i > 958 && i < 958 + 62 + 30) || (i >= 958+62+266 && i < 958 + 62 + 266 + 62 + 64 - 12 - 20),
                isBlue: i < 959, // <30
                isRed: i >= 958 + 62 + 30 && i < 958+62+266, // 30-100
                isGreen: i >= 958+62+266+62+64-20 -20, // >100
                // Increment delay for each point, adjusting the multiplier as needed
                animationDelay: i * 1 // Adjust this value for the desired effect
            });
        }
    }

    let isVisible = false;
    // $: isVisible = index === 5 && (currentVisuallization_pclass === 'class1');
    $: isVisible = index === 5 && (fareVisualization === 'fare');

    let pieData = [
        { value: 68.9, color: 'blue' },
        { value: 20.3, color: 'red' },
        {value: 6.5, color: 'green'}
    ];

    const pieRadius = 100;
    let total = pieData.reduce((acc, slice) => acc + slice.value, 0);
    let startAngle = 0;
    const labelOffset = -35; 

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


<div class="visualization-container" class:visible={isVisible}>
    {#if index === 5}
        <svg class="graph" width="100vw" height="100vh" class:visible={isVisible}>
                {#each points as point, i}
                <circle cx={point.x} cy={point.y} r="4" 
                    class:point={point.isGreen}
                    class:point_transparent={point.isTransparent}
                    class:point_blue={point.isBlue} 
                    class:point_red={point.isRed}
                    style="animation-delay: {point.animationDelay}ms; opacity: {point.isTransparent ? '0' : '1'};" 
                    fill="black" />
                {/each}
        </svg>
        <svg class="graph_1" width="25%" height="200" viewBox="-100 -100 200 200" class:visible={isVisible}>
            {#each pieData as slice}
            <path d="M 0 0 L {pieRadius * Math.cos(slice.startAngle)} {pieRadius * Math.sin(slice.startAngle)}
                        A {pieRadius} {pieRadius} 0 {(slice.endAngle - slice.startAngle > Math.PI) ? 1 : 0} 1
                        {pieRadius * Math.cos(slice.endAngle)} {pieRadius * Math.sin(slice.endAngle)} Z"
                    fill="{slice.color}"/>
            <text x={slice.labelX} y={slice.labelY} text-anchor="middle" fill="white" dy=".3em">
                        {slice.label}
            </text>
            {/each}
        </svg>
{/if}
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
        margin-top: 0px;
        position: center;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.5s, visibility 0.5s;
        justify-content: center;
        align-items: center;
    }
    .graph_1{
        width: 90%;
        height: 50vh;
        margin-top: 230px;
        margin-right:-300px;
        margin-left: 50px;
        margin-bottom: 500px;
        position: relative;
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
    .graph_1.visible {
        margin: none;
        opacity: 1;
        visibility: visible;
        padding:0%;
    }

    .visualization-container {
        width: 100%;
        height: 100vh; /* Adjust based on your layout */
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .visualization-container.visible {
        display: flex;
        flex-direction: row; /* Ensures side-by-side layout */
        justify-content: space-around; /* Adjusts space between and around items */
        align-items: center; /* Centers items vertically */
        width: 100%;
        height: 100vh;
    }
</style>