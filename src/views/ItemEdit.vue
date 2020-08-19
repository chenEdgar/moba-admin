<template>
  <div class="item-edit">
    <h2>{{ isEdit ? "编辑" : "新增" }}物品</h2>
    <el-form :model="form" ref="form" label-width="80px">
      <el-form-item label="物品名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="`${$axios.defaults.baseURL}/uploads`"
          :show-file-list="false"
          :on-success="uploadSuccess"
        >
          <img v-if="form.icon" :src="form.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: [String],
      default: "",
    },
  },
  data() {
    return {
      form: {
        icon: "",
      },

      parentClassify: {},
    };
  },

  computed: {
    isEdit() {
      return this.id;
    },
  },

  created() {
    this.initData();
  },
  methods: {
    uploadSuccess(res, file) {
      // this.form.icon = URL.createObjectURL(file.raw);
      console.log(res)
      this.form.icon = res.url
    },
    initData() {
      this.getParentClassify();

      if (this.isEdit) {
        this.$axios.get(`/rest/items/${this.id}`).then((res) => {
          this.form = res.data;
        });
      }
    },
    getParentClassify() {
      this.$axios.get(`/rest/items`).then((res) => {
        this.parentClassify = res.data;
      });
    },
    onSubmit() {
      let promise = null;

      const data = { ...this.form };
      !this.form.parent && delete data.parent;

      if (this.isEdit) {
        promise = this.$axios.put(`/rest/items/${this.id}`, data);
      } else {
        promise = this.$axios.post("/rest/items", data);
      }

      promise
        .then((res) => {
          console.log(res);
          this.$message({
            type: "success",
            message: "保存成功",
          });

          this.$router.push("/item/list");
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            type: "error",
            message: "保存失败",
          });
        });
    },
  },
};
</script>

<style lang="less">
.item-edit {
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
  
</style>
