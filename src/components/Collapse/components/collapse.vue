<template>
  <div class="vm-collapse">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'VmCollapse',
    componentName: 'VmCollapse',
    props: {
      //手风琴效果，只可打开一个
      accordion: Boolean,
      closable: {
        type: Boolean,
        default (){
          return true
        }
      },
      remain: {
        type: Number,
        default: 0
      },
      value: {
        type: [Array, String, Number],
        default () {
          return []
        }
      }
    },
    data () {
      return {
        activeNames: [].concat(this.value)
      }
    },
    watch: {
      value (value) {
        this.activeNames = [].concat(value)
      }
    },
    computed: {},
    methods: {
      setActiveNames (activeNames) {
        activeNames = [].concat(activeNames)
        this.activeNames = activeNames
        /* 这是干嘛的，费解 */
//        this.$emit('input', value)
//        this.$emit('change', value)
      },
      handleItemClick (item) {
        let activeNames = this.activeNames.slice(0),
            name = item.name
        //返回一个新的数组
        let index = activeNames.indexOf(item.name)

        if (this.accordion) {
          activeNames = (this.activeNames[0] === name) ? '' : name
          return this.setActiveNames(activeNames)
        }

        if (index > -1) {
          activeNames.splice(index, 1)
        } else {
          activeNames.push(name)

          if (this.remain && activeNames.length > this.remain) {
            activeNames.shift()
          }
        }
        this.setActiveNames(activeNames)
      }
    },
    created(){
      this.$on('item-click', this.handleItemClick)
    }
  }
</script>