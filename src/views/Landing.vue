<template>
  <div>
    <Header></Header>
    <Users />
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Users from "@/components/Users";

export default {
  name: "Landing",
  components: {
    Users,
    Header,
    Footer,
  },
};
</script>
