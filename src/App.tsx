import { Vue, Component } from 'vue-property-decorator'
import { CreateElement } from 'vue'
@Component
export default class extends Vue {
  render(h: CreateElement) {
    return (
      <div id="app">
        <router-view/>
      </div>
    )
  }
}

{/* <template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  -webkit-text-size-adjust: 100% !important;
}

html.has-full body {
  -webkit-overflow-scrolling: touch;
  overflow: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style> */}
