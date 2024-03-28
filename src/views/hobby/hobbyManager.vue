<template>
    <div>
        <!--<div class="div02">
            <img style="width: 50px;height: 50px;transform:rotate(0deg)" src="../../static/img/xgl2.png"  alt="me" />
            <span class="span01">爱好管理</span>
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
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="创建时间" prop="createTime"></el-table-column>
            <el-table-column label="更新时间" prop="updateTime"></el-table-column>
            <el-table-column width="500">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="search" size="mini" style="width:50%;margin-right: 10px" placeholder="输入关键字搜索"/>
                    <el-button type="warning" @click="batchDelete()">批量删除</el-button>
                    <el-button type="success" @click="addHobby()">新增</el-button>
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" @click="editHobby(scope.row)">Edit</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
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
        <el-dialog title="添加爱好" :visible.sync="outerVisible" @close="close">
            <el-form :model="form">
                <el-form-item label="爱好名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="outerVisible = false">取消</el-button>
                <el-button type="primary" @click="addHobbyForm()">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "hobbyManager",
        props:['type'],
        data() {
            return {
                search: '',
                tableData: [],
                outerVisible: false,
                form: {
                    id: null,
                    name: '',
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
                multipleSelection: []
            }
        },
        components: {
        },
        methods: {
            handleSizeChange(val) {
                this.getAllHobby();
            },
            handleCurrentChange(val) {
                this.getAllHobby();
            },
            getAllHobby () {
                this.clearTable();
                this.$api.post('/api/hobby/getHobbyList', this.queryParam).then(response => {
                    this.tableData = response.data.records;
                    this.queryParam.rowCount = response.data.rowCount;
                    this.queryParam.pageCurrent = response.data.pageCurrent;
                    this.queryParam.pageSize = response.data.pageSize;
                })
            },
            handleDelete(row) {
                let ids = [row.id];
                this.$api.post('/api/hobby/deleteHobby', ids).then(response => {
                    this.getAllHobby();
                })
            },
            batchDelete() {
                let ids = [];
                this.multipleSelection.forEach(n => {
                    ids.push(n.id)
                });
                this.$api.post('/api/hobby/deleteHobby', ids).then(response => {
                    this.getAllHobby();
                })
            },
            addHobby() {
                this.outerVisible = true;
            },
            editHobby(row) {
                this.outerVisible =true;
                this.form.id = row.id;
                this.form.name = row.name;
            },
            addHobbyForm() {
                this.$api.post('/api/hobby/addHobby/',{
                    id: this.form.id,
                    name: this.form.name,
                }).then(response => {
                    this.outerVisible = false;
                    this.getAllHobby();
                })
            },
            clearHobbyForm() {
                this.form.id = null;
                this.form.name = '';
            },
            close() {
                this.clearHobbyForm();
            },
            clearTable(){
                this.tableData = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            indexMethod(index)
            {
                return index + 1;
            }
        },
        mounted () {
            this.getAllHobby();
        }
    }
</script>
