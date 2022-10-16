import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from "./home/home.component";
import {IconsComponent} from "./icons/icons.component";
import {LbdChartComponent} from "./lbd-chart/lbd-chart.component";
import {NotificationsComponent} from "./notifications/notifications.component";
import {TablesComponent} from "./tables/tables.component";
import {TypographyComponent} from "./typography/typography.component";
import {UserComponent} from "./user/user.component";

@NgModule({
    declarations: [
        HomeComponent,
        IconsComponent,
        LbdChartComponent,
        NotificationsComponent,
        TablesComponent,
        TypographyComponent,
        UserComponent
    ],

    imports: [
        CommonModule,
        ReactiveFormsModule,
    ]
})
export class FeaturesModule {

}
