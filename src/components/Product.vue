<template>
  <div>
    <b-container fluid class="card estimateContainer" id="titleConatainer">
      <b-row class="my-1">
        <label id="titleLable" class="label"> Add a Product </label>
      </b-row>
    </b-container>
    <b-container fluid class="card estimateContainer">
        <b-row class="my-1">
        <b-col sm="5">
          <label class="label">Product Name:    <span class="text-danger">*</span></label>
          <b-form-input  class="rowInput" size="md" id="pname" type="text" placeholder="Product Name.."></b-form-input>
        </b-col>
        <b-col sm="5">
          <label class="label">Product Description:    <span class="text-danger">*</span></label>
          <b-form-input  class="rowInput" size="md" id="pdescriprtion" type="text" placeholder="Product Description.."></b-form-input>
        </b-col>
        
      </b-row>
      <b-row>
          <b-col sm="3">
          <label class="label">Product Code:    <span class="text-danger">*</span></label>
          <b-form-input  class="rowInput" size="md" id="pcode" type="text" placeholder="Product Code.."></b-form-input>
        </b-col>
        <b-col sm="3">
          <label class="label">Product Selling Price:    <span class="text-danger">*</span></label>
          <b-form-input  class="rowInput" size="md" id="psell" type="text" placeholder="Product Selling Price.."></b-form-input>
        </b-col>
        <b-col sm="3">
          <label class="label">Product Cost Price:    <span class="text-danger">*</span></label>
          <b-form-input  class="rowInput" size="md" id="pcost" type="text" placeholder="Product Cost Price.."></b-form-input>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
​

​
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Noto+Sans:400,700);
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,300);
@import "http://fonts.googleapis.com/css?family=Open+Sans:300,400,700";
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
</style>