<script>
    import { onMount } from 'svelte';
    export let index;
    export let currentVisualization;

    let points = [];
    const spacing = 12;
    let radius = 5;

    onMount(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const pointsPerSideX = 30;
        const pointsPerSideY = 40;
        const totalGeneratedPoints = 1309 + 108;

        // Assuming a fixed number of points for simplicity
        for (let i = 0; i < totalGeneratedPoints; i++) {
            const x = i % pointsPerSideX;
            const y = Math.floor(i / pointsPerSideX);
            points.push({
                x: x * spacing + radius,
                y: y * spacing + radius,
                isTransparent: i > 842 && i < 842 + 88,
                isBlue: i < 162, // male
                isBlueDead: (i < 843 && i > 161),
                isRed: (i > 841+88 && i < 1183+108), // female
                isRedDead: i > 1182 + 108,
                // Increment delay for each point, adjusting the multiplier as needed
                // animationDelay: i * 5 // Adjust this value for the desired effect
            });
        }
    });

    let isVisible = false;
    $: isVisible = index === 7 && currentVisualization === 'casualty';

    let pieData = [
        { value: 19.1, color: 'blue' },
        {value: 80.9, color: "blue", opacity: 0.5}
    ];

    let pieData_1 = [
        { value: 72.7, color: 'red' },
        {value: 27.3, color: "red", opacity: 0.5}
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

    let total_1 = pieData_1.reduce((acc, slice) => acc + slice.value, 0);
    let startAngle_1 = 0; // Start angle for pieData_1

    pieData_1.forEach(slice => {
        let slicePercentage_1 = slice.value / total_1;
        let endAngle_1 = startAngle_1 + slicePercentage_1 * 2 * Math.PI;

        slice.startAngle = startAngle_1; // Use correct variable for start angle
        slice.endAngle = endAngle_1; // Use correct variable for end angle
        slice.midAngle = (slice.startAngle + slice.endAngle) / 2; // Correctly calculate midAngle
        startAngle_1 = endAngle_1; // Update startAngle_1 for the next slice

        // Correct label position calculations
        let adjustedRadius_1 = pieRadius + labelOffset;
        slice.labelX = adjustedRadius_1 * Math.cos(slice.midAngle);
        slice.labelY = adjustedRadius_1 * Math.sin(slice.midAngle);
        slice.label = `${Math.round((slice.value / total_1) * 100)}%`; // Use total_1 for percentage
    });

</script>

<div class="graph-container" class:visible={isVisible}>
    {#if index === 7}
        <!-- Point Graph: Adjust the width to allow space for the pie chart -->
        <svg class="graph" width="75%" height="90vh" class:visible={isVisible}>
            {#each points as point, i}
            <circle cx={point.x} cy={point.y} r="4"
                class:point_transparent={point.isTransparent}
                class:point={point.isBlue} 
                class:point_red={point.isRed}
                class:point_blue_dead={point.isBlueDead}
                class:point_red_dead={point.isRedDead}
                style="animation-delay: {point.animationDelay}ms; opacity: {point.isTransparent ? '0' : '1'};" 
                fill="black" />
            {/each}
        </svg>
        
        <!-- Pie Chart: Remove absolute positioning and adjust the width -->
        <svg class="graph_1" width="200" height="200" viewBox="-100 -100 200 200" class:visible={isVisible}>
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

        <svg class="graph_2" width="200" height="200" viewBox="-100 -100 200 200" class:visible={isVisible}>
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
    {/if}

</div>

<style>
    /* Apply the animation only to points that should be green */
    .point {
        fill: black; /* Default color */
        animation: turnBlue 0s forwards; /* Adjust timing as needed */
    }
    .point_red {
        fill: black; /* Default color */
        animation: turnRed 0s forwards; /* Adjust timing as needed */
    }
    .point_blue_dead {
        fill: black;
        animation: turnBlueBlack 0s forwards;
    }
    .point_red_dead {
        fill: black;
        animation: turnRedBlack 0s forwards;
    }
    .point_transparent {
        fill: black;
        animation: turnTransparent 0s forwards;
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
            opacity:50%;
        }
    }
    @keyframes turnRedBlack {
        to {
            fill: red;
            opacity:50%;
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
        width: 50%;
        height: 50vh;
        margin: 10;
        margin-top: 0px;
        margin-right:-200px;
        margin-left: 100px;
        margin-bottom: 500px;
        position: relative;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.5s, visibility 0.5s;
        justify-content: center;
        align-items: center;
    }
    .graph_2{
        width: 50%;
        height: 50vh;
        margin: 10;
        margin-top: 260px;
        margin-right:-200px;
        margin-left: -50px;
        margin-bottom: 90px;
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
    .graph_2.visible {
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
        flex-direction: row;
        display: flex;
    }
    .graph-container.visible{
        display: flex;
        flex-direction: row; /* Ensures side-by-side layout */
        justify-content: space-around; /* Adjusts space between and around items */
        align-items: center; /* Centers items vertically */
        width: 100%;
        height: 100vh;
    }
</style>