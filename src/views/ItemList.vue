<template>
  <div class="item-list">
    <el-table :data="list" border stripe>
      <el-table-column
        v-for="col in columns"
        :prop="col.prop"
        :key="col.prop"
        :label="col.label"
        :width="col.width"
        v-bind="col"
      >
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="onEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >

          <el-button @click="onDelete(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
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
          label: "物品名称",
          prop: "name",
        },
         {
          label: "图标",
          prop: "icon",
          formatter: ({icon})=>{
            return <img src={icon} style="width: 48px"/>
          }
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
        .get("/rest/items")
        .then((res) => {
          this.list = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    onEdit(row) {
      this.$router.push(`/item/edit/${row._id}`);
    },

    onDelete(row) {
      this.$confirm(`是否删除${row.name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$axios
          .delete(`/rest/items/${row._id}`)
          .then((resp) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          })
          .catch((e) => {
            this.$message({
              type: "error",
              message: err,
            });
          });
      });
    },
  },
};
</script>

<style></style>
