<template>
  <div class="hello-miele">
    <div class="filter">
      Filter By
      <a-button href="javascript:;" @click="getProductsByFilter('ALL')">All</a-button>
      <a-dropdown :trigger="['click']">
        <a-button class="ant-dropdown-button" @click="e => e.preventDefault()">
          Colors <a-icon type="down" />
        </a-button>
        <a-menu slot="overlay">
          <a-menu-item v-for="(item, index) in colors" :key="index">
            <a href="javascript:;" @click="getProductsByFilter('colors', item)">{{item}}</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      
      <a-dropdown :trigger="['click']">
        <a-button class="ant-dropdown-button" @click="e => e.preventDefault()">
          Types <a-icon type="down" />
        </a-button>
        <a-menu slot="overlay">
          <a-menu-item v-for="(item, index) in types" :key="index">
            <a href="javascript:;" @click="getProductsByFilter('type', item)">{{item}}</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>

      <a-dropdown :trigger="['click']">
        <a-button class="ant-dropdown-button" @click="e => e.preventDefault()">
          Names <a-icon type="down" />
        </a-button>
        <a-menu slot="overlay">
          <a-menu-item v-for="(item, index) in names" :key="index">
            <a href="javascript:;" @click="getProductsByFilter('name', item)">{{item}}</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <div ng-if="products.length">
       <a-list :grid="{ gutter: 16, column: 4 }" :data-source="[...products]">
         <a-list-item slot="renderItem" slot-scope="item, index" :key="index" class="item-list">
           <a-card>
             <img
               slot="cover"
               :alt="item.name"
               :src="item.img"
             />
             <a-card-meta :title="item.name">
               <template slot="description">
                 <p>Type: {{item.type}}</p>
                 <p>Colors: 
                   <span class="color-badge" v-for="(i, index) in item.colors" :key="index" :style="{'background-color': i}">&nbsp;</span>
                </p>
               </template>
             </a-card-meta>
            
           </a-card>
         </a-list-item>
       </a-list>
     </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: function () {
    return {
      originalProducts: Array,
      products: Array,
      types: Array,
      names: Array,
      colors: Array,
    }
  },
  beforeMount(){
    this.GLOBAL && this.GLOBAL.fetchData((err, products) => {
      if(Array.isArray(products)) {
        this.products = products;
        this.originalProducts = products
        this.getFilterKey(products)
      } else {
        console.log(err)
      }
    });
 },
 methods: {
   getFilterKey: function(array) {
      let colors = []
      let types = []
      let names = []
      array.forEach(function(i) {
        colors.push(...i.colors)
        if (types.indexOf(i.type) === -1) {
            types.push(i.type)
        }
        if (names.indexOf(i.name) === -1) {
            names.push(i.name)
        }
      });
      this.colors = Array.from(new Set(colors))
      this.types = types
      this.names = names
   },
   getProductsByFilter: function(key, item) {
     if(key === 'ALL') {
       this.products = this.originalProducts
     } else {
        this.products = this.products.reduce(function(prev, cur) {
          if(cur[key].indexOf(item)>=0) {
            prev.push(cur)
          }
          return prev
        }, [])
     }
     this.getFilterKey(this.products)
   }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2,
.hello-miele {
  text-align:left;
}
.item-list {
  margin-top: 10px;
}
.item-list img {
  width: 100%;
  height: 280px;
  object-fit: scale-down;
}
.ant-dropdown-button {
  margin: 0 4px;
}
.color-badge {
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 1px solid #ccc;
  border-radius: 50%;
}
</style>
