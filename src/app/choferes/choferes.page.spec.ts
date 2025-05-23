import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChofersPage } from './choferes.page';

describe('ChoferesPage', () => {
  let component: ChofersPage;
  let fixture: ComponentFixture<ChofersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChofersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
