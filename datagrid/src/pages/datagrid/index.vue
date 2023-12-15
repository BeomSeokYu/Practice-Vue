<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <div class="d-flex">
            <div class="flex-grow-1">

            </div>
            <div>
                <button type="button"
                    class="btn btn-outline-secondary btn-sm"
                    :disabled="isChangedRowData"
                    @click="updateData()"
                >
                    저장
                </button>
            </div>
        </div>
        <data-grid
            class="data-grid"
            :rowData="rowData"
            :columnDefs="columnDefs"
            @emit-row-data="editData()"
        ></data-grid>
    </div>
</template>

<script>
import { onMounted, onUpdated, ref } from 'vue';
import DataGrid from '@/components/DataGrid.vue';
import axios from '@/axios'

export default {
    components: {
        DataGrid,
    },
    setup() {
        const rowData = ref(null);

        const columnDefs = ref(null);

        const isChangedRowData = ref(false)

        const getData = async () => {
            try {
                const res = await axios.get('/datas')

                if ( res.data.length == 0)
                    return

                const dataColumns = Object.keys(res.data[0])
                dataColumns.shift();
                const columninfos = [];
                dataColumns.forEach((columnName) => {
                    columninfos.push({
                        field: columnName
                    })
                });

                columnDefs.value = columninfos;
                rowData.value = res.data;
                console.log(res.data);

            } catch (err) {
                console.error(err);
            }
        }

        const editData = () => {
            console.log('asdf');
        };

        const updateData = async () => {
            rowData
            try {
                const res = await axios.post('/datas')

                if ( res.data.length == 0)
                    return

                const dataColumns = Object.keys(res.data[0])
                const columninfos = [];
                dataColumns.forEach((columnName) => {
                    columninfos.push({
                        field: columnName
                    })
                });

                columnDefs.value = columninfos
                rowData.value = res.data;

            } catch (err) {
                console.error(err);
            }
        }

        onMounted(() => {
            getData();
        })

        onUpdated(() => {
            console.log(rowData.value);
        })

        return {
            rowData,
            columnDefs,
            isChangedRowData,
            editData,
            updateData,
        }
    }
}
</script>

<style>
.data-grid {
    width: auto;
    height: 400px;
}
</style>