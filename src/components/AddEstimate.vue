<template>
  <div>
    <b-container fluid class="card estimateContainer margBot" id="titleConatainer">
      <b-row class="my-1">
        <label id="titleLable" class="label"> Add an Estimate </label>
      </b-row>
    </b-container>
    <b-container fluid class="card estimateContainer margBot" id="ename_enum_container">
        <b-row class="my-1">
        <b-col sm="4">
          <label class="label">Estimate Name:    <span class="text-danger">*</span></label>
          <label class="inputContainer">
          <b-icon class="docIcon" icon="document-richtext"></b-icon>
            <b-form-input  class="rowInput" size="md" id="ename" type="text" placeholder="Estimate Name.."></b-form-input>
          </label>
        </b-col>
        <b-col sm="4">
          <label class="label">Invoice number:    <span class="text-danger">*</span></label>
           <label class="inputContainer">
          <b-icon class="docIcon" icon="document-richtext"></b-icon>
            <b-form-input  class="rowInput" size="md" id="enumber" type="text" placeholder="Invoice number.."></b-form-input>
          </label>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid class="card estimateContainer margBot" id="eDetails">
        <b-row class="my-1">
        <b-col sm="3">
          <label class="label">Customer:    <span class="text-danger">*</span></label>
          <!-- <b-form-input  class="rowInput" size="md" id="eCustomer" type="text" placeholder="Customer.."></b-form-input> -->
          <b-form-select v-model="customerSelected" class="rowInput" id="eCustomer" :options="customerList">
            <template v-slot:first>
              <b-form-select-option :value=null disabled>-- Please select a Customer --</b-form-select-option>
            </template>
          </b-form-select>
        </b-col>
        <b-col sm="3">
          <label class="label">Date:    <span class="text-danger">*</span></label>
          <b-form-datepicker class="rowInput" @input="DateValidation" size="md" id="eDate" v-model="eDate" locale="en"></b-form-datepicker>
        </b-col>
        <b-col sm="3">
          <label class="label">Subheading:    <span class="text-danger">*</span></label>
          <b-form-input  class="rowInput" size="md" id="eSubheading" type="text" placeholder="Subheading.."></b-form-input>
        </b-col>
        <b-col sm="3">
          <label class="label">P.O./S.O.:    <span class="text-danger">*</span></label>
          <b-form-input  class="rowInput" size="md" id="ePoso" type="text" placeholder="P.O./S.O.."></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label class="label">Sales Man:    <span class="text-danger">*</span></label>
          <!-- <b-form-input  class="rowInput" size="md" id="eSalesMan" type="text" placeholder="Sales Man.."></b-form-input> -->
          <b-form-select v-model="eSalesManSelected" class="rowInput" id="eSalesMan" :options="eSalesManList">
            <template v-slot:first>
              <b-form-select-option :value=null disabled>-- Please select a SalesMan --</b-form-select-option>
            </template>
          </b-form-select>
        </b-col>
        <b-col sm="3">
          <label class="label">Expiry Date:    <span class="text-danger">*</span></label>
          <b-form-datepicker class="rowInput" size="md" :state="errorBool" id="eDate_expiry" v-model="eDate_expiry" @input="expDateValidation" :min="min_eDate_expiry" :max="max_eDate_expiry" locale="en"></b-form-datepicker>
          <div class="dateError" v-if="show">Invalid Date, pls select correct expiry date !!!</div>
        </b-col>
        <b-col sm="3">
          <label class="label">Footer:    <span class="text-danger">*</span></label>
          <b-form-input  class="rowInput" size="md" id="eFooter" type="text" placeholder="Footer.."></b-form-input>
        </b-col>
        <b-col sm="3">
          <label class="label">Memo:    <span class="text-danger">*</span></label>
          <!-- <b-form-input  class="rowInput" size="md" id="eMemo" type="text" placeholder="Memo.."></b-form-input> -->
          <b-form-textarea
              id="memotextarea"
              v-model="memotext"
              placeholder="Memo..."
              max-rows="3"
          ></b-form-textarea>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid class="card estimateContainer" style="overflow-x:auto;" id="eTable">
      <!-- <table class="table table-hover" id='table_1'>
        <thead>
          <tr>
            <th>Item Type</th>
            <th>Item</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Unit</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="(row, i) in rows" track-by="i" :key="i">
            <td>
              <input type="radio" id="P" value="P" v-model="row.itemTypedPicked">
              <label for="P">Product</label>
              <br>
              <input type="radio" id="S" value="S" v-model="row.itemTypedPicked">
              <label for="S">Service</label>
            </td>
            <td>
              <Dropdown
                :options="row.itemList"
                :disabled="false"
                :maxItem="10"
                placeholder="Enter 2 character at least"
                v-model="row.selectedItem"
              ></Dropdown>
            </td>
            <td>
              <input v-model="row.description" number />
            </td>
            <td>
              <input v-model="row.quantity" number />
            </td>
            <td>
              <input v-model="row.price" number />
            </td>
            <td>
              <input class v-model="row.discount" number />
            </td>
            <td>
              <input class v-model="row.unit" number readonly />
            </td>
            <td>
              <input class v-model="row.total" number readonly />
            </td>
          </tr>
        </tbody>
      </table> -->
      <!-- <td>
              <button class @click="addRow(i)">add row</button>
              <button class @click="removeRow(i)">remove row</button>
            </td> -->
      <div id='resp-table'>
        <!-- <div id='resp-table-caption'>Responsive Table without Table tag</div> -->
        <div id='resp-table-header'>
          <div class='table-header-cell'>Item Type</div>
          <div class='table-header-cell'>Item</div>
          <div class='table-header-cell'>Description</div>
          <div class='table-header-cell'>Quantity</div>
          <div class='table-header-cell'>Price</div>
          <div class='table-header-cell'>Discount</div>
          <div class='table-header-cell'>Unit</div>
          <div class='table-header-cell'>Total</div>
        </div>
        <div id='resp-table-body'>
          <div class='resp-table-row' v-for="(row, i) in rows" track-by="i" :key="i">
            <div class='table-body-cell itemType'>
              <!-- <input type="radio" id="P" value="P" v-model="row.itemTypedPicked">
              <label for="P">Product</label>
              <br>
              <input type="radio" id="S" value="S" v-model="row.itemTypedPicked">
              <label for="S">Service</label> -->
              <b-form-select v-model="row.itemTypedPicked" @change="getselectedValue(i)" class="rowInput" id="eCustomer" :options="typeList">
                <template v-slot:first>
                  <b-form-select-option :value=null disabled>-- Please select a product --</b-form-select-option>
                </template>
              </b-form-select>
            </div>
            <div class='table-body-cell item'>
              <Dropdown
                :options="row.itemList"
                :disabled="false"
                :maxItem="10"
                placeholder="Enter 2 character at least"
                v-model="row.selectedItem"
              ></Dropdown>
            </div>
            <div class='table-body-cell description'>
              <input class="rowInput" v-model="row.description" number />
            </div>
            <div class='table-body-cell quantity'>
              <input class="rowInput" @change="calculateTotal(i)" v-model="row.quantity" number />
            </div>
            <div class='table-body-cell price'>
              <input class="rowInput" @change="calculateTotal(i)" v-model="row.price" number />
            </div>
            <div class='table-body-cell discount'>
              <input class="rowInput" @change="calculateTotal(i)" v-model="row.discount" number />
            </div>
            <div class='table-body-cell unit'>
              <input class="rowInput" v-model="row.unit" number/>
            </div>
            <div class='table-body-cell total'>
              <input class="rowInput" v-model="row.total" number/>
            </div>
          </div>
        </div>
        <!-- <div id='resp-table-footer'>
          <div class='table-footer-cell'>Footer 1</div>
          <div class='table-footer-cell'>Footer 2</div>
          <div class='table-footer-cell'>Footer 3</div>
          <div class='table-footer-cell'>Footer 4</div>
          <div class='table-footer-cell'>Footer 5</div>
        </div> -->
      </div>
    </b-container>
  </div>
