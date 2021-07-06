<template>
  <div class="card" style = "width: 800px">
    <div class="ml-2">
    <h2 align = "center">Add Contact</h2>
    
    <b-form inline @submit="onSubmit" @reset="onReset" v-if="show" class="m-5" style="width: 700px;">

      <b-form-group class="col-md-4" id="input-group-1" label="Contact Name:" label-for="input-1">
        <b-form-input id="input-1" v-model="form.contact_name" required placeholder="Contact Name"></b-form-input>
      </b-form-group>

      <b-form-group class="col-md-4" id="input-group-2" label="Designation:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.designation" required placeholder="Designation"></b-form-input>
      </b-form-group>

      <b-form-group class="col-md-4" id="input-group-3" label="Customer:" label-for="input-3">
        <b-form-input id="input-3" v-model="form.customer" required placeholder="Customer"></b-form-input>
      </b-form-group>

      <b-button class="row m-3" type="submit" variant="warning">Submit</b-button>
      <b-button class="row m-2" type="reset" variant="dark">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
    return {
      form: {
        contact_name: "",
        designation: "",
        customer: "",
      },
      show: true,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
      axios.post('http://35.225.127.81/quotation/customers/contacts/?user=1',this.form)
      .then(console.log(Response))
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.contact_name = "",
        this.form.designation = "",
        this.form.customer =  "",
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
}
</script>

<style>
  .form-control:focus {
  border-color: #d0e462 !important;
  box-shadow: 0 0 5px rgba(255, 255, 0, 1) !important;
}
</style>
