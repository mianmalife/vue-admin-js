<template>
  <div class="p-[20px]">
    <div class="flex">
      <div class="grow">
        <el-button class="mx-[12px]" @click="handleAdd">add item</el-button>
      </div>
    </div>

    <el-table class="w-[100%]" :data="paginatedData" :row-class-name="tableRowClassName">
      <el-table-column label="Date" prop="date" />
      <el-table-column label="Name" prop="name" />
      <el-table-column align="right" class="flex">
        <template #header>
          <el-input v-model="search" class="!w-[240px]" placeholder=" search" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            Edit
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="flex justify-end px-[12px] py-[10px]">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20]"
        :pager-count="3" layout="total,sizes, prev, pager, next,jumper" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script setup>

const tableData = ref([
  {
    date: '2024-05-03',
    name: 'Tom',
    done: false,
  },
  {
    date: '2024-05-02',
    name: 'John',
    done: false,
  },
  {
    date: '2024-05-04',
    name: 'Morgan',
    done: true,
  },
  {
    date: '2024-05-01',
    name: 'Jessy',
    done: false,
  },
  {
    date: '2024-05-01',
    name: 'Zhangsan',
    done: true,
  },
  {
    date: '2024-05-01',
    name: 'Lisi',
    done: false,
  },
  {
    date: '2024-05-01',
    name: 'Lufei',
    done: true,
  },
  {
    date: '2024-05-01',
    name: 'Narato',
    done: false,
  },
  {
    date: '2024-05-01',
    name: 'Xiaoxin',
    done: false,
  },
  {
    date: '2024-05-01',
    name: 'Hongmo',
    done: false,
  },
  {
    date: '2024-05-01',
    name: 'Lianxiang',
    done: true,
  },
])

const search = ref('')

const tableDataDone = computed(() =>
  tableData.value.filter(
    (data) => data.done
  ))

const handleEdit = (index, row) => {
  console.log(index, row)
}

const handleDelete = (index, row) => {
  tableData.value.splice(index, 1)
  updateTotal()
}

const handleAdd = () => {
  tableData.value.unshift({
    date: '2024-09-24',
    name: '新增了',
    done: false,
  })
  updateTotal()
}

const tableRowClassName = ({ row, rowIndex }) => {
  if (row.done) {
    return 'tab-row-class'
  }
  return ''
}

//分页
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(tableData.value.length);
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  const showData = tableData.value.slice(start, end).filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
  return showData;
});

function updateTotal() {
  total.value = tableData.value.length
}

// 处理每页条数变化  
function handleSizeChange(val) {
  pageSize.value = val;
  currentPage.value = 1;
}

// 处理页码变化  
function handleCurrentChange(val) {
  currentPage.value = val;
}

</script>

<style lang="scss" scoped></style>
<style>
.tab-row-class {
  color: var(--el-color-primary);
}
</style>