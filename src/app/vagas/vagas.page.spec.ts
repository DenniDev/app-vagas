import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VagasPage } from './vagas.page';

describe('VagasPage', () => {
  let component: VagasPage;
  let fixture: ComponentFixture<VagasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VagasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VagasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
