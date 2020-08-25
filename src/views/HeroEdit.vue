<template>
  <div class="item-edit">
    <h2>{{ isEdit ? "编辑" : "新增" }}英雄</h2>
    <el-form :model="form" ref="form" label-width="80px" >
      <el-tabs v-model="currentTabPane" type="card">
        <el-tab-pane
          v-for="item in tabPanes"
          :key="item.id"
          :label="item.label"
          :name="item.id"
        >
        </el-tab-pane>
      </el-tabs>

      <template v-if="currentTabPane === 'basic-info'">
        <el-form-item label="英雄名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="称号">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            :action="`${$axios.defaults.baseURL}/uploads`"
            :show-file-list="false"
            :on-success="uploadSuccess"
          >
            <img v-if="form.avatar" :src="form.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="职业">
          <el-select
            multiple
            filterable
            v-model="form.categories"
            placeholder=""
          >
            <el-option
              v-for="item in categories"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="难度">
          <el-rate
            :max="10"
            show-score
            v-model="form.properties.difficulty"
          ></el-rate>
        </el-form-item>
        <el-form-item label="技能">
          <el-rate
            :max="10"
            show-score
            v-model="form.properties.skill"
          ></el-rate>
        </el-form-item>
        <el-form-item label="攻击">
          <el-rate
            :max="10"
            show-score
            v-model="form.properties.attack"
          ></el-rate>
        </el-form-item>
        <el-form-item label="生存">
          <el-rate
            :max="10"
            show-score
            v-model="form.properties.servive"
          ></el-rate>
        </el-form-item>

        <el-form-item label="顺风出装">
          <el-select
            multiple
            filterable
            v-model="form.attackEquipment"
            placeholder=""
          >
            <el-option
              v-for="item in items"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="逆风出装">
          <el-select
            multiple
            filterable
            v-model="form.serviveEquipment"
            placeholder=""
          >
            <el-option
              v-for="item in items"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="使用技巧">
          <el-input
            v-model="form.usageTip"
            type="textarea"
            :autosize="{ minRows: 4 }"
            placeholder=""
          ></el-input>
        </el-form-item>

        <el-form-item label="对抗技巧">
          <el-input
            v-model="form.battleTip"
            type="textarea"
            :autosize="{ minRows: 4 }"
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item label="团战思路">
          <el-input
            v-model="form.teamFightTip"
            type="textarea"
            :autosize="{ minRows: 4 }"
            placeholder=""
          ></el-input>
        </el-form-item>
      </template>

      <template v-if="currentTabPane === 'skill-info'">
        <el-button @click="addSkill">添加技能</el-button>

        <el-row type="flex">
          <el-col :span="12" :key="index" v-for="(item, index) in form.skills">
            <el-form-item label="名称" v-model="item.name">
              <el-input v-model="item.name"></el-input>
            </el-form-item>

            <el-form-item label="图标" v-model="item.name">
              <el-upload
                class="avatar-uploader"
                :action="`${$axios.defaults.baseURL}/uploads`"
                :show-file-list="false"
                :on-success="($event) => uploadSkillIconSuccess($event, index)"
              >
                <img v-if="item.icon" :src="item.icon" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="技能描述" v-model="item.description">
              <el-input type="textarea"  :autosize="{ minRows: 4 }" v-model="item.description"></el-input>
            </el-form-item>

            <el-form-item
              ><el-button type="danger" @click="removeSkill(index)"
                >删除</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </template>
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
        avatar: "",
        properties: {},
        skills: [{}],
      },

      categories: [],

      items: [],
      tabPanes: [
        {
          label: "基本信息",
          id: "basic-info",
        },
        {
          label: "技能信息",
          id: "skill-info",
        },
      ],
      currentTabPane: "skill-info",
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
      this.$set(this.form, "avatar", res.url);
    },
    initData() {
      this.getCategories();
      this.getItems();

      if (this.isEdit) {
        this.$axios.get(`/rest/heros/${this.id}`).then((res) => {
          this.form = {...this.form, ...res.data};
        });
      }
    },
    getCategories() {
      this.$axios.get("/rest/categories").then((resp) => {
        this.categories = resp.data;
      });
    },
    getItems() {
      this.$axios.get("/rest/items").then((resp) => {
        this.items = resp.data;
      });
    },
    onSubmit() {
      let promise = null;

      const data = { ...this.form };
      !this.form.parent && delete data.parent;

      if (this.isEdit) {
        promise = this.$axios.put(`/rest/heros/${this.id}`, data);
      } else {
        promise = this.$axios.post("/rest/heros", data);
      }

      promise
        .then((res) => {
          console.log(res);
          this.$message({
            type: "success",
            message: "保存成功",
          });

          this.$router.push("/hero/list");
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            type: "error",
            message: "保存失败",
          });
        });
    },

    addSkill() {
      this.form.skills.push({});
    },
    removeSkill(index) {
      this.form.skills.splice(index, 1);
    },
    uploadSkillIconSuccess(res, index) {
      console.log(res,index)
      this.$set(this.form.skills[index], "icon", res.url);
  
    }
  },
};
</script>

