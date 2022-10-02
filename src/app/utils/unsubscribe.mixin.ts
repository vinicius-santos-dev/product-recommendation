import {Directive, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";

@Directive()
export class UnsubscribeMixin implements OnDestroy {
  protected readonly unsubscribe$ = new Subject<void>();

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
