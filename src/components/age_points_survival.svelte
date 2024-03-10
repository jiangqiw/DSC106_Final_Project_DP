<script>
    import { onMount } from 'svelte';
    export let index;
    export let ageVisualization;

    let points = [];
    const spacing = 12;
    let radius = 4;
    const pointsPerSideX = 30;
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
                // Define transparent gaps based on the index i, modifying the indices as needed to fit the new sequence
                isTransparent: (i >= 109 && i < 150) || (i >= 861 && i < 915 - 15),
                // Adjusting the conditions for coloring and the 'dead' status based on the specified counts and sequences
                isBlue: i < 109,
                isBlueDead: i >= 61 && i < 109, // Assuming the first 109 dots include the last 48 as 'dead'
                isRed: i >= 150 && i < 861,
                isRedDead: i >= 861 - 434 && i < 861, // Adjust according to the actual sequence
                isGreen: i >= 915 - 15,
                isGreenDead: i >= 1309 - 137, // Adjust according to the actual sequence
                animationDelay: i * 1 // Adjust this value for the desired effect
            });
        }
    }

    let isVisible = false;
    // $: isVisible = index === 5 && (currentVisuallization_pclass === 'class1');
    $: isVisible = index === 8 && (ageVisualization === 'casualty');

    let pieData = [
        { value: 56.0, color: 'blue' },
        {value: 44.0, color: "blue", opacity: 0.5}
    ];

    let pieData_1 = [
        { value: 39.0, color: 'red' },
        {value: 61.0, color: "red", opacity: 0.5}
    ];

    let pieData_2 = [
        { value: 49.0, color: 'green' },
        {value: 51.0, color: "green", opacity: 0.5}
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

    let total_2 = pieData_1.reduce((acc, slice) => acc + slice.value, 0);
    let startAngle_2 = 0; // Start angle for pieData_1

    pieData_2.forEach(slice => {
        let slicePercentage_2 = slice.value / total_2;
        let endAngle_2 = startAngle_2 + slicePercentage_2 * 2 * Math.PI;

        slice.startAngle = startAngle_2; // Use correct variable for start angle
        slice.endAngle = endAngle_2; // Use correct variable for end angle
        slice.midAngle = (slice.startAngle + slice.endAngle) / 2; // Correctly calculate midAngle
        startAngle_2 = endAngle_2; // Update startAngle_1 for the next slice

        // Correct label position calculations
        let adjustedRadius_2 = pieRadius + labelOffset;
        slice.labelX = adjustedRadius_2 * Math.cos(slice.midAngle);
        slice.labelY = adjustedRadius_2 * Math.sin(slice.midAngle);
        slice.label = `${Math.round((slice.value / total_2) * 100)}%`; // Use total_1 for percentage
    });
</script>



<div class="graph-container" class:visible={isVisible}>
    {#if index === 8}
        <!-- <div class="legend">
            <div class="legend-item">
                <span class="dot dot-blue"></span> Blue Dot - [Description for blue dots]
            </div>
            <div class="legend-item">
                <span class="dot dot-red"></span> Red Dot - [Description for red dots]
            </div>
            <div class="legend-item">
            <span class="dot dot-lightblue"></span> Light Blue Dot - [Description for blue dots]
            </div>
            <div class="legend-item">
                <span class="dot dot-lightred"></span> Light Red Dot - [Description for red dots]
            </div>
        </div> -->
        <svg class = "graph" width = 75% height = "90vh" class:visible={isVisible}>
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
        </svg>

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

        <svg class="graph_3" width="200" height="200" viewBox="-100 -100 200 200" class:visible={isVisible}>
            {#each pieData_2 as slice}
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
        margin-top: 0px;
        position: center;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.5s, visibility 0.5s;
        justify-content: center;
        align-items: center;
    }
    .graph_1{
        width: 30%;
        height: 50vh;
        margin-top: 100px;
        margin-right:-180px;
        margin-left: 160px;
        margin-bottom: 700px;
        position: relative;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.5s, visibility 0.5s;
        justify-content: center;
        align-items: center;
    }
    .graph_2{
        width: 30%;
        height: 50vh;
        margin: 10;
        margin-top: 300px;
        margin-right:-200px;
        margin-left: 30px;
        margin-bottom: 495px;
        position: relative;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.5s, visibility 0.5s;
        justify-content: center;
        align-items: center;
    }
    .graph_3{
        width: 30%;
        height: 50vh;
        margin: 10;
        margin-top: 700px;
        margin-right:-190px;
        margin-left: 50px;
        margin-bottom: 490px;
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
    .graph_3.visible {
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
    .legend {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 10px;
    margin-bottom: 296px;
    margin-right: 100px;
    /* Add more styling as needed */
}

    .legend-item {
        display: flex;
        align-items: center;
        margin-bottom: 5px; /* Space between legend items */
    }

    .dot {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        display: inline-block;
        margin-right: 5px;
    }

    .dot-blue {
        background-color: blue;
    }

    .dot-red {
        background-color: red;
    }

    .dot-lightblue {
        background-color: blue;
        opacity: 0.3;
    }

    .dot-lightred {
        background-color: red;
        opacity: 0.3;
    }
</style>