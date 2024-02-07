import {INavData} from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: "Management",
    url: "/management",
    iconComponent: { name: 'cil-user' },
    children: [
      {
        name: "Liste des employés",
        url: "/management/employee"
      },
      {
        name: "Ajout de service",
        url: "/management/service/ajout"
      }
    ]
  }
];
