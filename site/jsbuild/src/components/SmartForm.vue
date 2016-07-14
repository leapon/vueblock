<template>
  <form class="{{ form_class }}">
    <template v-for="column in columns">
    <div class="form-group">
      <label for="{{ column.name }}">{{ column.display || column.name }}</label>
      <template v-if="column.type == 'input'">
        <input
          class="form-control"
          data-column="{{ column.name }}"
          v-model="form[column.name]"
          debounce="500"
          @change="formValueChange"/>
      </template>
      <template v-if="column.type == 'select-one'">
        <select
          class="form-control"
          data-column="{{ column.name }}"
          v-model="form[column.name]"
          @change="formValueChange">
          <option v-for="value in column.values">{{ value }}</option>
        </select>
      </template>
      <template v-if="column.type == 'select-multi'">
        <select
          class="form-control"
          data-column="{{ column.name }}"
          v-model="form[column.name]"
          @change="formValueChange"
          multiple>
          <option v-for="value in column.values">{{ value }}</option>
        </select>
      </template>
      <template v-if="column.type == 'select-checkbox'">
        <div class="checkbox" v-for="value in column.values">
          <label>
            <input type="checkbox"
              name="{{ column.name }}"
              value="{{ value }}"
              data-column="{{ column.name }}"
              v-model="form[column.name]"
              @change="formValueChange" />
            {{ value }}
          </label>
        </div>
      </template>
      <template v-if="column.type == 'select-radio'">
        <div class="radio" v-for="value in column.values">
          <label>
            <input type="radio"
              name="{{ column.name }}"
              value="{{ value }}"
              data-column="{{ column.name }}"
              v-model="form[column.name]"
              @change="formValueChange" />
            {{ value }}
          </label>
        </div>
      </template>
      <template v-if="column.type == 'text'">
        <textarea
          class="form-control"
          data-column="{{ column.name }}"
          v-model="form[column.name]"
          @change="formValueChange"></textarea>
      </template>
    </div>
    </template>
    <template v-if="config.showbuttons">
    <div class="form-group">
      <button type="button" class="btn btn-success btn-submit" @click="submitForm">Save</button>
      <button type="button" class="btn btn-default btn-cancel" @click="cancelForm">Clear</button>
    </div>
    </template>
  </form>
</template>

<script>
import store from '../vuex/store'
import { setFormByName, submitForm, cancelForm, sendFormChange, getitems } from '../vuex/actions'

export default {
  props: ['name', 'columns', 'config'],
  data: function() {
    return {};
  },
  vuex: {
    getters: {
      formCol: state => state.formCol
    }
  },
  computed: {
    form_class: function() {
      var result = '';
      console.log('compute form_class:', this.$get('config'));
      if (this.$get('config')['mode'] == 'inline') {
        result = 'form-inline';
      }
      return result;
    },
    form: {
      get: function () {
        var formCol = this.$store.state['formCol'];
        var formName = this.$get('name');
        console.log('>>> formName', formName);
        console.log('>>> formCol', formCol);
        return formCol[formName];
      },
      set: function (newForm) {
        var formName = this.$get('name');
        setFormByName(this.$store, formName, newForm);
      }
    }
  },
  methods: {
    formValueChange: function(event) {
      console.log('formValueChange:', event);
      var column = $(event.srcElement).attr('data-column');
      var value = event.srcElement.value;
      console.log('formValueChange:', column, value);
      sendFormChange(this.$store, this.name, column, value);
      return false;
    },
    submitForm: function(event) {
      console.log('submitForm:', event);
      submitForm(this.$store, this.$get('name'), this.dismissForm);
    },
    cancelForm: function(event) {
      console.log('cancelForm:', event);
      cancelForm(this.$store, this.$get('name'), this.dismissForm);
    },
    dismissForm: function() {
      console.log('dismissForm', this.$get('name'));
      var popupContainerId = this.$get('config')['popupContainerId'];
      if (popupContainerId) {
        $('#' + popupContainerId).modal('hide');
      }
      getitems(this.$store);  // refresh items list
    }
  }
}
</script>

<style>
form.form-inline .form-group label {
  font-weight: normal;
  padding-left: 10px;
  padding-right: 3px;
}
</style>
