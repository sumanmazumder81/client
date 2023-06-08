import { Component } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  isConnected = true;
  noInternetConnection: boolean = false;
  public connectionShow :boolean = false;

  constructor(private connectionService: ConnectionService) {
    this.connectionService.monitor().subscribe((isConnected: boolean) => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.noInternetConnection = false;
        this.connectionShow = true;
        setTimeout(() => {
          this.connectionShow = false;
        }, 5000);
      }
      else {
        this.noInternetConnection = true;
        this.connectionShow = true;
      }
    })

  }

}
