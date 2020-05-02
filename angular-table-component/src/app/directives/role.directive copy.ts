import { AuthService, Role } from '../services/auth-service.ts.service';
import { Directive, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

import { Subscription } from 'rxjs';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnInit, OnDestroy {
  @Input() appRole: Role;
  @Output() roleDetected = new EventEmitter();
  private subs: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private view: ViewContainerRef,
    private template: TemplateRef<any>
  ) { }

  ngOnInit(): void {
    console.log('ciao sono la direttiva');

    this.subs.push(
      this.authService.isLogged$.pipe(
        filter(x => !!x),
        switchMap(() => this.authService.role$),
        distinctUntilChanged(),
        tap(() => this.roleDetected.emit(true))
      )
        .subscribe(role => role === this.appRole ? this.view.createEmbeddedView(this.template)
        : this.view.clear()));
  }
  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
    console.log('sono la direttiva e mi distruggo');
  }


}
