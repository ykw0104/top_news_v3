<template>
  <div class="layout-container">
    <div>顶部</div>
    <router-view />
    <div>ceb</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LayoutIndex",
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
