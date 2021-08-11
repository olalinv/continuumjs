import { Constant } from '../continuum/constant.js'
import { MainLayoutComponent } from '../shared/components/main-layout/main-layout.component.js'
import { PostIndexComponent } from '../modules/post/components/post-index/post-index.component.js'
import { PostDetailComponent } from '../modules/post/components/post-detail/post-detail.component.js'
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component.js'
import { PostCreateComponent } from '../modules/post/components/post-create/post-create.component.js'

export const routerConfig = {
  layout: MainLayoutComponent,
  routes: [
    {
      path: '',
      component: PostIndexComponent
    },
    {
      path: 'post/create',
      component: PostCreateComponent
    },
    {
      path: 'posts',
      component: PostIndexComponent
    },
    {
      path: 'posts/:id',
      component: PostDetailComponent
    },
    {
      path: 'error/404',
      component: PageNotFoundComponent,
      type: Constant.ERROR_404
    }
  ]
}
