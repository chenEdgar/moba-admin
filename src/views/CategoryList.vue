<template>
  <div class="category-list">
    <el-table :data="list" border stripe>
      <el-table-column
        v-for="col in columns"
        :prop="col.prop"
        :key="col.prop"
        :label="col.label"
        :width="col.width"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          label: "ID",
          prop: "_id",
        },
        {
          label: "分类名称",
          prop: "name",
        },
      ],
      list: [],
    };
  },

  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$axios
        .get("admin/api/categories")
        .then((res) => {
          this.list = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style></style>
