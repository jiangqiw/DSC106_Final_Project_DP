<script>
    import { onMount } from 'svelte';
    // import * as echarts from 'echarts';
    // import { option1 } from "/Users/jasondai/Desktop/UCSD/DSC 106/DSC106_Final_Project_DP/src/lib/chartOptions.js";
    export let index;
    export let currentVisualization;


    let points = [];
    const spacing = 12;
    let radius = 4;

    let chartInstance; // This will be bound to the <div> for ECharts

    let hoveredSegmentIndex = null; // Track the index of the hovered segment

    // Function to calculate the offset for a hovered segment
    function calculateHoverOffset(midAngle, offset = 10) {
        return {
            offsetX: Math.cos(midAngle) * offset,
            offsetY: Math.sin(midAngle) * offset,
        };
    }

    function initializeChart() {
        const initializedChart = echarts.init(chartInstance);
        initializedChart.setOption(option1);
    }

    onMount(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const pointsPerSideX = 30;
        const pointsPerSideY = 40;
        const totalGeneratedPoints = 1309 + 107;

        for (let i = 0; i < totalGeneratedPoints; i++) {
            const x = i % pointsPerSideX;
            const y = Math.floor(i / pointsPerSideX);
            points.push({
                x: x * spacing + radius,
                y: y * spacing + radius,
                isTransparent: i > 842 && i < 842 + 88,
                isBlue: i < 843,
                isRed: i > 842,
                animationDelay: i * 1
            });
        }
    });

    let isVisible = false;
    $: isVisible = index === 7 && currentVisualization === 'gender';
    $: if (index === 2 && currentVisualization === 'gender' && chartInstance) {
        initializeChart();
    }

    // Pie chart data and calculations
    let pieData = [
        { value: 64.4, color: 'blue' },
        { value: 35.6, color: 'red' }
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
    {#if index === 7}
        <!-- Point Graph: Adjust the width to allow space for the pie chart -->
        <svg class="graph" width="75%" height="90vh" class:visible={isVisible}>
            {#each points as point, i}
            <circle cx={point.x} cy={point.y} r="4"
                class:point_transparent={point.isTransparent}
                class:point={point.isBlue}
                class:point_red={point.isRed}
                style="animation-delay: {point.animationDelay}ms; opacity: {point.isTransparent ? '0' : '1'};"
                fill="black" />
            {/each}
        </svg>

        <!-- <div bind:this={chartInstance} class="pie-chart-container"></div> -->
        
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
        
    {/if}
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
        margin-top: 0;
        position: center;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.5s, visibility 0.5s;
        justify-content: center;
        align-items:center;
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

    .pie-chart-container {
    flex: 1; /* Less space for the pie chart */
    height: 400px; /* Fixed height for the pie chart */
    visibility: visible; /* Ensure visibility is not controlled by CSS */
    }
</style>




  