<template>
    <!--<div class="div02">
        <img style="width: 50px;height: 50px;transform:rotate(0deg)" src="../../static/img/xgl2.png"  alt="me" />
        <span class="span01">Center关系网</span>
    </div>-->
    <div class="echartLayout">
        <div id="container" style="width:100%; height:100%; overflow:hidden;"></div>
    </div>
</template>

<script>
    import imgSrc1 from '../../static/img/1.jpg'
    import imgSrc2 from '../../static/img/2.jpg'
    import imgSrc3 from '../../static/img/3.jpg'
    import imgSrc4 from '../../static/img/4.jpg'
    import imgSrc5 from '../../static/img/5.jpg'
    import imgSrc6 from '../../static/img/6.jpg'
    import imgSrc7 from '../../static/img/7.jpg'
    import imgSrc8 from '../../static/img/8.jpg'

    export default {
        name: "networkManager",
        data() {
            return {
                myChart: null,
                chartData:[],
                chartLink:[],
            }
        },
        mounted() {
            this.selectUserRelation()
        },
        methods: {
            initEchart() {
                let dom = document.getElementById("container");
                this.myChart = this.$echarts.init(dom);
                let option = {
                    tooltip:{
                        show:false
                    },
                    series: [
                        {
                            edgeLabel: {
                                normal: {
                                    formatter:"{c}",
                                    show:true
                                }
                            },
                            edgeSymbol:'circle',
                            force:{
                                repulsion:2000
                            },
                            layout:'force',
                            roam:true,
                            itemStyle:{
                                normal:{
                                    color: 'red'
                                },
                                //鼠标放上去有阴影效果
                                emphasis: {
                                    shadowColor: '#3721db',
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 0,
                                    shadowBlur: 40,
                                },
                            },
                            label:{
                                normal:{
                                    show:true
                                }
                            },
                            //头像
                            symbol: `image://${imgSrc8}`,
                            symbolSize:60,
                            type:'graph',
                            links: this.chartLink,
                            data:this.chartData
                        }
                    ]
                };
                this.myChart.setOption(option);
                this.myChart.on('click', function (params) {
                });
            },
            selectUserRelation() {
                this.$api.get('/api/userrelation/getUserRelationListAll').then(response => {
                    response.data.users.forEach((item, i)=>{
                        this.chartData.push({
                            id: item.id,
                            name: item.name
                        });
                    });
                    response.data.userRelationVOList.forEach((item, i)=>{
                        this.chartLink.push({
                            source: item.masterId,
                            target: item.servantId,
                            value: item.relationName
                        });
                    });
                    this.initEchart();
                })
            },
        }
    }
</script>

<style scoped>
    .echartLayout {
        margin: auto;
        position: absolute;
        top: 10%;
        left: 0;
        bottom: 0;
        right: 0;
    }
</style>
