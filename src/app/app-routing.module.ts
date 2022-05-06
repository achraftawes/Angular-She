import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPagComponent } from './components/pages/about-page/about-page.component';
import { InstructorsPageComponent } from './components/pages/instructors-page/instructors-page.component';
import { InstructorsDetailsPageComponent } from './components/pages/instructors-details-page/instructors-details-page.component';
import { EventsPageComponent } from './components/pages/events-page/events-page.component';
import { EventsDetailsPageComponent } from './components/pages/events-details-page/events-details-page.component';
import { GalleryPageComponent } from './components/pages/gallery-page/gallery-page.component';
import { FeedbackPageComponent } from './components/pages/feedback-page/feedback-page.component';
import { DonatePageComponent } from './components/pages/donate-page/donate-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { FaqPageComponent } from './components/pages/faq-page/faq-page.component';
import { ErrorPageComponent } from './components/pages/error-page/error-page.component';
import { ComingSoonPageComponent } from './components/pages/coming-soon-page/coming-soon-page.component';
import { BlogPageComponent } from './components/pages/blog-page/blog-page.component';
import { BlogDetailsPageComponent } from './components/pages/blog-details-page/blog-details-page.component';
import { ProductsDetailsPageComponent } from './components/pages/products-details-page/products-details-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { ClaimPageComponent } from './components/pages/claim-page/claim-page.component';
import { CategoryPageComponent } from './components/pages/category-page/category-page.component';
import { CoursesGridPageComponent } from './components/pages/courses-grid/courses-grid.component';
import { CoursesDetailsPageComponent } from './components/pages/courses-details-page/courses-details-page.component';
import { MyDashboardPageComponent } from './components/pages/my-dashboard-page/my-dashboard-page.component';
import { DownloadsPageComponent } from './components/pages/downloads-page/downloads-page.component';
import { EditAddressPageComponent } from './components/pages/edit-address-page/edit-address-page.component';
import { EditAccountPageComponent } from './components/pages/edit-account-page/edit-account-page.component';
import { EditBillingAddressPageComponent } from './components/pages/edit-billing-address-page/edit-billing-address-page.component';
import { EditShippingAddressPageComponent } from './components/pages/edit-shipping-address-page/edit-shipping-address-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import {AddBlogPageComponent} from './components/pages/add-blog-page/add-blog-page.component';
import {GestionBlogComponent} from './components/pages/gestion-blog/gestion-blog.component';
import {EditBlogComponent} from './components/pages/edit-blog/edit-blog.component';
import {ChatComponent} from './components/pages/chat/chat.component';

const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'about', component: AboutPagComponent},
    {path: 'instructor', component: InstructorsPageComponent},
    {path: 'single-instructor', component: InstructorsDetailsPageComponent},
    {path: 'gallery', component: GalleryPageComponent},
    {path: 'events', component: EventsPageComponent},
    {path: 'single-events', component: EventsDetailsPageComponent},
    {path: 'feedback', component: FeedbackPageComponent},
    {path: 'donate', component: DonatePageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'faqs', component: FaqPageComponent},
    {path: 'error-404', component: ErrorPageComponent},
    {path: 'coming-soon', component: ComingSoonPageComponent},
    {path: 'courses-category', component: CategoryPageComponent},
    {path: 'courses-grid', component: CoursesGridPageComponent}, // to keep
    {path: 'single-courses', component: CoursesDetailsPageComponent},
    {path: 'my-dashboard', component: MyDashboardPageComponent},
    {path: 'downloads', component: DownloadsPageComponent},
    {path: 'edit-address', component: EditAddressPageComponent},
    {path: 'edit-account', component: EditAccountPageComponent},
    {path: 'add-blog', component: AddBlogPageComponent},
    {path: 'edit-billing-address', component: EditBillingAddressPageComponent},
    {path: 'edit-shipping-address', component: EditShippingAddressPageComponent},
    {path: 'blog', component: BlogPageComponent},
    {path: 'gestion-blog', component: GestionBlogComponent},
    {path: 'single-blog/:id', component: BlogDetailsPageComponent},
    {path: 'edit-blog/:id', component: EditBlogComponent},
    {path: 'single-products', component: ProductsDetailsPageComponent},
    {path: 'cart', component: CartPageComponent},
    {path: 'checkout', component: CheckoutPageComponent},
    {path: 'claim', component: ClaimPageComponent},
    {path: 'chat', component: ChatComponent},
    // Here add new pages component

    {path: '**', component: ErrorPageComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
