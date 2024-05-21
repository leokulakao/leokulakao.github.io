import { DOCUMENT, JsonPipe } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import { Howl } from 'howler';

export enum Colors {
  RED = 'red',
  GREEN = 'green',
  YELLOW = 'yellow',
  BLUE = 'blue'
}

export interface ColorData {
  cssClass: string;
  soundRight: string;
  soundCenter: string;
  soundLeft: string;
}

const COLORS_DATA: ColorData[] = [
  {
    cssClass: 'red',
    soundRight: './assets/sounds/new/_C5.mp3',
    soundCenter: './assets/sounds/new/_F4.mp3',
    soundLeft: './assets/sounds/new/_B3.mp3',
  },
  {
    cssClass: 'green',
    soundRight: './assets/sounds/new/_D5.mp3',
    soundCenter: './assets/sounds/new/_A4.mp3',
    soundLeft: './assets/sounds/new/_C4.mp3',
  },
  {
    cssClass: 'blue',
    soundRight: './assets/sounds/new/_E5.mp3',
    soundCenter: './assets/sounds/new/_G4.mp3',
    soundLeft: './assets/sounds/new/_D4.mp3',
  },
  {
    cssClass: 'yellow',
    soundRight: './assets/sounds/new/_B4.mp3',
    soundCenter: './assets/sounds/new/_E4.mp3',
    soundLeft: './assets/sounds/new/_A3.mp3',
  }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HammerModule, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  @ViewChild('buttonRight', { static: true, read: ElementRef}) readonly buttonRight!: ElementRef;
  @ViewChild('buttonCenter', { static: true, read: ElementRef}) readonly buttonCenter!: ElementRef;
  @ViewChild('buttonLeft', { static: true, read: ElementRef}) readonly buttonLeft!: ElementRef;

  private readonly colorData = this.getRandomColor(4);

  private readonly soundLeft = new Howl({
    src: [this.colorData.soundLeft],
    html5: true,
    preload: true,
  });
  private readonly soundCenter = new Howl({
    src: [this.colorData.soundCenter],
    html5: true,
    preload: true,
  });
  private readonly soundRight = new Howl({
    src: [this.colorData.soundRight],
    html5: true,
    preload: true,
  });

  title = 'cd-orchestra';

  isFullScreen: boolean = false;

  constructor(@Inject(DOCUMENT) private readonly document: Document){}

  ngOnInit(): void {
    const buttonRightHtmlElement = this.buttonRight.nativeElement as HTMLElement;
    const buttonCenterHtmlElement = this.buttonCenter.nativeElement as HTMLElement;
    const buttonLeftHtmlElement = this.buttonLeft.nativeElement as HTMLElement;

    buttonRightHtmlElement.classList.add(this.colorData.cssClass);
    buttonCenterHtmlElement.classList.add(this.colorData.cssClass);
    buttonLeftHtmlElement.classList.add(this.colorData.cssClass);
  }

  toggleFullScreen() {
    if (!this.isFullScreen) {
      this.document.documentElement.requestFullscreen();
    } else {
      this.document.exitFullscreen()
    }
  }

  onTouch(event: TouchEvent) {
    event.preventDefault();

    const buttonRightHtmlElement = this.buttonRight.nativeElement as HTMLElement;
      const buttonCenterHtmlElement = this.buttonCenter.nativeElement as HTMLElement;
      const buttonLeftHtmlElement = this.buttonLeft.nativeElement as HTMLElement;

    for (let i = 0; i < event.touches.length; i++) {
      const touchHtmlElement = event.touches[i].target as HTMLElement;

      if (touchHtmlElement.classList == buttonRightHtmlElement.classList) {
        console.log('right ok!');
        this.soundRight.stop();
        this.soundRight.play();
      }

      if (touchHtmlElement.classList == buttonCenterHtmlElement.classList) {
        console.log('center ok!');
        this.soundCenter.stop();
        this.soundCenter.play();
      }

      if (touchHtmlElement.classList == buttonLeftHtmlElement.classList) {
        console.log('left ok!');
        this.soundLeft.stop();
        this.soundLeft.play();
      }
    }
  }

  private getRandomColor(max: number) {
    const randomNumber = Math.floor(Math.random() * max);
    return COLORS_DATA[randomNumber];
  }
}
