<template>
  <div class="category-edit">
    <h2>{{ isEdit ? "编辑" : "新增" }}文章</h2>
    <el-form :model="form" ref="form" label-width="80px">
      <el-form-item label="所属分类">
        <el-select clearable multiple v-model="form.categories" placeholder="">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor
          useCustomImageHandler
          @image-added="handleImageAdded"
          v-model="form.content"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  props: {
    id: {
      type: [String],
      default: "",
    },
  },
  data() {
    return {
      form: {},

      categories: {},
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
      this.getCategories();

      if (this.isEdit) {
        this.$axios.get(`/rest/articles/${this.id}`).then((res) => {
          this.form = res.data;
        });
      }
    },
    getCategories() {
      this.$axios.get(`/rest/categories`).then((res) => {
        this.categories = res.data;
      });
    },
    onSubmit() {
      let promise = null;

      const data = { ...this.form };

      if (this.isEdit) {
        promise = this.$axios.put(`/rest/articles/${this.id}`, data);
      } else {
        promise = this.$axios.post("/rest/articles", data);
      }

      promise
        .then((res) => {
          console.log(res);
          this.$message({
            type: "success",
            message: "保存成功",
          });

          this.$router.push("/article/list");
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            type: "error",
            message: "保存失败",
          });
        });
    },

    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);

      this.$axios
        .post(`${this.$axios.defaults.baseURL}/uploads`, formData)
        .then((result) => {
          let url = result.data.url;
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
