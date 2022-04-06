<template>
  <nav>
    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container px-4 px-lg-5">
        <router-link class="navbar-brand" to="#"
          ><img src="../src/assets/img/foodies.gif"
        /></router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/ProductAdd"
                >Add Product</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
            <li class="nav-item dropdown">
              <router-link
                class="nav-link dropdown-toggle"
                id="navbarDropdown"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >Shop</router-link
              >
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <router-link class="dropdown-item" to="/ProductAdd"
                    >All Products</router-link
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <router-link class="dropdown-item" to="#!"
                    >Popular Items</router-link
                  >
                </li>
                <li>
                  <router-link class="dropdown-item" to="#!"
                    >New Arrivals</router-link
                  >
                </li>
              </ul>
            </li>
          </ul>
          <form class="d-flex">
            <button
              class="btn btn-outline-dark"
              type="button"
              @click="toggleSideBar"
            >
              <i class="bi-cart-fill me-1"></i>
              Cart
              <span class="badge bg-dark text-white ms-1 rounded-pill">
                {{ totalQuantity }}</span
              >
            </button>
          </form>
        </div>
      </div>
    </nav>
    <!-- Header-->
    <div class="bg-image">
      <header class="py-5">
        <div class="container px-4 px-lg-5 my-5">
          <div class="text-center text-white">
            <h2 class="display-4 fw-bolder">Order Your Delicious Food</h2>
            <p class="lead fw-normal text-white-50 mb-0">
              From your all time favourite place
            </p>
          </div>
        </div>
      </header>
    </div>
  </nav>
  <router-view :inventory="inventory" :addToCart="addToCart" :addInv = "addInventory" />

  <SideBar
    v-if="showSideBar"
    :toggle="toggleSideBar"
    :cart="cart"
    :inventory="inventory"
    :remove="removeItem"
  />
</template>



<script>
import ProductDataService from "@/services/ProductDataService";
import SideBar from "@/components/SideBar.vue";
export default {
  components: {
    SideBar,
  },
  data() {
    return {
      showSideBar: false,
      inventory: [],
      cart: {},
    };
  },
  methods: {
    toggleSideBar() {
      this.showSideBar = !this.showSideBar;
    },
    addToCart(name, index) {
      if (!this.cart[name]) this.cart[name] = 0;
      this.cart[name] += this.inventory[index].quantity;
      this.inventory[index].quantity = 0;
      console.log(this.cart[name]);
    },
    removeItem(name) {
      delete this.cart[name];
    },
    
    addInventory(data){
      this.inventory.push(data)
    }
  },
  computed: {
    totalQuantity() {
      return Object.values(this.cart).reduce((acc, curr) => {
        return acc + curr;
      }, 0);
    },
  },
  mounted() {
    ProductDataService.getAll()
      .then((response) => {
        this.inventory = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
</script>
