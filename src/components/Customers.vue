<template>
  <div class = "Customers">
    <div><Header /></div>
      <div><Sidebar /></div>

    <b-container fluid class="card estimateContainer" id="titleConatainer">
      <b-row class="my-1">
        <label id="titleLable" class="label">Customers</label>
      </b-row>
    </b-container>

<!-- Datatable simple -->
    <b-container fluid class="card CustomerList estimateContainer margBot" id="titleConatainer">
      <!-- datatable simple -->
      <b-row class="my-1 row justify-content-center" >

        <v-client-table
          :data="tableData"
          :columns="columns" 
          :options="options">
      </v-client-table>

       <button @click="showCustomerControls" id="addCustomer" class="btn btn-default btn-warning btn-raised"><i class="fa fa-plus "></i> Customer</button>

      </b-row>
    </b-container>

    <div class="editCustContainer" v-bind:style="{ display: isdisplay }">
      <editCustomers></editCustomers>
    </div>

    <!-- <div class="editConContainer" v-bind:style="{ display: isdisplay }">  
      <editContact></editContact>
    </div> -->
  </div>
  
</template>

<script>
import Sidebar from './Sidebar'
import Header from './Header'
import editCustomers from '@/components/editcustomers'
import editContact from '@/components/editcontact'

import axios from "axios"

export default {
  data() {
    return {

      isdisplay: "none",

      columns: ['id', 'customer_name', 'customer_type_str','customer_category_str', 'credit_allowed' , "credit_days"],
            tableData: [],
            options: {
                headings: {
                    id: 'ID',
                    customer_name: 'Customer Name',
                    customer_type_str: 'Customer Type',
                    customer_category_str: 'Customer Category',
                    credit_allowed: 'Credit Allowed',
                    credit_days: 'Credit Days',
                },

                sortable: ['id', 'customer_name','customer_type_str','customer_category_str', 'credit_allowed', "credit_days"],
                filterable: ['id', 'customer_name', 'customer_type_str','customer_category_str', 'credit_allowed', "credit_days"]
            }
    }
  },
  mounted() {
          axios.get('/customers/customers/',{headers:{'Authorization':'Bearer ' + this.$store.state.user.token}}).then(response => {
            this.tableData = response.data
          })
        },
        components: {
          editContact,
          editCustomers,
          Header,
          Sidebar
        },
        methods: {
          showCustomerControls(){
              this.isdisplay = "block"
          }
        }
  // mounted() {
  //         axios.get(url).then(response => {
  //           this.results = response.data
  //         })
  //       }
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Noto+Sans:400,700);
@import url(
  https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,300);
@import "http://fonts.googleapis.com/css?family=Open+Sans:300,400,700";
.margBot {
  margin-bottom: 20px;
}
#titleLable {
  margin-bottom: 0;
  font-size: 25px;
  padding: 0px 17px;
}
.label {
  text-align: left;
  display: block;
  color: #666;
  font: 13px/1.55 "Open Sans", Helvetica, Arial, sans-serif;
  /* font-family: 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; */
  font-weight: 700;
  font-size: 100%;
}
.docIcon {
  position: absolute;
  height: auto;
  width: 33px;
  right: 5px;
  color: #9e9e9e;
}
.docIcon_1 {
  right: 38px;
}
.docIcon_2 {
  right: 71px;
}
.inputContainer {
  display: block;
  width: 100%;
  position: relative;
}
.text-danger {
  color: #ff6565;
}
.row {
  padding: 10px;
}
.rowInput {
  height: 34px;
  border: 1px solid lightgrey !important;
  border-radius: 4px;
  padding-right: 46px;
  font: 15px/23px "Open Sans", Helvetica, Arial, sans-serif;
  color: #404040;
}
.rowInput:focus {
  border-color: #ffc000 !important;
  box-shadow: 0px 0px 3px 1px #ffc000;
}
.estimateContainer {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.customercard {
  height: 40px;
  background-color: white;
  padding: 5px;
  margin-bottom: 10px;
  font-family: Helvetica;
  box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.5);
}
.Customers{
  margin-top: 20px;
  margin-left: 59px;
}

.btn-dark, .btn-warning{
  width: 50px ;
  height: 50px;
  margin-left: 15px;
}

#addCustomer{
  width: 10% !important;
  margin-top: 10%;
}


/* card css */
</style>