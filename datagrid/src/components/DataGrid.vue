<template>
  <div style="height: 300px">
    <ag-grid-vue
        style="width: 100%; height: 100%;"
        :class="isDarkTheme ? 'ag-theme-balham-dark' : 'ag-theme-balham'"
        :columnDefs="columnDefs"
        :rowData="rowData"
        :defaultColDef="defaultColDef"

        :pagination="true"
        :paginateChildRows="true"
        :paginationPageSize="paginationPageSize"
        :paginationPageSizeSelector="paginationPageSizeSelector"

        @grid-ready="onGridReady"
        @grid-size-changed="onGridSizeChanged"
        @first-data-rendered="onFirstDataRendered"

        @cell-value-changed="onCellEditRequest"
      >
    </ag-grid-vue>
  </div>
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
      default: []
    },
    rowData: {
      type: Array,
      default: []
    },
    isDarkTheme: {
      type: Boolean,
      default: false
    },
    defaultColDef : {
      type: Object,
      default: {
        editable: true,
        filter: true,
        minWidth: 100
      }
    },
    paginationPageSize: {
      type: Number,
      default: 10
    },
    paginationPageSizeSelector: {
      type: Array,
      default: [1, 2, 3, 4, 5, 10]
    }
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