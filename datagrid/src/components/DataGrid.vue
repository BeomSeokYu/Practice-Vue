<template>
  <ag-grid-vue
      :class="isDarkTheme ? 'ag-theme-balham-dark' : 'ag-theme-balham'"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :defaultColDef="defaultColDef"

      @grid-ready="onGridReady"
      @grid-size-changed="onGridSizeChanged"
      @first-data-rendered="onFirstDataRendered"

      @cell-value-changed="onCellEditRequest"
      >
  </ag-grid-vue>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3'; // Vue3 AgGrid Component
import { ref } from 'vue';

export default {
  components: {
    AgGridVue, // Add AG Grid Vue3 component
  },
  props: {
    columnDefs: {
      type: Array,
      default: () => []
    },
    rowData: {
      type: Array,
      default: () => []
    },
    isDarkTheme: {
      type: Boolean,
      default: false
    },
    defaultColDef : {
      type: Object,
      default: () => {
        return {
          editable: true,
          filter: true
        }
      }
    },
  },
  emits: ['changed-row-data'],
  setup(props, { emit }) {

    const gridApi = ref(null);
    const columnApi = ref(null);

    const onGridReady = (params) => {
      gridApi.value = params.api;
      columnApi.value =params.columnApi;
    }

    const onFirstDataRendered = () => {
      gridApi.value.sizeColumnsToFit();
    }

    const onGridSizeChanged = () => {
      gridApi.value.sizeColumnsToFit();
    }

    const onCellEditRequest = (event) => {
      // console.log(props.rowData[event.node.rowIndex]);
      console.log('onCellEditRequest, updating ' + event.colDef.field + ' to ' + event.newValue);

      emit('changed-row-data', {
        id: props.rowData[event.node.rowIndex].id,
        columnName: event.colDef.field,
        newValue: event.newValue
      });
    };

    return {
      gridApi,
      columnApi,
      onGridReady,
      onFirstDataRendered,
      onGridSizeChanged,
      onCellEditRequest,
    }
  }
};
</script>

<style scoped>
  @import 'ag-grid-community/styles/ag-grid.css';
  @import 'ag-grid-community/styles/ag-theme-balham.min.css';
</style>