<template>
  <table class="table table-bordered">
    <caption>{{ caption }}</caption>
    <tr>
      <th v-for="column in columns"  class="smartsheet-cell">{{ column.display }}</th>
    </tr>
    <tr v-for="(index, item) in items">
      <td v-for="column in columns" class="smartsheet-cell">
        <template v-if="column.type == 'string'">
          <input class="smartsheet-input"
            data-row-index="{{ index }}"
            data-column="{{ column.name }}"
            v-model="item[column.name]"
            @change="cellChange"/>
        </template>
        <template v-if="column.type == 'date'">
          <input class="smartsheet-input"
            data-row-index="{{ index }}"
            data-column="{{ column.name }}"
            v-model="item[column.name]"
            @change="cellChange"/>
        </template>
        <template v-if="column.type == 'select-one'">
          <select
            class="form-control"
            data-column="{{ column.name }}"
            v-model="item[column.name]"
            @change="cellChange">
            <option v-for="value in column.values">{{ value }}</option>
          </select>
        </template>
        <template v-if="column.type == 'select-multi'">
          <select
            class="form-control"
            data-column="{{ column.name }}"
            v-model="item[column.name]"
            @change="cellChange"
            multiple>
            <option v-for="value in column.values">{{ value }}</option>
          </select>
        </template>
        <template v-if="column.type == 'view'">
          <span
            data-row-index="{{ index }}"
            data-column="{{ column.name }}"
          >{{ item[column.name] }}</span>
        </template>
      </td>
    </tr>
  </table>
  <br/>
</template>

<script>
import store from '../vuex/store.js';
import { changeitem } from '../vuex/actions';

export default {
  props: ['name', 'caption', 'columns'],
  data: function() {
    return {};
  },
  vuex: {
    getters: {
      items: state => state.items
    },
    actions: {
      changeitem
    }
  },
  components: {
  },
  computed: {
  },
  methods: {
    cellChange: function(event) {
      var index = $(event.srcElement).attr('data-row-index');
      var column = $(event.srcElement).attr('data-column');
      var value = event.srcElement.value;
      console.log('SmartSheet cellChange:', index, column, value);
    }
  }
}
</script>

<style>
.table th.smartsheet-cell {
  padding: 8px;
}
.table td.smartsheet-cell {
  padding: 5px;
}
.smartsheet-input {
  width: 100%;
  background: transparent;
  font-size: 14px;
  box-sizing: border-box;
  border: solid 2px #fff;
  padding-top: 3px;
  padding-bottom: 1px;
}
.smartsheet-input:focus {
  outline: none;
}
</style>
