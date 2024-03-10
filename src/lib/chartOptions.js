export const option1 = {
    // Your first chart's options...
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
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

export const option2 = {
    // Your second chart's options...
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

export const option3 = {
    // Your second chart's options...
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

export const option4 = {
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
}

export const option5 = {
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

export const option6 = {
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

export const option7 = {
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

export const ageOption1 = {
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

export const ageOption2 = {
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

export const ageOption3 = {
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

export const ageOption4 = {
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

export const fareOption1 = {
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

export const fareOption2 = {
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

export const fareOption3 = {
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

export const fareOption4 = {
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