import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'crud',
    loadChildren: () => import('../app/modules/crud/crud.module').then(
      m => m.CrudModule
    )
  }, {
    path: '',
    pathMatch: 'full',
    redirectTo: 'crud'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
