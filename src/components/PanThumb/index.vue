<script setup lang="ts">
import { defineComponent } from "vue"

defineProps({
  image: {
    type: String,
    required: true
  },
  zIndex: {
    type: Number,
    default: 1
  },
  width: {
    type: String,
    default: '150px'
  },
  height: {
    type: String,
    default: '150px'
  }
})

</script>

<script lang="ts">
export default defineComponent({
  name: 'PanThumb',
})
</script>

<template>
  <div class="pan-item" :style="{ zIndex: zIndex, height: height, width: width }">
    <div class="pan-info">
      <div class="pan-info-roles-container">
        <slot />
      </div>
    </div>
    <div class="pan-thumb" :style="{ backgroundImage: `url(${image})` }"></div>
  </div>
</template>

<style lang="scss" scoped>
.pan-item {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  cursor: default;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  .pan-info {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);

    .pan-info-roles-container {
      padding: 20px;
      text-align: center;
    }
  }

  .pan-thumb {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    transition: all 0.3s ease-in-out;
    transform-origin: 95% 40%;
  }
}

.pan-item:hover .pan-thumb {
  transform: rotate(-110deg);
}
</style>
