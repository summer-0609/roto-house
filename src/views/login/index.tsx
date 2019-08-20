import { Vue, Component } from 'vue-property-decorator'
import { CreateElement } from 'vue'

import * as style from './login.module.scss'

@Component
export default class extends Vue {
  render(h: CreateElement) {
    return (
      <div class={style.wrap}>
        <h1>h111</h1>
        <h1>h222</h1>
      </div>
    )
  }
}
