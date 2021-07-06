<template>
  <div>
    <b-container fluid class="card estimateContainer" id="titleConatainer">
      <b-row class="my-1">
        <label id="titleLable" class="label">Add Customers</label>
      </b-row>
    </b-container>

    <b-container fluid class="card estimateContainer" id="eDetails">
      <b-form inline v-if="show">
        <b-row class="my-1">
          <b-col sm="3">
            <label class="label">
              Name:
              <span class="text-danger">*</span>
            </label>
            <b-form-input
              class="rowInput"
              v-model="form.customer_name"
              size="md"
              id="ename"
              type="text"
              required
              placeholder="Name"
            ></b-form-input>
          </b-col>

          <b-col sm="3">
            <label class="label">Credit Allowed:</label>
            <div>
              <b-form-checkbox v-model="form.credit_allowed" name="check-button" switch size="lg">
                <!-- <b>({{ checked }})</b> -->
              </b-form-checkbox>
            </div>
          </b-col>

          <b-col sm="3">
            <label class="label">
              Customer Type
              <span class="text-danger">*</span>
            </label>
            <b-form-select
              v-model="form.customer_type"
              :options="CustomerTypeList"
              class="rowInput"
            ></b-form-select>
            <div class="mt-3">
              <strong>{{ selected }}</strong>
            </div>
          </b-col>

          <b-col sm="3">
            <label class="label">
              Customer Category
              <span class="text-danger">*</span>
            </label>

            <b-form-select
              v-model="form.customer_category"
              :options="CustomerCategoryList"
              class="rowInput"
            ></b-form-select>
            <div class="mt-3">
              <strong>{{ selected2 }}</strong>
            </div>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="3">
            <label class="label">Credit Days:</label>
            <b-form-input
              class="rowInput"
              v-model="form.credit_days"
              size="md"
              id="ename"
              type="text"
              placeholder="Contact.."
            ></b-form-input>
          </b-col>
        </b-row>

        <!-- <b-button class="row m-3" type="submit" variant="warning">Submit</b-button>
        <b-button class="row m-2" type="reset" variant="dark">Reset</b-button>-->
      </b-form>
    </b-container>

    <b-container fluid class="card estimateContainer" id="titleConatainer">
      <b-row class="my-1">
        <label id="titleLable" class="label">Add Contacts</label>
      </b-row>
    </b-container>

    <b-container fluid class="card estimateContainer margBot" id="eDetails">
      <b-row class="my-1" >
        <b-col sm="3">
          <label class="label">
            Name:
            <span class="text-danger">*</span>
          </label>
          <b-form-input
            class="rowInput"
            size="md"
            id="ename"
            type="text"
            placeholder="name"
            v-model="form.contacts_str[0].contact_name"
          ></b-form-input>
        </b-col>
        <b-col sm="3">
          <label class="label">
            Designation:
            <span class="text-danger">*</span>
          </label>

          <!-- Designation dropdown -->
          <b-form-select
            :options="DesignationList"
            class="rowInput"
            v-model="form.contacts_str[0].designation"
          ></b-form-select>
          <div class="mt-3"></div>
        </b-col>
        <b-col sm="3">
          <label class="label">
            Customer(DropDown)
            <span class="text-danger">*</span>
          </label>

          <b-form-select
            :options="CustomerList"
            class="rowInput"
            v-model="form.contacts_str[0].customer"
          ></b-form-select>
          <div class="mt-3"></div>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="6">
          <b-row v-for="(emailEle, i) in form.emails" :key="i" >
          <b-col>
            <label class="label">
              Email
              <span class="text-danger">*</span>
            </label>
            <b-form-input
              class="rowInput"
              size="md"
              id="enumber"
              type="text"
              placeholder="P.O./S.O.."
              v-model="emailEle.email"
            ></b-form-input>
          </b-col>

          <b-col>
            <label class="label">Is Primary?</label>
            <b-form-checkbox name="check-button" size="lg" v-model="emailEle.is_primary">
              <!-- <b>({{ checked }})</b> -->
            </b-form-checkbox>
          </b-col>

          <b-col sm="1">
            <b-button variant="success" @click="addEmail">Add</b-button>
          </b-col>
          <b-col>
            <b-button variant="danger" @click="delEmail(i)">Delete</b-button>
          </b-col>
          </b-row>
        </b-col>

        <b-col sm="6" >
          <b-row v-for="(phoneEle, i) in form.phones" :key="i" >
        <b-col>
          <label class="label">
            Phone
            <span class="text-danger">*</span>
          </label>
          <b-form-input class="rowInput" size="md" id="ename" type="text" placeholder="Contact.."></b-form-input>
        </b-col>

        <b-col>
          <label class="label">Is Primary?</label>
          <b-form-checkbox name="check-button" size="lg" v-model="phoneEle.is_primary">
            <!-- <b>({{ checked }})</b> -->
          </b-form-checkbox>
        </b-col>

         <b-col sm="1">
            <b-button variant="success" @click="addPhone">Add</b-button>
          </b-col>

          <b-col>
            <b-button variant="danger" @click="delPhone(i)">Delete</b-button>
          </b-col>
          </b-row>
        </b-col>

        
      </b-row>
      
    </b-container>

    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
    <!-- new added -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      checked: false, // for crdit allowed checkbox
      selected: null, // For cutomer type list
      CustomerTypeList: [],
      selected2: null, // for customer category list
      CustomerCategoryList: [],
      selected3: null,
      DesignationList: [],
      selected4: null,
      CustomerList: [],

      form: {
        customer_name: "",
        credit_allowed: false,
        customer_type: "",
        customer_category: "",
        credit_days: "",

        emails: [
          {
            email: "",
            is_primary: false
          }
        ],

        phones: [
          {
            phone: "",
            is_primary: false
          }
        ],

        contacts_str: [
          {
            contact_name: "Raghav",
            designation: 1,
            customer: 12,
            emails: [
              {
                email: "",
                is_primary: false
              }
            ],
            phones: [
              {
                phone: "",
                is_primary: false
              }
            ]
          }
        ]
      },
      show: true
    };
  },
  created() {
    axios
      .get("users/masters/", {
        headers: { Authorization: "Bearer " + this.$store.state.user.token }
      })
      .then(res => {
        console.log(res);
        if (
          res.data[2].customer_types != null &&
          res.data[2].customer_types.length > 0
        ) {
          res.data[2].customer_types.forEach(element => {
            this.CustomerTypeList.push({
              value: element.id,
              text: element.customer_type
            });
          });
        }
        if (
          res.data[1].customer_categories != null &&
          res.data[1].customer_categories.length > 0
        ) {
          res.data[1].customer_categories.forEach(element => {
            this.CustomerCategoryList.push({
              value: element.id,
              text: element.customer_category
            });
          });
        }
        if (
          res.data[3].designations != null &&
          res.data[3].designations.length > 0
        ) {
          res.data[3].designations.forEach(element => {
            this.DesignationList.push({
              value: element.id,
              text: element.designation
            });
          });
        }
      });
  },

  mounted() {
    axios
      .get("/customers/customers", {
        headers: { Authorization: "Bearer " + this.$store.state.user.token }
      })
      .then(response => {
        response.data.forEach(element =>
          this.CustomerList.push({
            value: element.id,
            text: element.customer_name
          })
        );
      });
  },

  watch: {
    isSucess(val) {
      if (val === true) {
        setTimeout(() => (this.isSucess = false), 1500);
        this.$router.go(0);
      }
    }
  },

  methods: {
    addEmail() {
      this.form.emails.push({
        email: "",
        is_primary: false
      });
    },

    addPhone(){
      this.form.phones.push({
        phone: "",
        is_primary: false
      })
    },

    delEmail(i){
      this.form.emails.splice(i,1)
    },

    delPhone(i){
      console.log(i)
      this.form.phones.splice(i,1)
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
.btn-dark,
.btn-warning {
  width: 7% !important;
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
  width: 100%;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* card css */
</style>