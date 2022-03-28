<template>
    <div>
        <!--<div class="div02">
            <img style="width: 50px;height: 50px;transform:rotate(0deg)" src="../../static/img/xgl2.png"  alt="me" />
            <span class="span01">关系管理</span>
        </div>-->
        <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                  stripe>
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    label="索引"
                    type="index"
                    :index="indexMethod">
            </el-table-column>
            <el-table-column label="主角色" prop="masterName"></el-table-column>
            <el-table-column label="次角色" prop="servantName"></el-table-column>
            <el-table-column label="关系" prop="relationName"></el-table-column>
            <el-table-column width="500">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="search" size="mini" style="width:50%;margin-right: 10px" placeholder="输入关键字搜索"/>
                    <el-button type="warning" @click="batchDelete()">批量删除</el-button>
                    <el-button type="success" @click="changeTable()">新增</el-button>
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="queryParam.pageCurrent"
                    :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
                    :page-size.sync="queryParam.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="queryParam.rowCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "userRelationManager",
        data() {
            return {
                search: '',
                tableData: [],
                outerVisible: false,
                form: {
                    id: null,
                    name: '',
                    age: null,
                },
                formLabelWidth: '120px',
                queryParam : {
                    param : {
                    },
                    pageCurrent : 1,
                    pageSize : 10,
                    rowCount : 0,
                    pageCount : 0
                },
                multipleSelection: [],
                type: ''
            }
        },
        components: {
        },
        methods: {
            handleSizeChange() {
                this.getAllUserRelation();
            },
            handleCurrentChange() {
                this.getAllUserRelation();
            },
            getAllUserRelation () {
                console.log('refresh table');
                this.clearTable();
                this.$api.post('/api/userrelation/getUserRelationPageList', this.queryParam).then(response => {
                    this.tableData = response.data.records;
                    this.queryParam.rowCount =  response.data.rowCount;
                    this.queryParam.pageCurrent = response.data.pageCurrent;
                    this.queryParam.pageSize = response.data.pageSize;
                })
            },
            handleDelete(row) {
                let ids = [row.id];
                this.$api.post('/api/userrelation/deleteUserRelation', ids).then(response => {
                    this.getAllUserRelation();
                })
            },
            batchDelete() {
                let ids = [];
                this.multipleSelection.forEach(n => {
                    ids.push(n.id)
                });
                this.$api.post('/api/userrelation/deleteUserRelation', ids).then(response => {
                    this.getAllUserRelation();
                })
            },
            clearTable(){
                this.tableData = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            indexMethod(index) {
                return index + 1;
            },
            changeTable() {
                this.$router.push({ path: 'adduserrelation' })
            }
        },
        mounted () {
            this.getAllUserRelation();
        },
    }
</script>
