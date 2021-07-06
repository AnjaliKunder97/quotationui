<template>
    <div class="addcompany">
    <b-container fluid class="card estimateContainer" id="titleConatainer">
      <b-row class="my-1">
        <label id="titleLable" class="label"> Add a new Company </label>
      </b-row>
    </b-container>
    <b-container fluid class="card estimateContainer">
        <b-row class="my-1">
        <b-col sm="4">
          <label class="label">Company Name:    <span class="text-danger">*</span></label>
          <b-form-input  class="rowInput" size="md" id="cname" type="text" v-model="newCom" placeholder="Company Name.."></b-form-input>
          <b-button pill variant="warning" size="sm" block="" width="50%" @click="addCompany()">Create</b-button>
        </b-col>
        
      </b-row>
      <b-row>
        <transition name="fade" mode="out-in">
    <div v-if="isSucess" class="alert" role="alert">
      Company is successfully added!
    </div>
  </transition>
      </b-row>
    </b-container>
      
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data (){
    return{
      newCom: '',
      isSucess: false
    }
  },
   watch:{
  	isSucess(val){
      if (val===true){
        setTimeout(()=>this.isSucess=false,1500);
        this.$router.go(0);
      }
    }
  },
  methods:{
    addCompany(){
      //  this.$store.dispatch('addCom',{newcompany:this.newCom})


         axios.post('/users/new_company/', {
                    company: this.newCom
                         }, { headers: { 'Authorization': 'Bearer ' + this.$store.state.user.token 
                         } 
                })
                .then(res => {
                    console.log(res)
                    this.isSucess=true
                   
                }).catch(error => (console.log.error))
      }
  }
}
</script>
​
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Noto+Sans:400,700);
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,300);
@import "http://fonts.googleapis.com/css?family=Open+Sans:300,400,700";
.addcompany{
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
.text-danger {
    color: #ff6565;
}
.row{
  padding: 10px;
}
.rowInput{
      height: 34px;
    border: 1px solid lightgrey!important;
    border-radius: 4px;
    padding-right: 46px;
    font: 15px/23px 'Open Sans', Helvetica, Arial, sans-serif;
    color: #404040;
}
.rowInput:focus {
    border-color: #ffc000!important;
    box-shadow: 0px 0px 3px 1px #ffc000;
}
.estimateContainer{
box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}
.alert {
  background-color: lightgreen;
  padding: 15px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1.3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>