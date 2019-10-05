import { Component, OnInit } from '@angular/core';
import {TweetsService} from '../../services/tweets.service';
import { NgForm } from '@angular/forms';
import { Tweet } from 'src/app/model/tweet';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.css']
})
export class CreateTweetComponent implements OnInit {

  constructor(public tweetService:TweetsService, public userService:UserService) { }

  onSubmit(TweetForm: NgForm){
    console.log(TweetForm.value)
    this.tweetService.insertTweet(TweetForm.value);
    this.resetForm(TweetForm);

  }

  resetForm(TweetForm: NgForm){
    if(TweetForm != null){
      this.tweetService.selectedTweet = new Tweet();
    }
  }

  ngOnInit() {
    this.tweetService.getTweets();
  }

}
