import {Component, Input, OnInit} from '@angular/core';
import {SpinnerConf} from "../../core/interfaces/spinner-conf";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor() {
  }

  public spinnerConf: SpinnerConf = {
    color: 'primary',
    diameter: 50,
    mode: 'indeterminate',
    value: 20
  }

  @Input() set conf(config: SpinnerConf) {
    if (config) {
      this.spinnerConf = config
    }
  }

  ngOnInit(): void {
  }

}
