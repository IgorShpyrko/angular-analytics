// import { TestBed, async, inject } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { AppComponent } from './app.component';
// import { HeaderComponent } from './components/header/header.component';
// import { FooterComponent } from './components/footer/footer.component';
// import { TestAnalytic } from 'test-analytics';

// describe('AppComponent', () => {
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule,
//         HttpClientTestingModule
//       ],
//       declarations: [
//         AppComponent,
//         HeaderComponent,
//         FooterComponent,
//       ]
//     }).compileComponents();
//   }));

//   it(`should create testAnalytic service`, async(inject([TestAnalytic],
//     (_testAnalytic =  new TestAnalytic) => {
//       expect(_testAnalytic).toBeTruthy();
//   })));

//   it('should create the app', async () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   });

//   it(`should have as title 'front-analyst'`, () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app.title).toEqual('front-analyst');
//   });

//   it('should render title in a h1 tag', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('h1').textContent).toContain('Welcome to front-analyst!');
//   });
// });
