import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, inject, Input, OnDestroy, Output } from '@angular/core';
import { filter, fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy {

  private elementRef = inject(ElementRef);
  private document: Document = inject(DOCUMENT);

  private clickSubscription: Subscription | undefined;

  @Input() elementId: string | undefined = undefined;
  @Output() clickOutsideEvent = new EventEmitter<HTMLElement>();

  ngAfterViewInit(): void {
    this.clickSubscription = fromEvent(this.document, 'click').pipe(
      filter(event => {
        return !this.isClickInside(event.target as HTMLElement) && !this.isClickInsideElementWithId(event.target as HTMLElement)
      })
    ).subscribe(() => {
      console.log('click outside')
      this.clickOutsideEvent.emit();
    });
  }

  /**
   * This method determines if the click was inside a given element.
   */
  isClickInside(el: HTMLElement): boolean {
    return (
      el === this.elementRef.nativeElement ||
      this.elementRef.nativeElement.contains(el)
    );
  }

    /**
   * This method determines if the click was inside an addiitonal given element with a certain ID.
   */
  isClickInsideElementWithId(el: HTMLElement): boolean {
    console.log(el);
    if (this.elementId === undefined) {
      return false;
    } else {
      return el.id === this.elementId;
    }
  }

  ngOnDestroy(): void {
    this.clickSubscription?.unsubscribe();
  }
}
