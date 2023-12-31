import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert, AlertType } from 'src/app/models/alert/alert';
import { AlertService } from 'src/app/services/common/alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription: Subscription;
  routeSubscription: Subscription;

  constructor(private router: Router, private alertService: AlertService) { }

  ngOnInit() {
      this.alertSubscription = this.alertService.onAlert(this.id)
          .subscribe(alert => {
              if (!alert.message) {
                  this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);
                  this.alerts.forEach(x => delete x.keepAfterRouteChange);
                  return;
              }

              this.alerts.push(alert);

              if (alert.autoClose) {
                  setTimeout(() => this.removeAlert(alert), 5000);
              }
         });

      this.routeSubscription = this.router.events.subscribe(event => {
          if (event instanceof NavigationStart) {
              this.alertService.clear(this.id);
          }
      });
  }

  ngOnDestroy() {
      this.alertSubscription.unsubscribe();
      this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
      if (!this.alerts.includes(alert)) return;

      if (this.fade) {
          this.alerts.find(x => x === alert).fade = true;

          setTimeout(() => {
              this.alerts = this.alerts.filter(x => x !== alert);
          }, 250);
      } else {
          this.alerts = this.alerts.filter(x => x !== alert);
      }
  }

  cssClass(alert: Alert) {
      if (!alert) return;

      const classes = ['alert', 'alert-dismissable'];
              
      const alertTypeClass = {
          [AlertType.Success]: 'alert-success',
          [AlertType.Error]: 'alert-danger',
          [AlertType.Info]: 'alert-info',
          [AlertType.Warning]: 'alert-warning'
      }

      classes.push(alertTypeClass[alert.type]);

      if (alert.fade) {
          classes.push('fade');
      }

      return classes.join(' ');
  }

}
