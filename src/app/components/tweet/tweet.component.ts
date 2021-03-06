import { Component, OnInit, Input } from '@angular/core';
import { Tweet } from 'src/app/model/tweet';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  @Input() tweet:Tweet
  
  constructor(private datePipe: DatePipe) { 
  }

  ngOnInit() {
  }

}
