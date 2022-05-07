import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CarouselModule } from "ngx-owl-carousel-o";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CountUpModule } from "ngx-countup";
import { TabsModule } from "ngx-tabset";
import { NgxScrollTopModule } from "ngx-scrolltop";
import { StickyNavModule } from "ng2-sticky-nav";
import { LightboxModule } from "ngx-lightbox";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AccordionModule } from "ngx-accordion";
import { LightgalleryModule } from "lightgallery/angular";
import {
    HttpClient,
    HttpClientModule,
    HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { MarkdownModule, MarkedOptions } from "ngx-markdown";
import { LMarkdownEditorModule } from "ngx-markdown-editor";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgPipesModule } from "ngx-pipes";
import { NgChatModule } from "ng-chat";
import {
    InjectableRxStompConfig,
    RxStompService,
    rxStompServiceFactory,
} from "@stomp/ng2-stompjs";
import { NgxsModule } from "@ngxs/store";
import { NgChartsModule } from "ng2-charts";

import { AppRoutingModule } from "./app-routing.module";
import { environment } from "src/environments/environment";
import { BaseUrlInterceptor } from "./config/config.service";

import { AppComponent } from "./app.component";
import { FooterComponent } from "./components/common/footer/footer.component";
import { FunfactsComponent } from "./components/common/funfacts/funfacts.component";
import { PartnerStyleOneComponent } from "./components/common/partner-style-one/partner-style-one.component";
import { InstructorsStyleOneComponent } from "./components/common/instructors-style-one/instructors-style-one.component";
import { BecomeInstructorPartnerComponent } from "./components/common/become-instructor-partner/become-instructor-partner.component";
import { FeedbackStyleOneComponent } from "./components/common/feedback-style-one/feedback-style-one.component";
import { OurMissionComponent } from "./components/common/our-mission/our-mission.component";
import { StudentsFeedbackFormComponent } from "./components/common/students-feedback-form/students-feedback-form.component";
import { PartnerStyleTwoComponent } from "./components/common/partner-style-two/partner-style-two.component";
import { FeedbackFormComponent } from "./components/common/feedback-form/feedback-form.component";
import { FeedbackStyleTwoComponent } from "./components/common/feedback-style-two/feedback-style-two.component";
import { AddDescriptionComponent } from "./components/common/add-description/add-description.component";
import { AddSectionComponent } from "./components/common/add-section/add-section.component";
import { AddLessonComponent } from "./components/common/add-lesson/add-lesson.component";
import { AboutPagComponent } from "./components/pages/about-page/about-page.component";
import { OurStoryComponent } from "./components/common/our-story/our-story.component";
import { OurValuesComponent } from "./components/common/our-values/our-values.component";
import { InstructorsPageComponent } from "./components/pages/instructors-page/instructors-page.component";
import { InstructorsDetailsPageComponent } from "./components/pages/instructors-details-page/instructors-details-page.component";
import { GalleryPageComponent } from "./components/pages/gallery-page/gallery-page.component";
import { EventsPageComponent } from "./components/pages/events-page/events-page.component";
import { EventsDetailsPageComponent } from "./components/pages/events-details-page/events-details-page.component";
import { FeedbackPageComponent } from "./components/pages/feedback-page/feedback-page.component";
import { DonatePageComponent } from "./components/pages/donate-page/donate-page.component";
import { LoginPageComponent } from "./components/pages/login-page/login-page.component";
import { RegisterPageComponent } from "./components/pages/register-page/register-page.component";
import { FaqPageComponent } from "./components/pages/faq-page/faq-page.component";
import { ErrorPageComponent } from "./components/pages/error-page/error-page.component";
import { ComingSoonPageComponent } from "./components/pages/coming-soon-page/coming-soon-page.component";
import { BlogPageComponent } from "./components/pages/blog-page/blog-page.component";
import { BlogDetailsPageComponent } from "./components/pages/blog-details-page/blog-details-page.component";
import { ProductsDetailsPageComponent } from "./components/pages/products-details-page/products-details-page.component";
import { CartPageComponent } from "./components/pages/cart-page/cart-page.component";
import { CheckoutPageComponent } from "./components/pages/checkout-page/checkout-page.component";
import { ClaimPageComponent } from "./components/pages/claim-page/claim-page.component";
import { CategoryPageComponent } from "./components/pages/category-page/category-page.component";
import { CoursesGridPageComponent } from "./components/pages/courses-grid/courses-grid.component";
import { CoursesDetailsPageComponent } from "./components/pages/courses-details-page/courses-details-page.component";
import { MyDashboardPageComponent } from "./components/pages/my-dashboard-page/my-dashboard-page.component";
import { DownloadsPageComponent } from "./components/pages/downloads-page/downloads-page.component";
import { EditAddressPageComponent } from "./components/pages/edit-address-page/edit-address-page.component";
import { EditAccountPageComponent } from "./components/pages/edit-account-page/edit-account-page.component";
import { EditBillingAddressPageComponent } from "./components/pages/edit-billing-address-page/edit-billing-address-page.component";
import { EditShippingAddressPageComponent } from "./components/pages/edit-shipping-address-page/edit-shipping-address-page.component";
import { HomeBlogComponent } from "./components/pages/home-page/home-blog/home-blog.component";
import { HomeEventsComponent } from "./components/pages/home-page/home-events/home-events.component";
import { HomeCoursesComponent } from "./components/pages/home-page/home-courses/home-courses.component";
import { HeaderStyleComponent } from "./components/common/header-style/header-style.component";
import { HomePageComponent } from "./components/pages/home-page/home-page.component";
import { LanguageSubscribeComponent } from "./components/common/language-subscribe/language-subscribe.component";
import { FreeTrialComponent } from "./components/common/free-trial/free-trial.component";
import { HowToApplyComponent } from "./components/common/how-to-apply/how-to-apply.component";
import { StudentsFeedbackComponent } from "./components/common/students-feedback/students-feedback.component";
import { FunfactsStyleTwoComponent } from "./components/common/funfacts-style-two/funfacts-style-two.component";
import { WhyChooseUsComponent } from "./components/common/why-choose-us/why-choose-us.component";
import { HomeMainBannerComponent } from "./components/pages/home-page/home-main-banner/home-main-banner.component";
import { LanguageCategoryComponent } from "./components/common/language-category/language-category.component";
import { FreeTrialFormComponent } from "./components/common/free-trial-form/free-trial-form.component";
import { CourseCreationPageComponent } from "./components/pages/course-creation/courses-creation-page.component";
import { CourseCreationModalComponent } from "./components/common/course-creation-modal/course-creation-modal.component";
import { CertificatePageComponent } from "./components/pages/certificate-page/certificate-page.component";
import { AddQuestionComponent } from "./components/common/add-question/add-question.component";
import { AuthInterceptor } from "./services/authinterceptor.service";
import { ChatComponent } from "./components/common/chat/chat.component";
import { myRxStompConfig } from "./config/stomp.config";
import { EditTrainingComponent } from "./components/pages/edit-training/edit-training.component";
import { EditOrAddTrainingComponent } from "./components/common/edit-or-add-training/edit-or-add-training.component";
import { States } from "./store";
import { TrainingStatsComponent } from "./components/pages/training-stats/training-stats.component";
import { PieChartComponent } from "./components/common/pie-chart/pie-chart.component";

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        FunfactsComponent,
        AddDescriptionComponent,
        AddSectionComponent,
        AddLessonComponent,
        CertificatePageComponent,
        PartnerStyleOneComponent,
        InstructorsStyleOneComponent,
        BecomeInstructorPartnerComponent,
        FeedbackStyleOneComponent,
        OurMissionComponent,
        StudentsFeedbackFormComponent,
        PartnerStyleTwoComponent,
        FeedbackFormComponent,
        FeedbackStyleTwoComponent,
        CourseCreationModalComponent,
        AboutPagComponent,
        OurStoryComponent,
        OurValuesComponent,
        InstructorsPageComponent,
        InstructorsDetailsPageComponent,
        GalleryPageComponent,
        EventsPageComponent,
        EventsDetailsPageComponent,
        FeedbackPageComponent,
        DonatePageComponent,
        LoginPageComponent,
        RegisterPageComponent,
        FaqPageComponent,
        ErrorPageComponent,
        ComingSoonPageComponent,
        BlogPageComponent,
        BlogDetailsPageComponent,
        ProductsDetailsPageComponent,
        CartPageComponent,
        CheckoutPageComponent,
        ClaimPageComponent,
        CategoryPageComponent,
        CoursesGridPageComponent,
        CoursesDetailsPageComponent,
        MyDashboardPageComponent,
        DownloadsPageComponent,
        EditAddressPageComponent,
        EditAccountPageComponent,
        EditBillingAddressPageComponent,
        EditShippingAddressPageComponent,
        HomeBlogComponent,
        HomeEventsComponent,
        HomeCoursesComponent,
        HeaderStyleComponent,
        HomePageComponent,
        LanguageSubscribeComponent,
        FreeTrialComponent,
        HowToApplyComponent,
        StudentsFeedbackComponent,
        FunfactsStyleTwoComponent,
        WhyChooseUsComponent,
        HomeMainBannerComponent,
        LanguageCategoryComponent,
        FreeTrialFormComponent,
        CourseCreationPageComponent,
        AddQuestionComponent,
        ChatComponent,
        EditTrainingComponent,
        EditOrAddTrainingComponent,
        TrainingStatsComponent,
        PieChartComponent,
    ],
    imports: [
        NgPipesModule,
        MarkdownModule.forRoot({
            loader: HttpClient,
            markedOptions: {
                provide: MarkedOptions,
                useValue: {
                    gfm: true,
                    breaks: false,
                    pedantic: false,
                    smartLists: true,
                    smartypants: false,
                },
            },
        }),
        NgbModule,
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CarouselModule,
        CountUpModule,
        TabsModule,
        NgxScrollTopModule,
        StickyNavModule,
        LightboxModule,
        ReactiveFormsModule,
        FormsModule,
        AccordionModule,
        LightgalleryModule,
        LMarkdownEditorModule,
        NgChatModule,
        NgxsModule.forRoot(States, {
            developmentMode: !environment.production,
        }),
        NgChartsModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BaseUrlInterceptor,
            multi: true,
        },
        { provide: "BASE_API_URL", useValue: environment.apiUrl },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        {
            provide: InjectableRxStompConfig,
            useValue: myRxStompConfig,
        },
        {
            provide: RxStompService,
            useFactory: rxStompServiceFactory,
            deps: [InjectableRxStompConfig],
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
