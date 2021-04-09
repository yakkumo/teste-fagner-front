import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSelectChange } from '@angular/material/select';
import { MatRadioChange } from '@angular/material/radio';
import * as fromRoot from '../../reducers/index';
import * as layout from '../layout/shared/layout.action';
import { componentDestroyed } from '../utils/component-destroyed';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  cardElevationClass: string | undefined;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store
      .select(fromRoot.getCardElevation)
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((elevation) => {
        this.cardElevationClass = elevation;
      });
  }

  setLayout(radioEvent: MatRadioChange) {
    this.store.dispatch(new layout.SelectLayoutAction(radioEvent.value));
  }

  setCardElevation(selectEvent: MatSelectChange) {
    this.store.dispatch(new layout.SetCardElevationAction(selectEvent.value));
  }

  ngOnDestroy() {}
}
