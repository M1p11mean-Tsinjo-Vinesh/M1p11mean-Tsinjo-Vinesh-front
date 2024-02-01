import {INavData} from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: "CRM",
    url: "/crm",
    iconComponent: { name: 'cil-user' },
    children: [
      {
        name: "Gestion des utilisateurs",
        url: "/crm/users"
      }
    ]
  }
];
