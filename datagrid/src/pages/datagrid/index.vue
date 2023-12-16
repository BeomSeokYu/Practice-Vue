<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <div class="d-flex my-2">
            <div class="flex-grow-1">
                <div>
                    <input
                        class="form-control form-control-sm"
                        type="file"
                        @change="handleFileUpload"
                        />
                </div>
            </div>
            <div>
                <button type="button"
                    class="btn btn-outline-secondary btn-sm"
                    :disabled="uploadData === null"
                    @click="saveUploadData"
                >
                    업로드
                </button>
            </div>
        </div>
        <div class="d-flex my-2">
            <div class="flex-grow-1">
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
    </div>
</template>

<script>
import { onMounted, onUpdated, ref } from 'vue';
import DataGrid from '@/components/DataGrid.vue';
import axios from '@/axios'
import * as XLSX from 'xlsx'

export default {
    components: {
        DataGrid,
    },
    setup() {
        const rowData = ref(null);      // DataGrid에 넘길 rowData객체

        const columnDefs = ref(null);   // DataGrid에 넘길 columnDefs객체

        const changedRows = ref([]);    // data 수정 시 수정될 Row가 담기는 배열

        const uploadData = ref(null);

        const getData = async () => {
            try {
                const res = await axios.get('/datas')

                if ( res.data.length == 0)
                    return

                const dataColumns = Object.keys(res.data[0][0])
                dataColumns.shift();
                const columninfos = [];
                dataColumns.forEach((columnName) => {
                    columninfos.push({
                        field: columnName
                    })
                });

                columnDefs.value = columninfos;
                rowData.value = res.data[0];

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

        const registerData = async (datas) => {
            try {
                await axios.post('/datas', datas)
                getData();
            } catch (err) {
                console.error(err);
            }
        }

        const clearDataBase = async () => {
            try {
                await axios.delete(`/datas/1`)
            } catch (err) {
                console.error(err);
            }
        }

        const handleFileUpload = async (event) => {
            const file = event.target.files[0];

            if (file) {
                try {
                    const reader = new FileReader();

                    reader.onload = (e) => {
                        const data = e.target.result;
                        const workbook =  XLSX.read(data, {
                            type: 'binary'
                        });
                        const sheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[sheetName];
                        const jsonResult = XLSX.utils.sheet_to_json(worksheet, {
                            header: 2
                        });
                        const jsonColumnNames = XLSX.utils.sheet_to_json(worksheet, {
                            header: 1
                        })[0];

                        const columninfos = [];
                        jsonColumnNames.forEach((columnName) => {
                            columninfos.push({
                                field: columnName
                            })
                        });
                        // columnDefs.value = columninfos;
                        // rowData.value = jsonResult;
                        uploadData.value = jsonResult
                    }

                    reader.readAsBinaryString(file);
                } catch (err) {
                    console.error(err);
                }
            }
        }

        const saveUploadData = () => {
            // clear db
            clearDataBase();
            registerData(uploadData.value);
            uploadData.value = null;
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
            uploadData,
            editData,
            updateData,
            saveUploadData,
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