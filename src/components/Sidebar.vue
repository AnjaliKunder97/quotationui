<template>

    <div class="wrapper">

      <div class="sidebar iconic">
        <ul
          class="iconic-left-sidebar-scroll"
          tabindex="5000"
          style="overflow: hidden; outline: none; height: 474px;"
        >
          <li class="has-child">
             <router-link to="/products">
              <i class="glyphicon glyphicon-shopping-cart"></i>

              <!-- This is useful for the sub-items title -->
            </router-link>

          </li>
          <li class="has-child">
             <router-link to="/customers">
              <i class="glyphicon glyphicon-user"></i>

              <!-- This is useful for the sub-items title -->
            </router-link>

          </li>
          <li class="active has-child">
             <router-link to="/quotations">
              <i class="glyphicon glyphicon-file"></i>

             </router-link>

          </li>
          <li class=" has-child">
             <router-link to="/services">
              <i class="glyphicon glyphicon-link"></i>

             </router-link>

          </li>

        </ul>
        <div
          id="ascrail2000"
          class="nicescroll-rails"
          style="width: 3px; z-index: 998; cursor: default; position: absolute; top: 0px; left: 0px; height: 474px; opacity: 0;"
        >
          <div
            style="position: relative; top: 0px; float: right; width: 3px; height: 269px; background-color: rgb(72, 71, 71); border: 0px solid rgb(255, 255, 255); background-clip: padding-box; border-radius: 0px;"
          ></div>
        </div>
      </div>

      <!-- START BOTTOM MENU SIDEBAR -->

    </div>

</template>
<script>
export default {
  props: {
    showSideBar: Boolean
  },
  components: {

  },
  computed: {
    auth () {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>
  <style scoped>
.small_content {
  margin-left: 246px;
}

.medium_content {
  margin-left: 66px;
}

@media (min-width: 768px) {
  .right-sidebar .medium_content {
    margin-left: 0px;
  }
}

.hide-app-name {
  margin-left: 1499px !important;
}

.right-sidebar .hide-app-name {
  margin-left: 0px !important;
}

.expand-header-nav {
  margin-left: -135px !important;
}

.right-sidebar .expand-header-nav {
  margin-left: -26px !important;
}
</style>
