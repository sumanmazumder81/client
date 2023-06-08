import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  public desibledRouter:boolean = false;
  public accesRouter : any;
  constructor(
    private router :Router,
    private activeRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.accesRouter = this.activeRouter.snapshot.paramMap.get('clientId');
    console.log(this.accesRouter);
  }

}
