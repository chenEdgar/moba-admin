<template>
  <div class="category-edit">
    <h2>{{ isEdit ? "编辑" : "新增" }}广告位</h2>
    <el-form :model="form" ref="form" label-width="100px">
      <el-form-item label="广告位名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="广告位">
        <el-button @click="addAds">添加广告位</el-button>
        <el-row >
          <el-col :span="12" :key="index" v-for="(item, index) in form.items" style="padding: 6px">
            <el-form-item label="图片" v-model="item.image">
              <el-upload
                class="avatar-uploader"
                :action="`${$axios.defaults.baseURL}/uploads`"
                :show-file-list="false"
                :on-success="($event) => uploadImgSuccess($event, index)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" style="width:100%"/>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="链接地址" v-model="item.url">
              <el-input v-model="item.url"></el-input>
            </el-form-item>

            <el-form-item
              ><el-button type="danger" @click="removeAds(index)"
                >删除</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
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
        item: [],
        name: ''
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
    initData() {

      if (this.isEdit) {
        this.$axios.get(`/rest/ads/${this.id}`).then((res) => {
          this.form = res.data;
        });
      }
    },
    onSubmit() {
      let promise = null;

      const data = { ...this.form };

      if (this.isEdit) {
        promise = this.$axios.put(`/rest/ads/${this.id}`, data);
      } else {
        promise = this.$axios.post("/rest/ads", data);
      }

      promise
        .then((res) => {
          console.log(res);
          this.$message({
            type: "success",
            message: "保存成功",
          });

          this.$router.push("/ads/list");
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            type: "error",
            message: "保存失败",
          });
        });
    },

     addAds() {
      this.form.items.push({});
    },
    removeAds(index) {
      this.form.items.splice(index, 1);
    },
    uploadImgSuccess(res, index) {
      console.log(res,index)
      this.$set(this.form.items[index], "image", res.url);
  
    }
  },
};
</script>

