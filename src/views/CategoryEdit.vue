<template>
  <div class="category-edit">
    <h2>创建分类</h2>
    <el-form :model="form" ref="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item> </el-form
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
    };
  },

  methods: {
      onSubmit() {
          this.$axios.post('/admin/api/categories', this.form).then((res) => {
              console.log(res)
              this.$message({
                  type: 'success',
                  message:  '保存成功'
              })
              
          }).catch((err) => {
              console.error(err)
              this.$message({
                  type: 'error',
                  message: '保存失败'
              })
          });
      }
  }
};
</script>

<style></style>
