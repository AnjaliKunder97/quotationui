<template>
  <div class="container  py-5">
    <div class="row">
      <div class="col-md-5 mx-auto">
        <div class="myform">
          
            <div class="logo mb-3">
              <div class="col-md-12 text-center">
                <h1>Register Now</h1>
              </div>
            </div>
            <form action="#" @submit.prevent="onSubmit" name="registration ">
                <h4 style="text">Your Details</h4>
               <div class="form-group row">
                  <div class="col-sm-6"><label for="exampleInputEmail1">Username</label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    v-model="username"
                    placeholder="Enter username"
                  /></div>
                
                <div class="col-sm-6">
                  <label for="exampleInputEmail1">Password</label>
                  <input
                    type="password"
                    id="password"
                    class="form-control"
                    v-model="password"
                    placeholder="Enter Password"
                  />
                </div></div>
              <div>
                <div class="form-group row">
                  <div class="col-sm-6"><label for="exampleInputEmail1">First Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="firstname"
                    v-model="firstName"
                    placeholder="Enter First Name"
                  />
                </div>
                <div class="col-sm-6">
                  <label for="exampleInputEmail1">Last Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="lastname"
                    v-model="lastName"
                    placeholder="Enter Last Name"
                  />
                </div>
                </div>
                <div class="form-group row">
                  <div class="col-sm-6"><label for="exampleInputEmail1">Email Address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="email"
                    placeholder="Enter Email"
                  />
                </div>
                <div class="col-sm-6">
                  <label for="exampleInputEmail1">Phone Number</label>
                  <input
                    type="text"
                    id="phone"
                    class="form-control"
                    v-model="phoneNumber"
                    placeholder="Enter Phone Number"
                  /></div>
              
              </div>
               <hr>
              <div>
                <h4>Company Details</h4>
                <div class="form-group row">
                  <div class="col-sm-6">
                  <label for="exampleInputEmail1">Company Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="companyname"
                    v-model="companyName"
                    placeholder="Enter Company Name"
                  />
                </div></div>
              </div>
               </div>
                <div class="col-md-12 text-center mb-3">
                  <button
                    type="submit"
                    class="btn mybtn btn-primary tx-tfm"
                  >Register</button>
                </div>
              <div class="col-md-12">
                <div class="form-group">
                  <p class="text-center">
                    <a href="#" id="signin"><router-link to='/'>Already have an account?</router-link></a>
                  </p>
                </div>
              </div>
            </form>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      username: "",
      email: "",
      password: "",
      companyName: ""
    };
  },
  computed:{
       auth(){
          return this.$store.getters.isAuthenticated
       }
    },
  methods: {
    onSubmit() {
      
      this.$store.dispatch("signup", {
         username: this.username,
         password: this.password,
         companyName: this.companyName,
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        email: this.email,
      });
      
       this.$router.push('/home')}
    
  }
};
</script>

<style>
body {
  padding-top: 4.2rem;
  padding-bottom: 4.2rem;
  background: beige;
}
a {
  text-decoration: none !important;
}
h1,
h2,
h3,h4 {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.myform {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  padding: 1rem;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 1.1rem;
  outline: 0;
  max-width: 500px;
  text-align: left;
}
.tx-tfm {
  text-transform: uppercase;
}
.mybtn {
  border-radius: 50px;
}

.login-or {
  position: relative;
  color: #aaa;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.span-or {
  display: block;
  position: absolute;
  left: 50%;
  top: -2px;
  margin-left: -25px;
  background-color: #fff;
  width: 50px;
  text-align: center;
}
.hr-or {
  height: 1px;
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}
.google {
  color: #666;
  width: 100%;
  height: 40px;
  text-align: center;
  outline: none;
  border: 1px solid lightgrey;
}
form .error {
  color: #ff0000;
}
/* #second{display:none;} */
</style>