import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {FeedbackProps} from "../../../components/common-components/feedback/feedback.component";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor() { }

  findFeedBacks(): Observable<FeedbackProps[]> {
    return new Observable<FeedbackProps[]>(subscriber => {
      subscriber.next([
        {
          _id: "",
          comment: "Un service exceptionnel! Le talent de l'équipe est indéniable. Chaque visite est une expérience de beauté inoubliable.",
          image: "https://res.cloudinary.com/dje2mveih/image/upload/v1708839376/assets/customer-img2_iya8ul.jpg",
          stars: 5,
          userName: "Fanja R."
        },
        {
          _id: "",
          comment: "Des soins de qualité! J'apprécie vraiment l'attention portée aux détails lors de mes séances. Les résultats sont excellents.",
          image: "https://res.cloudinary.com/dje2mveih/image/upload/v1708839376/assets/customer-img1_i0mn64.jpg",
          stars: 4,
          userName: "Rakoto T."
        },
        {
          _id: "",
          comment: "Mains expertes et ambiance chaleureuse! À chaque visite, je suis impressionnée par la compétence de l'équipe.",
          image: "https://res.cloudinary.com/dje2mveih/image/upload/v1708839376/assets/customer-img_xz9fz6.jpg",
          stars: 4.5,
          userName: "Mialy H."
        }
      ]);
    })
  }
}
