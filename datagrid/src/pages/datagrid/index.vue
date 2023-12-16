<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <div class="d-flex my-2">
            <div class="flex-grow-1">
                <div>
                    <input
                        class="form-control form-control-sm"
                        type="file"
                        @change="handleFileUpload" />
                </div>
            </div>
            <div>
                <button type="button"
                    class="btn btn-outline-secondary btn-sm"
                    :disabled="changedRows.length === 0"
                    @click="updateData"
                >
                    저장
                </button>
            </div>
        </div>
        <data-grid
            class="data-grid"
            :rowData="rowData"
            :columnDefs="columnDefs"
            @changed-row-data="editData"
        ></data-grid>
        <pre>{{ jsonData }}</pre>
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

        const changedRows = ref([])

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

            } catch (err) {
                console.error(err);
            }
        }

        const editData = (data) => {
            let changedRow = findRowByKey(rowData.value, 'id', data.id);
            changedRow[data.columnName] = data.newValue;

            changedRows.value.push(data);
        }

        const updateData = async () => {
            if (changedRows.value.length === 0)
                return;

            try {
                while (changedRows.value.length > 0) {
                    const data = changedRows.value.shift();
                    await axios.patch(`/datas/${data.id}`, {
                        [data.columnName]: data.newValue
                    });
                }
            } catch (err) {
                console.error(err);
            }
        }

        function findRowByKey(array, key, value) {
            //TODO: id가 숫자이므로 오름차순 정렬 후 이분 탑색으로 변경 필요
            for (const obj of array) {
                if (obj[key] === value) {
                    return obj;
                }
            }
            return null; // 해당 키의 값을 가진 객체를 찾지 못한 경우
        }

        onMounted(() => {
            getData();
        })

        onUpdated(() => {
        })

        return {
            rowData,
            columnDefs,
            changedRows,
            jsonData,
            editData,
            updateData,
            findRowByKey,
            handleFileUpload,
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