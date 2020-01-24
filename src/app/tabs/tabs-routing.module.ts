import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      // {
      //   path: "form",
      //   children: [
      //     {
      //       path: "",
      //       loadChildren: () =>
      //         import("../pages/form/form.module").then(m => m.FormPageModule)
      //     }
      //   ]
      // },
      {
        path: "dashboard",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../pages/dashboard/dashboard.module").then(
                m => m.DashboardPageModule
              )
          }
        ]
      },
      {
        path: "vocabulary",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../pages/vocabulary/vocabulary.module").then(
                m => m.VocabularyPageModule
              )
          }
        ]
      },
      {
        path: "grammar",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../pages/grammar/grammar.module").then(
                m => m.GrammarPageModule
              )
          }
        ]
      },
      {
        path: "settings",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../pages/settings/settings.module").then(
                m => m.SettingsPageModule
              )
          }
        ]
      },
      {
        path: "",
        redirectTo: "/tabs/dashboard",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/tabs/dashboard",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
