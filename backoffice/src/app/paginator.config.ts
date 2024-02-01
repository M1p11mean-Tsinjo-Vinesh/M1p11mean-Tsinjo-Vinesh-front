import {MatPaginatorIntl} from "@angular/material/paginator";

export function paginatorConfig () {
  const config = new MatPaginatorIntl();
  config.itemsPerPageLabel= "Elements par page";
  config.nextPageLabel= "Page suivante";
  config.previousPageLabel= "Page précedente";
  config.firstPageLabel= "Première page";
  config.lastPageLabel= "Dérnière page";
  return config;
}
