<template>
    <div class="echartLayout">
        <div >
            <el-select
                    filterable
                    v-model="key"
                    @change="selectSomeUserRelation"
                    placeholder="请选择主角哦！！！">
                <el-option style="color: blueviolet"
                           v-for="item in userList"
                           :key="item.key"
                           :label="item.label"
                           :value="item.key">
                </el-option>
            </el-select>
        </div>
        <div id="container" style="width:100%; height:100%; overflow:hidden;">
        </div>
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
                userList: [],
                key: '',
            }
        },
        mounted() {
            this.selectAllUserRelation();
            this.getUserList();
        },
        methods: {
            initEchart() {
                let dom = document.getElementById("container");
                this.myChart = this.$echarts.init(dom);

                let option = {
                    tooltip: {
                        formatter: function (x) {
                            return x.data.lable;
                        }
                    },
                    series: [
                        {
                            type: 'graph',
                            layout: 'force',
                            symbolSize: 80,
                            roam: true,
                            edgeSymbol: ['circle', 'arrow'],
                            edgeSymbolSize: [4, 10],
                            edgeLabel: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        fontSize: 20
                                    },
                                    formatter: function (x) {
                                        return x.data.lable;
                                    }
                                }
                            },
                            force: {
                                repulsion: 2500,
                                edgeLength: [100, 200],
                                layoutAnimation: true
                            },
                            draggable: true,
                            itemStyle: {
                                normal: {
                                    color: 'green',
                                    formatter: function (x) {
                                        return x.data.lable;
                                    }
                                }
                            },
                            lineStyle: {
                                normal: {
                                    width: 2,
                                    color: 'red',
                                    curveness: 0.2,
                                    formatter: function (x) {
                                        return x.data.lable;
                                    }
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                    },
                                    formatter: function (x) {
                                        return x.data.lable;
                                    }
                                }
                            },
                            data: this.chartData,
                            links: this.chartLink,
                            legendHoverLink: true,
                            cursor: 'pointer',
                            labelLayout: {
                                moveOverlap: 'shiftX', //在标签重叠的时候是否挪动标签位置以防止重叠。
                                draggable: true, //标签是否可以允许用户通过拖拽二次调整位置。
                            },
                            emphasis: {
                                scale: true, //是否开启高亮后节点的放大效果。
                                focus: 'adjacency'
                            },
                        }
                    ]
                };
                this.myChart.setOption(option);
                //窗口大小变化时，图表自适应窗口
                window.onresize = function () {
                    //this.myChart.resize();
                }
            },

            selectAllUserRelation() {
                this.clearData();
                this.$api.get('/api/userrelation/getUserRelationListAll').then(response => {
                    response.data.users.forEach((item, i)=>{
                        this.chartData.push({
                            name: item.id + "",
                            lable: item.name
                        });
                    });
                    response.data.userRelationVOList.forEach((item, i)=>{
                        this.chartLink.push({
                            source: item.masterId + "",
                            target: item.servantId + "",
                            lable: item.relationName,
                        });
                    });
                    this.initEchart();
                })
            },

            getUserList() {
                this.$api.get('/api/user/getAllUserList').then(response => {
                    this.userList.push({
                        key: "",
                        label: "EveryOne ..."
                    });
                    response.data.forEach((item)=>{
                        this.userList.push({
                            key: item.id,
                            label: item.name
                        });
                    });
                })
            },

            selectSomeUserRelation() {
                this.clearData();

                if (this.key == "") {
                    this.selectAllUserRelation();
                    return;
                }

                this.$api.post('/api/userrelation/getUserRelationListByUser',this.key).then(response => {
                    response.data.users.forEach((item, i)=>{
                        this.chartData.push({
                            name: item.id + "",
                            lable: item.name
                        });
                    });
                    response.data.userRelationVOList.forEach((item, i)=>{
                        this.chartLink.push({
                            source: item.masterId + "",
                            target: item.servantId + "",
                            lable: item.relationName,
                        });
                    });
                    this.initEchart();
                })
            },

            clearData() {
                this.chartData = [];
                this.chartLink = [];
            },
        }
    }
</script>

<style scoped>
    .echartLayout {
        margin: auto;
        position: absolute;
        top: 6%;
        left: 0;
        bottom: 0;
        right: 0;
        overflow:scroll;
        overflow-x:hidden;
        overflow-y:hidden;
    }
</style>
