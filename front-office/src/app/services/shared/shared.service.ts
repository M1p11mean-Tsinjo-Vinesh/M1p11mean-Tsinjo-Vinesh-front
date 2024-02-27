import { Injectable } from '@angular/core';
import {ServicesService} from "../services/services.service";
import {Store} from "@ngrx/store";
import AppStore from "../../store/Appstore";
import {setServices} from "../../store/services/services.action";
import {TeamMemberService} from "../team-member/team-member.service";
import {setTeamMembers} from "../../store/team-member/team-member.action";
import {startApiCall} from "../sweet-alert.util";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private servicesService: ServicesService,
    private memberService: TeamMemberService,
    private store: Store<AppStore>
  ) { }

  load() {
    startApiCall(async close => {
      let [services, members] = await Promise.all([
        await firstValueFrom(this.servicesService.findServices()),
        await firstValueFrom(this.memberService.findTeamMembers())
      ])

      this.store.dispatch(setServices({list: services}));
      const images = [
        "https://res.cloudinary.com/dje2mveih/image/upload/v1708810354/assets/gallery-7_urlwlc.jpg",
        "https://res.cloudinary.com/dje2mveih/image/upload/v1708810354/assets/image-gallery-02_nsmzdx.jpg",
        "https://res.cloudinary.com/dje2mveih/image/upload/v1708810354/assets/image-gallery-03_kxlerz.jpg",
        "https://res.cloudinary.com/dje2mveih/image/upload/v1708810354/assets/image-gallery-01_wkbcky.jpg",
        "https://res.cloudinary.com/dje2mveih/image/upload/v1709019951/members/36814346-stylist-cutting-hair-of-a-female-client-at-the-beauty-salon_ti0f9b.jpg",
        "https://res.cloudinary.com/dje2mveih/image/upload/v1709019951/members/how-to-hire-salon-employees-613689122_r9skzh.jpg",
        "https://res.cloudinary.com/dje2mveih/image/upload/v1709019951/members/616945911d0f26224121284d_Zoyya-featured-images---managing-salon-staff_t2fqub.jpg",
        "https://res.cloudinary.com/dje2mveih/image/upload/v1709019952/members/adam-winger-fI-TKWjKYls-unsplash_lyvpud.jpg",
        "https://res.cloudinary.com/dje2mveih/image/upload/v1709019951/members/hair-and-beauty-industry-award-summary_employment-innovations_web-feature_wz2pd9.jpg",
        "https://res.cloudinary.com/dje2mveih/image/upload/v1709019952/members/iStock-1221840954-filter-scaled_bg9ojy.jpg",
        "https://res.cloudinary.com/dje2mveih/image/upload/v1709019952/members/timely-rent-a-chair-hero-1400x800_uio9ew.jpg",
      ]

      members = members.sort((e1, e2) => e1._id.localeCompare(e2._id)).map((elt, index) => {
        elt.image = images[index % images.length]
        return elt;
      })

      this.store.dispatch(setTeamMembers({list: members}));
      close();
    });
  }

}
