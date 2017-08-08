# vue-feather-icon

Vue component for [Feather](https://feathericons.com)

## install

```shell
npm install vue-feather-icon
```

## usage

### global component
```javascript
// main.js
import Vue = from 'vue'
import VueFeatherIcon from 'vue-feather-icon'

Vue.use(VueFeatherIcon)
```

```vue
<tempalte>
  <feather-activity></feather-activity>
  <!-- or -->
  <feather-icon type="activity"></feather-icon>
</tempalte>
```


### local component

```vue
<script>
  import { Activity } from 'vue-feather-icon'

  export default {
    components: {
      ActivityIcon: Activity
    }
  }
</script>

<tempalte>
  <activity-icon></activity-icon>
</tempalte>
```
