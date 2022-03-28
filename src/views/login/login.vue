<template>
  <div class="content">
    <div style="margin-top: auto">
      <img style="width: 120px;height: 120px;transform:rotate(0deg)" src="../../static/img/xgl3.png"  alt="me" />
      <img style="width: 120px;height: 120px;transform:rotate(0deg)" src="../../static/img/xgl2.png"  alt="me" />
      <img style="width: 120px;height: 120px;transform:rotate(0deg)" src="../../static/img/xgl1.png"  alt="me" />
      <img style="width: 120px;height: 120px;transform:rotate(0deg)" src="../../static/img/xgl4.png"  alt="me" />
    </div>
    <div class="divlogin">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="account">
          <el-input style="width: 300px" type="account" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input style="width: 300px" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      var validateAccount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          account: [
            { validator: validateAccount, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        //var data = JSON.stringify(this.ruleForm);

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.post('/api/login/login', this.ruleForm).then(response => {
              if (response.config.data) {
                //登录成功后,将后端给的token以及uid都存在session中
                window.sessionStorage.setItem("token", response.headers.token);
                window.sessionStorage.setItem("id",response.headers.uid);
                this.open("登陆成功");

                this.goHome();
              } else {
                this.open('账号密码不匹配!', '登录失败', 'error');
              }
            })
          } else {
            this.open('账号密码不能为空!', '登录失败', 'error');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      open(title, message, type) {
        this.$notify({
          title: title,
          message: message,
          type: type
        });
      },
      goHome() {
        this.$router.push({ path: 'home' });
      }
    },
    mounted() {
    }
  }
</script>
