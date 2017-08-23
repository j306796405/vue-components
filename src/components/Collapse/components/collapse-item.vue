<template>
  <div class="vm-collapse-item" :class="{'is-active': isActive}">
    <div class="vm-collapse-item__header"
         @click="handleClick('header')"
    >
      <slot name="header">
        <i class="vm-collapse-item__header__arrow vm-collapse-icon--arrow-right"></i>
        <slot name="title">{{title}}</slot>
      </slot>
    </div>
    <CollapseTransition>
      <div class="vm-collapse-item__wrap" v-show="isActive">
        <div class="vm-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </CollapseTransition>
  </div>
</template>

<script>
  import CollapseTransition from './collapse-transition'

  export default {
    name: 'VmCollapseItem',
    componentName: 'VmCollapseItem',
    components: {
      CollapseTransition
    },
    data(){
      return {

      }
    },
    props: {
      title: String,
      name: {
        type: [String, Number],
        default () {
          return this._uid
        }
      }
    },

    computed: {
      isActive () {
        return this.$parent.activeNames.indexOf(this.name) > -1
      },
      closable () {
        let parent = this.findParentComponentByName('VmCollapse')
        return parent && parent.closable
      },
      remain () {
        let parent = this.findParentComponentByName('VmCollapse')
        return parent && parent.remain
      },
    },
    methods: {
      dispatch (componentName, eventName, params) {
        let parent = this.findParentComponentByName(componentName)
        if (parent) {
          parent.$emit.apply(parent, [eventName].concat(params))
        }
      },
      handleClick (block) {
        // 展开数量
        let expandQuantity = this.$parent.activeNames.length

        if(this.remain && expandQuantity >= this.remain && this.isActive && !this.closable){
          return
        }

        this.dispatch('VmCollapse', 'item-click', this)
      },
      //可能有多个父组件，需要循环判断父组件的componentName
      findParentComponentByName (componentName) {
        let parent = this.$parent || this.$root
        let name = parent.$options.componentName

        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent

          if (parent) {
            name = parent.$options.componentName
          }
        }

        return parent
      }
    }
  }
</script>