</template>

<script>
import Dropdown from 'vue-simple-search-dropdown'
import axios from 'axios'
export default {
  components: {
    Dropdown: Dropdown
  },
  created () {
    axios.get('http://35.225.127.81/quotation/customers/customers/?user=1').then((res) => {
      console.log('in list', res)
      this.refelectIntoLocalVar(res)
    })
    // axios.get('http://35.225.127.81/quotation/products/products/?user=1').then((res) => {
    //   console.log(res.data.length)
    // })
  },
  data: function () {
    return {
      customerList: [],
      // customerList: [
      //   {value: 'ca', text: 'Customer-A'},
      //   {value: 'cb', text: 'Customer-B'},
      //   {value: 'cc', text: 'Customer-C'},
      //   {value: 'cd', text: 'Customer-D'}
      // ],
      eSalesManList: [
        {value: 'sa', text: 'SalesMan-A'},
        {value: 'sb', text: 'SalesMan-B'},
        {value: 'sc', text: 'SalesMan-C'},
        {value: 'sd', text: 'SalesMan-D'}
      ],
      customerSelected: null,
      eSalesManSelected: null,
      memotext: '',
      selected: 2,
      options: [{ id: 1, text: 'Hello' }, { id: 2, text: 'World' }],
      eDate: '',
      eDate_expiry: '',
      min_eDate_expiry: '',
      max_eDate_expiry: '',
      errorBool: null,
      show: false,
      typeList: ['Products', 'Services'],
      rows: [
        { itemTypedPicked: '',
          itemList: [{id: 1, name: 'Option 1'}, {id: 2, name: 'Option 2'}],
          selectedItem: '',
          description: '',
          quantity: '',
          price: '',
          discount: '',
          unit: '',
          total: ''
        }
      ]
    }
  },
  methods: {
    DateValidation () {
      this.min_eDate_expiry = new Date(this.eDate)
      if (this.eDate_expiry !== '' && (new Date(this.eDate_expiry).getDate() < new Date(this.eDate).getDate() || new Date(this.eDate_expiry).getMonth() < new Date(this.eDate).getMonth() || new Date(this.eDate_expiry).getFullYear() < new Date(this.eDate).getFullYear())) {
        this.errorBool = false
        this.show = true
      } else {
        this.errorBool = null
        this.show = false
      }
    },
    expDateValidation () {
      if (this.eDate !== '' && (new Date(this.eDate_expiry).getDate() > new Date(this.eDate).getDate() || new Date(this.eDate_expiry).getMonth() > new Date(this.eDate).getMonth() || new Date(this.eDate_expiry).getFullYear() > new Date(this.eDate).getFullYear())) {
        this.errorBool = null
        this.show = false
      }
    },
    getselectedValue (index) {
      let selectedType = this.rows[index].itemTypedPicked
      axios.get('http://35.225.127.81/quotation/products/' + selectedType.toLowerCase() + '/?user=1').then((res) => {
      })
      // this.row.selected
    },
    refelectIntoLocalVar (dataArray) {
      dataArray.data.forEach(element => {
        this.customerList.push({value: element.id, text: element.customer_name})
      })
    },
    calculateTotal (index) {
      this.rows[index].total = (this.this.rows[index].price * this.this.rows[index].quantity) - this.this.rows[index].discount
    }
  }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Noto+Sans:400,700);
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,300);
@import "http://fonts.googleapis.com/css?family=Open+Sans:300,400,700";
.margBot{
  margin-bottom: 20px;
}
#titleLable{
  margin-bottom: 0;
    font-size: 25px;
    padding: 0px 17px;
}
.label{
 text-align: left;
 display: block;
 color: #666;
 font: 13px/1.55 'Open Sans', Helvetica, Arial, sans-serif;
 /* font-family: 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; */
 font-weight: 700;
 font-size: 100%;
}
.docIcon{
      position: absolute;
    height: auto;
    width: 33px;
    right: 5px;
    color: #9e9e9e;
}
.inputContainer{
  display: block;
  width: 100%;
  position: relative;
}
.text-danger {
    color: #ff6565;
}
.row{
  padding: 10px;
}
.rowInput{
      height: 34px !important;
    border: 1px solid lightgrey!important;
    border-radius: 4px;
    padding-right: 46px;
    font: 15px/23px 'Open Sans', Helvetica, Arial, sans-serif;
    color: #404040;
}
.b-form-datepicker.form-control.focus, .form-control:focus, .rowInput:focus {
    border-color: #ffc000!important;
    box-shadow: 0px 0px 3px 1px #ffc000;
}
.estimateContainer{
box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}
#eDate_expiry, #eDate{
  padding: 0 10px;
}
#eDate_expiry__value_, #eDate__value_{
  font-size: 13.9px;
}
.btn-outline-primary:not(:disabled):not(.disabled):active{
      background-color:#ffc000
}

