import { Vue, Component } from 'vue-property-decorator'
import { CreateElement } from 'vue'

import * as style from './home.module.scss'

@Component
export default class extends Vue {
  render(h: CreateElement) {
    return (
      <div class={style.wrap}>
        123123
      </div>
    )
  }
}
