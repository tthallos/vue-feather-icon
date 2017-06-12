# vue-feather-icon

Vue component for [Feather](https://feathericons.com)

## install

```shell
npm install vue-feather-icon
```

## usage

### global component
```javascript
const Vue = require('vue')
const VueFeatherIcon = require('vue-feather-icon')

Vue.use(VueFeatherIcon)
```

```vue
<tempalte>
  <feather-activity></feather-activity>
</tempalte>
```


### local component

```javascript
const ActivityIcon = require('vue-feather-icon/components/activity')
```

```vue
<tempalte>
  <activity-icon></activity-icon>
</tempalte>
```
