import { Component, OnInit, Input, SecurityContext, AfterViewInit, AfterViewChecked } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-text-container',
  templateUrl: './text-container.component.html',
  styleUrls: ['./text-container.component.scss']
})
export class TextContainerComponent implements OnInit, AfterViewChecked {
  @Input() rawHtmlUrl: string;
  safeHtml: string;
  rendered: boolean = false;
  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient){ }

  ngOnInit() {
    this.http.get(this.rawHtmlUrl, {responseType:"text"}).toPromise().then((object)=>{
      this.safeHtml = this.sanitizer.sanitize(SecurityContext.HTML, object);
    });
  }

  ngAfterViewChecked(): void {
    if (this.safeHtml && !this.rendered) {
      // @ts-ignore
        window.MathJax.typeset();
        this.rendered = true;
    }
  }
}
