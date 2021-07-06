<template>
  <div >
    <b-container fluid class="card estimateContainer" id="titleConatainer">
      <b-row class="my-1">
        <label id="titleLable" class="label">Add Service</label>
      </b-row>
    </b-container>

    <b-container fluid class="card estimateContainer" id="eDetails">

     <b-form inline @submit="onSubmit" @reset="onReset" v-if="show"> 

      <b-row class="my-1">
        <b-col sm="3">
          <label class="label">
            Service Code:
            <span class="text-danger">*</span>
          </label>
          <b-form-input class="rowInput " v-model="form.service_code" size="md" id="ename" type="text" required placeholder="Service Code"></b-form-input>
        </b-col>

        <b-col sm="3">
          <label class="label">
            Description:
            <span class="text-danger">*</span>
          </label>
          <b-form-input class="rowInput " v-model="form.description" size="md" id="ename" type="text" required placeholder="Description"></b-form-input>
        </b-col>
    
        <b-col sm="3">
          <label class="label">
            Service Category
            <span class="text-danger">*</span>
          </label>

          <b-form-select v-model="form.category" :options="ServiceCategoryList" required class="rowInput"></b-form-select>
          <div class="mt-3">
            <strong>{{ selected }}</strong>
          </div>
        </b-col>
      </b-row>

      <b-row class="my-1">
          <b-col sm="3">

          <label class="label ">Allow Sell:</label>
          <div>
            <b-form-checkbox v-model="form.allow_sell" name="check-button" switch size="lg">
              <!-- <b>({{ checked }})</b> -->
            </b-form-checkbox>
          </div>
          </b-col>
          <b-col v-if="form.allow_sell" sm="3">
          <label class="label">
            Selling Price:
          </label>
          <b-form-input class="rowInput " v-model="form.selling_price" size="md" id="ename" type="text" required placeholder="Selling Price">
          </b-form-input>
        </b-col>
          
        </b-row>

            <b-row class="my-1">
                <b-button class="row m-3" type="submit" variant="warning">Submit</b-button>
                <b-button class="row m-2" type="reset" variant="dark">Reset</b-button>
            </b-row>
       </b-form>
       <b-row>
          <transition name="fade" mode="out-in">
    <div v-if="isSucess" class="alert" role="alert">
      Service is successfully added!
    </div>
  </transition>
       </b-row>
    </b-container>

    

    
    

        

    <!-- new added -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      sellchecked: false, // for sell allowed checkbox
     selected: null, // For product category list
      ServiceCategoryList: [],
       

    form: {
        service_code:"",
        description: "",
        allow_sell: false,
        selling_price: "",
        category: "",
      },
      show: true,
      isSucess:false
    };
  },
  created(){
     axios.get('users/masters/',{headers:{'Authorization':"Bearer "+this.$store.state.user.token}}).then(res=>{
       console.log(res)
       if(res.data[4].service_categories!=null && res.data[4].service_categories.length>0){
         res.data[4].service_categories.forEach(
           element=>{
             this.ServiceCategoryList.push({
               value: element.id,
                    text:element.service_category
             })
           }
         )
       }
       
     })
   } ,  
   watch:{
  	isSucess(val){
      if (val===true){
        setTimeout(()=>this.isSucess=false,1500);
        this.$router.go(0);
      }
    }
  },
  methods: {
      getCategories(){
            const itemList=[]
            console.log("this.$store.state.master[4].service_categories",this.$store.state.master[4].service_categories)
            if(this.$store.state.master[4].service_categories!=null && this.$store.state.master[4].service_categories.length>0)
        {this.$store.state.master[4].service_categories.forEach(
            element=>{
                itemList.push({
                    value: element.id,
                    text:element.service_category
                })
            }
        )}
        return itemList;
    },
    
    onSubmit(evt) {
      evt.preventDefault();
      const data={
          "service_code": this.form.service_code,
          "description": this.form.description,
          "category": this.form.category,
          "unit": this.form.unit,
          "selling_price": Number(this.form.selling_price),
        "allow_sell":this.form.allow_sell
      }
      console.log(data)
      alert(JSON.stringify(this.form));
      axios.post('/products/services/',
      data,
      {headers:{'Authorization':'Bearer ' + this.$store.state.user.token}})
       .then(res=>{
        console.log(res)
        this.isSucess=true
        this.show=false

        }).catch(error => (console.log(error)))
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.item_code="",
      this.form.description = "",
        this.form.allow_sell = false,
        this.form.category =  "",
        this.selling_price="",
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
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
  display: block !important;
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
.btn-dark, .btn-warning{
  width:7% !important;
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
  width: 100%
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

/* card css */
</style>