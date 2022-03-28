<template>
    <div style="text-align: center;height: 100%">
        <div class="div01 test01">
            <img style="width: 50px;height: 50px;transform:rotate(0deg)" src="../../static/img/xgl2.png"  alt="me" />
            <span class="span01">关系管理</span>
        </div>
        <div style="margin-bottom:100px;margin-top: 100px">
            <el-select
                    v-model="value1"
                    placeholder="请选择主角色">
                <el-option style="color: deepskyblue"
                        v-for="item in userList"
                        :key="item.key"
                        :label="item.label"
                        :value="item.key">
                </el-option>
            </el-select>
            <el-select
                    v-model="value2"
                    collapse-tags
                    style="margin-left: 20px;"
                    placeholder="请选择关系">
                <el-option style="color: green"
                        v-for="item in relationList"
                        :key="item.key"
                        :label="item.label"
                        :value="item.key">
                </el-option>
            </el-select>
            <el-select
                    v-model="value3"
                    collapse-tags
                    style="margin-left: 20px;"
                    placeholder="请选择次角色">
                <el-option style="color: deepskyblue"
                        v-for="item in userList"
                        :key="item.key"
                        :label="item.label"
                        :value="item.key">
                </el-option>
            </el-select>
        </div>
        <div class="div03">
                <el-row>
                    <el-button type="primary" @click="goLastStep()">上一步</el-button>
                    <el-button type="primary" @click="goSubmit()">保存按钮</el-button>
                </el-row>
            </div>
        <el-dialog
                title="保存关系"
                :visible.sync="dialogFormVisible"
                top="45vh"
                width="25%">
            <span style="color:red;">{{this.message}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false;submit()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "userRelationAddManager",
        props:['type'],
        data() {
            return {
                userList: [],
                userMap: {},
                relationList: [],
                relationMap:{},
                form: {
                    id: '',
                    name: ''
                },
                formLabelWidth: '0px',
                userRelation: {
                    masterid: null,
                    servantid: null,
                    relationid: null
                },
                value1: '',
                value2: '',
                value3: '',
                dialogFormVisible: false,
                message: ''
            };
        },

        methods: {
            getUserList() {
                this.$api.get('/api/user/getAllUserList').then(response => {
                    response.data.forEach((item)=>{
                        this.userList.push({
                            key: item.id,
                            label: item.name
                        });
                        this.userMap.id = item.id;
                        this.userMap[item.id] = item.name;
                    });
                })
            },
            selectRelation() {
                this.relationList = [];
                this.$api.get('/api/relation/getAllRelationList').then(response => {
                    response.data.forEach((item)=>{
                        this.relationList.push({
                            key: item.id,
                            label: item.name
                        });
                        this.relationMap.id = item.id;
                        this.relationMap[item.id] = item.name;
                    });
                })
            },
            goSubmit() {
                this.message=`确定保存${this.userMap[this.value1]}是${this.userMap[this.value3]}的${this.relationMap[this.value2]}?`;
                this.dialogFormVisible = true;
            },
            submit() {
                this.userRelation.masterId = this.value1;
                this.userRelation.servantId = this.value3;
                this.userRelation.relationId = this.value2;
                this.$api.post('/api/userrelation/saveUserRelation',this.userRelation).then(
                    this.open1()
                )
            },
            open1() {
                this.$notify({
                    title: '成功',
                    message: '添加成功!',
                    type: 'success'
                });
            },
            goLastStep() {
                this.$router.push({ name: 'home', params:{type: 'userRelationManager', activeIndex: 5} })
            }
        },
        mounted() {
            this.getUserList();
            this.selectRelation();
        }
    };
</script>

<style scoped>
    .div03{
        display: contents;
        height: 50px;
    }
    .test01{
        display: flex;
        align-items: center;
        background-color: DeepSkyBlue;
    }
</style>
