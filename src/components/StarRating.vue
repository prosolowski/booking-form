<template>
    <div class="star-rating">
        <div class="stars" v-for="(item, index) in maxRate" :key="index">
            <template v-if="parseInt(rate) >= item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
            </template>
            <template v-else-if="parseInt(rate) < item && parseInt(rate) + 1 === item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524v-12.005zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z"/></svg>
            </template>
            <template v-else>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524-4.721 2.525.942-5.27-3.861-3.71 5.305-.733 2.335-4.817zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z"/></svg>
            </template>
        </div>
        <div class="reviews">
            {{reviews}}
        </div>
    </div>
</template>

<script>

export default {
  name: 'StarRating',
  props: {
    rate: Number,
    reviews: Number
  },
  data() {
      return {
        maxRate: 5
      }
  },
}
</script>

<style lang="scss" scoped>
.star-rating {
    display: flex;
    svg {
        fill: #4E9845;
        width: 0.75rem;
        height: 0.75rem;
    }
    .reviews {
        font-family: Montserrat;
        padding-left: 0.5rem;
        font-weight: bold;
        font-size: 0.75rem;
        line-height: 1.25rem;
        color: #999999;
    }
}
</style>