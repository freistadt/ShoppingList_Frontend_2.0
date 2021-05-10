import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcomponentConnectionSpringBootComponent } from './testcomponent-connection-spring-boot.component';

describe('TestcomponentConnectionSpringBootComponent', () => {
  let component: TestcomponentConnectionSpringBootComponent;
  let fixture: ComponentFixture<TestcomponentConnectionSpringBootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestcomponentConnectionSpringBootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcomponentConnectionSpringBootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
