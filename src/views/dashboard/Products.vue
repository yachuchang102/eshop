<template>
    <div>
      <div>
        <loading  :active.sync="isLoading"></loading>
        <div class="container">
        <div class="text-right mt-4">
          <button class="btn btn-primary" @click="openModal(true)">
            建立新的產品
          </button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="120">
                分類
              </th>
              <th>產品名稱</th>
              <th width="120">
                原價
              </th>
              <th width="120">
                售價
              </th>
              <th width="100">
                是否啟用
              </th>
              <th width="120">
                編輯
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item) in products" :key="item.id">
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td class="text-right">
                {{ item.origin_price }}
              </td>
              <td class="text-right">
                {{ item.price }}
              </td>
              <td>
                <span v-if="item.enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">
                    編輯
                  </button>
                  <button class="btn btn-outline-danger btn-sm" @click="deleteModalShow(item)">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!--pagination-->
        <!--前面將分頁資訊傳入元件內props；後面元件內的事件去觸發getData，讓資料能夠分頁跑-->
        <Pagination :pages="pagination" :emit-pages="getData"></Pagination>
        <!--paginationend-->
        </div>
        <!-- Modal -->
        <div id="productModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content border-0">
              <div class="modal-header bg-dark text-white">
                <h5 id="exampleModalLabel" class="modal-title">
                  <span>新增產品</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-sm-4">
              <div v-for="i in 5" :key="i + 'img'" class="form-group">
                <label :for="'img' + i">輸入圖片網址</label>
                <input :id="'img' + i" v-model="tempProduct.imageUrl[i - 1]" type="text" class="form-control"
                  placeholder="請輸入圖片連結">
                </div>
                <div class="form-group">
                 <label for="customFile">
                     或 上傳圖片
                <i v-if="status.fileUploading" class="fas fa-spinner fa-spin"></i>
                </label>
                 <input id="customFile" ref="file" type="file" class="form-control">
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl[0]" alt="" />
                  </div>
                  <div class="col-sm-8">
                    <div class="form-group">
                      <label for="title">標題</label>
                      <input id="title" v-model="tempProduct.title" type="text" class="form-control" placeholder="請輸入標題">
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="category">分類</label>
                        <input id="category" v-model="tempProduct.category" type="text" class="form-control"
                          placeholder="請輸入分類" >
                      </div>
                      <div class="form-group col-md-6">
                        <label for="price">單位</label>
                        <input id="unit" v-model="tempProduct.unit" type="unit" class="form-control"
                          placeholder="請輸入單位">
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="origin_price">原價</label>
                        <input id="origin_price" v-model="tempProduct.origin_price" type="number" class="form-control"
                          placeholder="請輸入原價">
                      </div>
                      <div class="form-group col-md-6">
                        <label for="price">售價</label>
                        <input id="price" v-model="tempProduct.price" type="number" class="form-control"
                          placeholder="請輸入售價">
                      </div>
                    </div>
                    <hr>

                    <div class="form-group">
                      <label for="description">產品描述</label>
                      <textarea id="description" v-model="tempProduct.description" type="text" class="form-control"
                        placeholder="請輸入產品描述" >
                      </textarea>
                    </div>
                    <div class="form-group">
                      <label for="content">說明內容</label>
                      <textarea id="description" v-model="tempProduct.content" type="text" class="form-control"
                        placeholder="請輸入說明內容" >
                      </textarea>
                    </div>
                    <div class="form-group">
                      <div class="form-check">
                        <input id="is_enabled" v-model="tempProduct.enabled" class="form-check-input" type="checkbox"
                        :true-value="1" :false-value="0">
                        <label class="form-check-label" for="is_enabled">是否啟用</label>
                        <span>{{tempProduct.enabled}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
                  取消
                </button>
                <button type="button" class="btn btn-primary" @click="updateProduct">
                  確認
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="delProductModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content border-0">
              <div class="modal-header bg-danger text-white">
                <h5 id="exampleModalLabel" class="modal-title">
                  <span>刪除產品</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                是否刪除
                <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
                  取消
                </button>
                <button type="button" class="btn btn-danger" @click="deleteProduct">
                  確認刪除
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
/* global $ */
import Pagination from '@/components/Pagination.vue'
export default {
  name: 'Products',
  components: {
    Pagination
  },
  props: ['token'],
  data () {
    return {
      status: {
        fileUploading: false
      },
      products: [],
      isLoading: false,
      pagination: {},
      tempProduct: {
        imageUrl: []
      },
      isNew: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/products`
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false
          console.log('getData', res.data.meta.pagination)
          console.log('token', this.token)
          this.products = res.data.data
          console.log('產品列表', this.products)
          this.pagination = res.data.meta.pagination
        })
    },
    getProduct (id) {
      const api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/product/${id}`
      this.$http.get(api).then((res) => {
        this.tempProduct = res.data.data
      }).catch((error) => {
        console.log(error)
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        // 這行下的 tempProduct 是被清空的狀態，需要再補上圖片陣列的結構
        this.tempProduct = {
          imageUrl: []
        }
        this.isNew = true
      } else {
        this.tempProduct = Object.assign({}, item)
        console.log('id', this.tempProduct.id)
        this.getProduct(this.tempProduct.id)
        this.isNew = false
      }
      $('#productModal').modal('show')
    },
    deleteModalShow (item) {
      this.tempProduct = Object.assign({}, item)
      $('#delProductModal').modal('show')
    },
    deleteProduct () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`
      this.$http.delete(url).then(() => {
        this.isLoading = false
        $('#delProductModal').modal('hide')
        this.getData()
      })
    },
    updateProduct () {
    // 新增商品
      let api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/product`
      let httpMethod = 'post'
      // 當不是新增商品時則切換成編輯商品 API
      if (!this.isNew) {
        api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`
        httpMethod = 'patch'
      }
      // 預設帶入 token
      this.$http[httpMethod](api, this.tempProduct).then(() => {
        $('#productModal').modal('hide')
        this.getData()
      }).catch((error) => {
        console.log(error)
      })
    },
    // 上傳檔案
    uploadFile () {
      // 選取DOM元素
      const uploadedFile = document.querySelector('#customFile').files[0]
      console.dir(uploadedFile)
      // 轉成FormData
      const formData = new FormData()
      formData.append('file', uploadedFile)
      // 路由、驗證
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/storage`
      // 預設帶入 token
      this.status.fileUploading = true
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        console.log(response.status)
        this.tempProduct.imageUrl.push(response.data.data.path)
        console.log(this.tempProduct.imageUrl)
        this.status.fileUploading = false
      })
    }
  }
}
</script>
