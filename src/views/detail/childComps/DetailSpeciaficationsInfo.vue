<template>
  <table id="speciafications_table">
    <tr
      v-for="(value, key, index) in speciafications"
      :key="index"
      class="speciafications_table_tr"
    >
      <td class="speciafications_table_tr_td_key">{{ key }}</td>
      <td class="speciafications_table_tr_td_value">{{ value }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "DetailSpeciaficationsInfo",
  props: {
    speciaficationsInfo: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      speciafications: "",
    };
  },
  watch: {
    speciaficationsInfo: function () {
      // step0：转成json数据
      this.speciafications = JSON.parse(this.speciaficationsInfo);
      console.log(this.speciafications);
      // step1：进行遍历
      //   for (var key in this.speciafications) {
      //     alert(key + ":" + this.speciafications[key]);
      //   }
    },
  },
};
</script>

<style scoped>
#speciafications_table {
  width: 100%;
  font-family: 楷体;
  font-size: 30px;
  color: #272626;
  border: 2px;
  border-color: #a9c6c9;
  border-collapse: separate;
  background-color: #e7f6f8;
}
table, th, td
  {
  border: 1px solid rgb(248, 166, 237);
  }
.speciafications_table_tr {
  height: 50px;
  width: 100%;
}

.speciafications_table_tr_td_key{
    width: 33%;
    text-align: center;
}

.speciafications_table_tr_td_value{
    width: 67%;
    
}
</style>