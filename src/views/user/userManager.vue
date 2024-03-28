<template>
    <div>
        <!--<div class="div02">
            <img style="width: 50px;height: 50px;transform:rotate(0deg)" src="../../static/img/xgl2.png"  alt="me" />
            <span class="span01">人员管理</span>
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
            <el-table-column label="年龄" prop="age"></el-table-column>
            <el-table-column width="800">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="search" size="mini" style="width:50%;margin-right: 10px" placeholder="输入关键字搜索"/>
                    <el-button type="warning" @click="batchDelete()">批量删除</el-button>
                    <el-button type="success" @click="addUser()">新增</el-button>
                    <el-button type="success" @click="exportUserList()">下载</el-button>
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" @click="editUser(scope.row)">编辑</el-button>
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
        <el-dialog title="添加用户" :visible.sync="outerVisible" @close="close">
            <el-form :model="form">
                <el-form-item label="用户名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户年龄" :label-width="formLabelWidth">
                    <el-input v-model="form.age" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="outerVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUserForm()">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    // @ is an alias to /src
    export default {
        name: "userManager",
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
                multipleSelection: []
            }
        },
        components: {
        },
        methods: {
            handleSizeChange(val) {
                this.getAllUser();
            },
            handleCurrentChange(val) {
                this.getAllUser();
            },
            getAllUser () {
                this.clearTable();
                this.$api.post('/api/user/getUserList', this.queryParam).then(response => {
                    this.tableData = response.data.records;
                    this.queryParam.rowCount =  response.data.rowCount;
                    this.queryParam.pageCurrent = response.data.pageCurrent;
                    this.queryParam.pageSize = response.data.pageSize;
                })
            },
            handleDelete(row) {
                let ids = [row.id];
                this.$api.post('/api/user/deleteUser', ids).then(response => {
                    this.getAllUser();
                })
            },
            batchDelete() {
                let ids = [];
                this.multipleSelection.forEach(n => {
                    ids.push(n.id)
                });
                this.$api.post('/api/user/deleteUser', ids).then(response => {
                    this.getAllUser();
                })
            },
            addUser() {
                this.outerVisible = true;
            },
            exportUserList() {
                console.log("xxxxxxxxxxxxxxxxxxxxxxxx")
                this.$api({
                    method: 'GET',
                    url: '/api/user/exportUserList',
                    //params: param,
                    responseType: 'blob'
                }).then(res => {
                    let blob = new Blob([res.data], {
                        // 这里一定要和后端对应，不然可能出现乱码或者打不开文件
                        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                        //type: "application/vnd.ms-excel;charset=utf-8"
                    });
                    let url = window.URL.createObjectURL(blob);
                    let link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                    link.download = "用户列表.xlsx"
                    link.click();
                    //释放内存
                    window.URL.revokeObjectURL(link.href)
                }).catch(err=>{
                    console.log(err)
                })
            },
            editUser(row) {
                this.outerVisible =true;
                this.form.id = row.id;
                this.form.name = row.name;
                this.form.age = row.age;
            },
            addUserForm() {
                this.$api.post('/api/user/addUser/',{
                    id: this.form.id,
                    name: this.form.name,
                    age: this.form.age
                }).then(response => {
                    this.outerVisible = false;
                    this.getAllUser();
                })
            },
            clearUserForm() {
                this.form.id = null;
                this.form.name = '';
                this.form.age = null;
            },
            close() {
                this.clearUserForm();
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
            },
        },
        mounted () {
            this.getAllUser();
        },
    }
</script>
