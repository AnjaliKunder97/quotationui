<template>
<div class="company">
  <b-container fluid class="card companyContainer" id="titleConatainer">
      <b-row class="my-3">
        <label id="titleLable" class="label">Your Companies</label>
        <!-- <a href="#" class="btn btn-primary" v-on:click='addCompany'>Create new Company</a>  -->
      </b-row>
    </b-container>
   <b-container fluid class="card companyContainer">
  
  
    <b-row v-for="(item, index) in companies" :key="index">
    <ul id="example-2">
    <li >
    {{ item.company_name.toUpperCase() }}
    </li>
    
</ul>
    <!-- <a href="#" class="btn btn-primary" v-on:click='addCompany'>Create new Company</a> -->
  
    </b-row>
   </b-container>
</div>
</template>
<script>
import Sidebar from './Sidebar'
import axios from 'axios'
export default {
    name:'Company',
    data(){
      return{
        companies: [],
      }
    },
    components:{
      Sidebar
    },
    mounted(){
        this.companies=this.$store.getters.sendCompanies
      },
      created(){
      },
    methods:{
      addCompany(){
        this.$store.dispatch('addCom',{newcompany:"Tata"})
        this.companies=this.$store.getters.sendCompanies
      }
    }
}
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Noto+Sans:400,700);
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,300);
@import "http://fonts.googleapis.com/css?family=Open+Sans:300,400,700";
@import 'bootstrap/dist/css/bootstrap.css';
@import 'bootstrap-vue/dist/bootstrap-vue.css';

.company{
  width: 100%;
    padding: 20px;
    background: #ECF0F5;
    margin-top: 59px;
    position: absolute;
    margin-left: 59px;
}
#titleConatainer{
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
.rowInput{
    height: 34px;
    border: 1px solid lightgrey!important;
    border-radius: 4px;
    padding-right: 46px;
    font: 15px/23px 'Open Sans', Helvetica, Arial, sans-serif;
    color: #404040;
}
.example-2 li{
  font: 15px/23px 'Open Sans', Helvetica, Arial, sans-serif;
}
.companyContainer{
box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}
</style>