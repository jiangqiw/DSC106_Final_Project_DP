<script>
    import { onMount, onDestroy } from 'svelte';
    import * as echarts from 'echarts';
    export let options; // Chart options passed as a prop
  
    let chartInstance;
  
    onMount(() => {
      chartInstance = echarts.init(chartInstance);
      chartInstance.setOption(options);
    });
  
    // Cleanup
    onDestroy(() => {
      chartInstance && chartInstance.dispose();
    });
  </script>
  
  <div bind:this={chartInstance} style="width: 100%; height: 400px;"></div>
  