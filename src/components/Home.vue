<template>
     <div class=" theme-light-cyan">
         
        <div><Header :addCompany="addComp" @createOccured="addComp = $event"/></div>
        <div><Sidebar /></div>
        <h2 class="welcome">Welcome {{ name }}</h2>
        <!-- <Company v-if="!addComp"/> -->
        <!-- <div class="product"><Product /></div> -->
         <AddCompany v-if="addComp"/> 

    </div>
</template>

<script>
import Sidebar from './Sidebar'
import Header from './Header'
import Company from './Company'
import AddCompany from './AddCompany'
export default {
    name: 'Home',
    data() {
        return {
            welcome: 'This is your profile',
            addComp: false,
            name: ""
        }
    },
    
    components:{
        
        Sidebar,
        Header,
        Company,
        AddCompany,
    },
    mounted(){
        this.setName();
    },
    methods: {
  setName() {
    setTimeout(() =>this.name= this.$store.state.user.firstName, 1500);
  }
}

    
     
}
</script>
<style>
.h1{
    color: black;
}
.welcome{
    width: 100%;
    padding: 20px;
    background: #ECF0F5;
    margin-top: 60px;
    position: absolute;
    margin-left: 59px;
}
</style>