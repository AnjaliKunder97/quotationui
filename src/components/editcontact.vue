<template>
  <div class="Customers">
    <b-container fluid class="card estimateContainer" id="titleConatainer">
      <b-row class="my-1">
        <label id="titleLable" class="label">Add Contact</label>
      </b-row>
    </b-container>

    <b-container fluid class="card estimateContainer margBot" id="eDetails">
      <b-row class="my-1">
        <b-col sm="3">
          <label class="label">
            Name:
            <span class="text-danger">*</span>
          </label>
          <b-form-input class="rowInput" size="md" id="ename" type="text" placeholder="name"></b-form-input>
        </b-col>
        <b-col sm="3">
          <label class="label">
            Designation:
            <span class="text-danger">*</span>
          </label>

          <!-- Designation dropdown -->
          <b-form-select v-model="selected1" :options="DesignationList" class="rowInput"></b-form-select>
          <div class="mt-3">
            Selected:
            <strong>{{ selected1 }}</strong>
          </div>

        </b-col>
        <b-col sm="3">
          <label class="label">
            Customer(DropDown)
            <span class="text-danger">*</span>
          </label>

          <b-form-select v-model="selected2" :options="CustomerList" class="rowInput"></b-form-select>
          <div class="mt-3">
            Selected:
            <strong>{{ selected2 }}</strong>
          </div>

        </b-col>
        
      </b-row>
      <b-row class="my-1" v-for='(contactEle, i) in contact' :key='i'>
        <b-col sm="3">
          <label class="label">
            Email(primary)
            <span class="text-danger">*</span>
          </label>
          <b-form-input
            class="rowInput"
            size="md"
            id="enumber"
            type="text"
            placeholder="P.O./S.O.."
            v-model="contactEle.email"
          ></b-form-input>
        </b-col>
        
        <b-col sm="3">
          <label class="label">
            Phone(primary)
            <span class="text-danger">*</span>
          </label>
          <b-form-input class="rowInput" size="md" id="ename" type="text" placeholder="Contact.."
          v-model="contactEle.phone"></b-form-input>
        </b-col>

        <b-col sm="3">
          <input type="checkbox" id="checkbox" v-model="contactEle.is_primary">

          <input type="button" class="btn btn-default btn-warning buttonDefSize btn-raised" id="btnAdd" value="add" @click='delContactMore(i)'>
        </b-col>
        
        
      </b-row>
      <b-row class="my-1">
        <input type="button" class="btn btn-default btn-warning buttonDefSize btn-raised" id="btnsubmit" value="Save">
        <input type="button" class="btn btn-default btn-warning buttonDefSize btn-raised" id="btnAdd" value="add" @click='addContactMore'>
      </b-row>

      
    </b-container>
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      selected1: null, // For cutomer type list
      DesignationList: this.getDesignationList(),

      selected2: null, // for customer category list
      CustomerList: this.getCustomerList(),

      contact: [{
        email: '',
        phone: '',
        is_primary: false
      }]
    }
  },
  methods:{

    getDesignationList(){
      const itemList=[]
        this.$store.state.master[3].designations.forEach(
            element=>{
                itemList.push({
                    value: element.id,
                    text:element.designation
                })
            }
        )
        return itemList;
    },
    getCustomerList(){
      const itemList=[]
      axios.get("http://35.225.127.81/quotation/customers/customers/?user=1").then(res=>{
        console.log(res)
        res.data.forEach(element=>itemList.push({
          value: element.id,
          text:element.customer_name
        }))
      })
      return itemList
    },

    addContactMore(){
      this.contact.push({
        email: '',
        phone: '',
        is_primary: false
      });
    },
    delContactMore(i){
      console.log(i)
      this.contact.splice(i,1)
    }
  }
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Noto+Sans:400,700);
@import url(
  https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,300
);
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
/* card css */
</style>