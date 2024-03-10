window.addEventListener('load', function() {
	var myChart = echarts.init(document.getElementById('cahrtBox'));
	var myChart2 = echarts.init(document.getElementById('cahrtBox2'));
	var myChart3 = echarts.init(document.getElementById('cahrtBox3'));
	

	// 定义饼状图的配置项和数据
	var option = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			x:'center',
			y:'bottom'
		},
		series: [{
			name: '占比情况',
			type: 'pie',
			radius: '40%',
			center: ['50%', '50%'],
			color:['blue','red'],
			data: [{
					value: 843,
					name: '男人总数'
				},
				{
					value: 466,
					name: '女人总数'
				}
			],
			  emphasis: {
				itemStyle: {
				  shadowBlur: 10,
				  shadowOffsetX: 0,
				  shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			  }
		}]
	};
	// 将配置项设置到echarts实例中并进行渲染
	myChart.setOption(option);
	
	var option2 = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			x:'center',
			y:'bottom'
		},
		color:['black','blue'],
		series: [{
			name: '占比情况',
			type: 'pie',
			radius: '40%',
			center: ['50%', '50%'],
			data: [{
					value: 682,
					name: '死亡男人数'
				},
				{
					value: 161,
					name: '存活男人数'
				}
			]
		}]
	};
	myChart2.setOption(option2);
	
	var option3 = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			x:'center',
			y:'bottom'
		},
		color:['black','red'],
		series: [{
			name: '占比情况',
			type: 'pie',
			radius: '40%',
			center: ['50%', '50%'],
			data: [{
					value: 127,
					name: '死亡女人数'
				},
				{
					value: 466,
					name: '存活女人数'
				}
			]
		}]
	};
	myChart3.setOption(option3);
	
	
	
	
	// #################Pclass
	var pclassChart1 = echarts.init(document.getElementById('pclassChart1'));
	var option4 = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			x:'center',
			y:'bottom'
		},
		color:['black','blue','red'],
		series: [{
			name: '占比情况',
			type: 'pie',
			radius: '40%',
			center: ['50%', '50%'],
			data: [{
					value: 323,
					name: 'Class1'
				},
				{
					value: 277,
					name: 'Class2'
				},
				{
					value: 709,
					name: 'Class3'
				}
			]
		}]
	};
	pclassChart1.setOption(option4);
	
	var pclassChart2 = echarts.init(document.getElementById('pclassChart2'));
	var pclassChart3 = echarts.init(document.getElementById('pclassChart3'));
	var pclassChart4 = echarts.init(document.getElementById('pclassChart4'));
	var option5 = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			x:'center',
			y:'bottom'
		},
		color:['black','blue'],
		series: [{
			name: '占比情况',
			type: 'pie',
			radius: '40%',
			center: ['50%', '50%'],
			data: [{
					value: 323,
					name: '总数'
				},
				{
					value: 123,
					name: '死亡人数'
				}
			]
		}]
	};
	pclassChart2.setOption(option5);
	var option6 = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			x:'center',
			y:'bottom'
		},
		color:['black','blue'],
		series: [{
			name: '占比情况',
			type: 'pie',
			radius: '40%',
			center: ['50%', '50%'],
			data: [{
					value: 277,
					name: '总数'
				},
				{
					value: 158,
					name: '死亡人数'
				}
			]
		}]
	};
	pclassChart3.setOption(option6);
	var option7 = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			x:'center',
			y:'bottom'
		},
		color:['black','blue'],
		series: [{
			name: '占比情况',
			type: 'pie',
			radius: '40%',
			center: ['50%', '50%'],
			data: [{
					value: 709,
					name: '总数'
				},
				{
					value: 528,
					name: '死亡人数'
				}
			]
		}]
	};
	pclassChart4.setOption(option7);
	
	var ageChart1 = echarts.init(document.getElementById('ageChart1'));
	var ageOption1 = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			x:'center',
			y:'bottom'
		},
		color:['green','red','blue'],
		series: [{
			name: '占比情况',
			type: 'pie',
			radius: '40%',
			center: ['50%', '50%'],
			data: [{
					value: 109,
					name: '<15岁'
				},
				{
					value: 710,
					name: '15-40岁'
				},
				{
					value: 227,
					name: '>40岁'
				}
			]
		}]
	};
	ageChart1.setOption(ageOption1);
	
	var ageChart2 = echarts.init(document.getElementById('ageChart2'));
	var ageChart3 = echarts.init(document.getElementById('ageChart3'));
	var ageChart4 = echarts.init(document.getElementById('ageChart4'));
	var ageOption2 = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			x:'center',
			y:'bottom'
		},
		color:['black','green'],
		series: [{
			name: '占比情况',
			type: 'pie',
			radius: '40%',
			center: ['50%', '50%'],
			data: [{
					value: 48,
					name: '死亡'
				},
				{
					value: 61,
					name: '活着<15岁'
				}
			]
		}]
	};
	ageChart2.setOption(ageOption2);
	var ageOption3 = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			x:'center',
			y:'bottom'
		},
		color:['black','blue'],
		series: [{
			name: '占比情况',
			type: 'pie',
			radius: '40%',
			center: ['50%', '50%'],
			data: [{
					value: 434,
					name: '死亡'
				},
				{
					value: 276,
					name: '活着15-40岁'
				}
			]
		}]
	};
	ageChart3.setOption(ageOption3);
	var ageOption4 = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			x:'center',
			y:'bottom'
		},
		color:['black','red'],
		series: [{
			name: '占比情况',
			type: 'pie',
			radius: '40%',
			center: ['50%', '50%'],
			data: [{
					value: 137,
					name: '死亡'
				},
				{
					value: 90,
					name: '活着>40岁'
				}
			]
		}]
	};
	ageChart4.setOption(ageOption4);
	
	
	var fareChart1 = echarts.init(document.getElementById('fareChart1'));
	var fareOption1 = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			x:'center',
			y:'bottom'
		},
		color:['blue','yellow','red'],
		series: [{
			name: '占比情况',
			type: 'pie',
			radius: '40%',
			center: ['50%', '50%'],
			data: [{
					value: 938,
					name: '<30'
				},
				{
					value: 266,
					name: '30-100'
				},
				{
					value: 85,
					name: '>100'
				}
			]
		}]
	};
	fareChart1.setOption(fareOption1);
	
	
	var fareChart2 = echarts.init(document.getElementById('fareChart2'));
	var fareChart3 = echarts.init(document.getElementById('fareChart3'));
	var fareChart4 = echarts.init(document.getElementById('fareChart4'));
	var fareOption2 = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			x:'center',
			y:'bottom'
		},
		color:['black','blue'],
		series: [{
			name: '占比情况',
			type: 'pie',
			radius: '40%',
			center: ['50%', '50%'],
			data: [{
					value: 124,
					name: '死亡'
				},
				{
					value: 142,
					name: '活着<30'
				}
			]
		}]
	};
	fareChart2.setOption(fareOption2);
	var fareOption3 = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			x:'center',
			y:'bottom'
		},
		color:['black','yellow'],
		series: [{
			name: '占比情况',
			type: 'pie',
			radius: '40%',
			center: ['50%', '50%'],
			data: [{
					value: 660,
					name: '死亡'
				},
				{
					value: 298,
					name: '活着30-100'
				}
			]
		}]
	};
	fareChart3.setOption(fareOption3);
	var fareOption4 = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			x:'center',
			y:'bottom'
		},
		color:['black','red'],
		series: [{
			name: '占比情况',
			type: 'pie',
			radius: '40%',
			center: ['50%', '50%'],
			data: [{
					value: 25,
					name: '死亡'
				},
				{
					value: 60,
					name: '活着30-100'
				}
			]
		}]
	};
	fareChart4.setOption(fareOption4);
});
