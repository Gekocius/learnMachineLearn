import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-text-container',
  templateUrl: './text-container.component.html',
  styleUrls: ['./text-container.component.scss']
})
export class TextContainerComponent implements OnInit {
  @Input() rawHtmlUrl: string;
  safeHtml: string;
  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient){ }

  ngOnInit() {
    this.http.get(this.rawHtmlUrl, {responseType:"text"}).toPromise().then((object)=>{
      this.safeHtml = this.sanitizer.sanitize(SecurityContext.HTML, object);
    });
  }
}
