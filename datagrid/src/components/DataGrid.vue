<template>
  <ag-grid-vue
      :class="isDarkTheme ? 'ag-theme-balham-dark' : 'ag-theme-balham'"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
      :getRowId="getRowId"

      @grid-ready="onGridReady"
      @grid-size-changed="onGridSizeChanged"
      @first-data-rendered="onFirstDataRendered"

      @cell-value-changed="onCellEditRequest"
      >
  </ag-grid-vue>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3'; // Vue3 AgGrid Component
import { onBeforeMount, ref } from 'vue';

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
  setup() {

    const gridApi = ref(null);
    const columnApi = ref(null);
    const getRowId = ref(null);

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

    // const onCellEditRequest = (event) => {
    //   console.log(rowData[event.node.rowIndex]);
    //   console.log('onCellEditRequest, updating ' + getRowId.value + ' / ' +event.colDef.field + ' to ' + event.newValue);
    // };

    onBeforeMount(() => {
      getRowId.value = (params) => params.data.id;
    });

    return {
      getRowId,
      gridApi,
      columnApi,
      onGridReady,
      onFirstDataRendered,
      onGridSizeChanged,
      // onCellEditRequest,
    }
  }
};
</script>

<style scoped>
  @import 'ag-grid-community/styles/ag-grid.css';
  @import 'ag-grid-community/styles/ag-theme-balham.min.css';
</style>