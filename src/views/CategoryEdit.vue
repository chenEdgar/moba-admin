<template>
  <div class="category-edit">
    <h2>{{ isEdit ? "编辑" : "新增" }}分类</h2>
    <el-form :model="form" ref="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
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
      form: {},
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
    initData() {
      if (this.isEdit) {
        this.$axios.get(`/admin/api/categories/${this.id}`).then((res) => {
          this.form = res.data;
        });
      }
    },
    onSubmit() {
      let promise = null;

      if (this.isEdit) {
        promise = this.$axios.put(
          `/admin/api/categories/${this.id}`,
          this.form
        );
      } else {
        promise = this.$axios.post("/admin/api/categories", this.form);
      }

      promise
        .then((res) => {
          console.log(res);
          this.$message({
            type: "success",
            message: "保存成功",
          });

          this.$router.push('/category/list')
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

<style></style>
