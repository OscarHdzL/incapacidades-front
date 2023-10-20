import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'edshc-gui';

  constructor(private translateService: TranslateService,
    private config: PrimeNGConfig){}

    ngOnInit(): void {
      this.translateService.setDefaultLang('es');
      this.translateService.use('es');
      this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
    }
}
