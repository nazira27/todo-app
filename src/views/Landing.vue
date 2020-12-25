<template>
  <div>
    <Header></Header>
     <Users />
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/LandingPage/Header";

import Footer from "@/components/LandingPage/Footer";
import Users from "@/components/LandingPage/Users" 
export default {
  name: "Landing",
  components: {
    Users,
    Header,
    Footer,
  }
};
</script>