.btn-primary:not(:disabled):not(.disabled):active, .btn-primary:not(:disabled):not(.disabled).active, .show > .btn-primary.dropdown-toggle{
  background-color: #ffc000;
    /* border-color: #005cbf; */
}
.btn-primary:not(:disabled):not(.disabled):active:focus, .btn-primary:not(:disabled):not(.disabled).active:focus, .show > .btn-primary.dropdown-toggle:focus{
  box-shadow: 0 0 0 0.2rem #ffc00085;
}
.btn-primary:not(:disabled):not(.disabled).active, .btn-primary:not(:disabled):not(.disabled):active, .show>.btn-primary.dropdown-toggle{
background-color: #ffc000;
}
.btn-outline-primary:hover{
  background-color: #ffc000;
    border-color: #ffc000;
}
.btn-outline-primary{
    color: #ffc000;
}
.btn-outline-primary:not(:disabled):not(.disabled):active:focus {
    -webkit-box-shadow: 0 0 0 0.2rem #ffc000;
    box-shadow: 0 0 0 0.2rem #ffc00085;
}
.btn-outline-primary:focus, .btn-outline-primary.focus{
  box-shadow: 0 0 0 0.2rem #ffc00085;
}
.btn-primary:focus, .btn-primary.focus{
  box-shadow: 0 0 0 0.2rem #ffc00085;
}
.btn-primary.disabled, .btn-primary:disabled{
    background-color: #ffc000;
    border-color: #ffc000;
}
.dateError{
  font-size: 12px;
  color: red;
  font-weight: 700;
}
#memotextarea{
  height:34px !important;
  transition: height 1s;
}
#memotextarea:focus{
  height: 86px !important;
}
#resp-table {
width: 100%;
display: table;
padding: 20px 0px;
}
#resp-table-caption{
display: table-caption;
text-align: center;
/* font-size: 30px; */
font-weight: bold;
}
#resp-table-header{
display: table-header-group;
background-color: gray;
font-weight: bold;
/* font-size: 25px; */
}
.table-header-cell{
display: table-cell;
padding: 10px;
text-align: center;
border-bottom: 1px solid black;
}
#resp-table-body{
display: table-row-group;
}
.resp-table-row{
display: table-row;
}
.table-body-cell{
display: table-cell;
border-radius: 4px;
padding: 15px 10px;
}
#resp-table-footer {
display: table-footer-group;
background-color: gray;
font-weight: bold;
font-size: 25px;
color: rgba(255, 255, 255, 0.45);
}
.table-footer-cell{
display: table-cell;
padding: 10px;
text-align: justify;
border-bottom: 1px solid black;
}

#resp-table #resp-table-body .itemType{
    width:10%;
  }
#resp-table #resp-table-body .description{
    width:30%;
  }
#resp-table input,#table_1  input{
    width:100%;
    padding-right: 0;
  }
#resp-table #resp-table-body .item .dropdown input{
  height: 34px;
    border: 1px solid lightgrey!important;
}
#resp-table #resp-table-body .item .dropdown input:focus, #resp-table input:focus, #table_1  input:focus{
    outline-color: #ffc000;
    outline-style: auto;
    outline-width: 2px;
  }
#resp-table #resp-table-body .dropdown .dropdown-input{
  min-width: 0px;
  max-width: 100%;
}
#resp-table #resp-table-body .dropdown .dropdown-content{
  min-width: 0px;
  max-width: 100%;
}
</style>
