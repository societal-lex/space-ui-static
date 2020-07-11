import { Component, Input } from '@angular/core'
import { TreeCatalogService } from '../tree-catalog/tree-catalog.service'
import { TFetchStatus, ConfigurationsService } from '@ws-widget/utils'
import { FormControl } from '@angular/forms'
import { ISearchAutoComplete, ISearchQuery } from '../../../../../../project/ws/app/src/lib/routes/search/models/search.model'
import { SearchServService } from '../../../../../../project/ws/app/src/lib/routes/search/services/search-serv.service'
import { NSSearch } from '../_services/widget-search.model'
import { NsWidgetResolver, WidgetBaseComponent } from '@ws-widget/resolver'

@Component({
  selector: 'ws-widget-btn-catalog',
  templateUrl: './btn-catalog.component.html',
  styleUrls: ['./btn-catalog.component.scss'],
})
export class BtnCatalogComponent extends WidgetBaseComponent
  implements NsWidgetResolver.IWidgetData<any> {

  @Input() widgetData!: any
  catalogItems: NSSearch.IFilterUnitContent[] | null = null
  catalogFetchStatus: TFetchStatus = 'none'
  query: FormControl = new FormControl('')
  searchQuery: ISearchQuery = {
    l: this.getActivateLocale(),
    q: '',
  }
  autoCompleteResults: ISearchAutoComplete[] = []

  constructor(private catalogSvc: TreeCatalogService,
              private searchSvc: SearchServService,
              private configSvc: ConfigurationsService) {
    super()
  }

  getActivateLocale(): string {
    const locale = (this.configSvc.activeLocale && this.configSvc.activeLocale.locals[0]) || 'en'
    return this.searchSvc.getLanguageSearchIndex(locale)
  }

  getAutoCompleteResults(): void {
    this.searchSvc.searchAutoComplete(this.searchQuery).then((results: ISearchAutoComplete[]) => {
      this.autoCompleteResults = results
    }).catch(() => {

    })
  }

  getCatalog() {
    this.catalogFetchStatus = 'fetching'
    this.catalogSvc.getFullCatalog().subscribe(
      (catalog: NSSearch.IFilterUnitContent[]) => {
        this.catalogFetchStatus = 'done'
        if (catalog.length === 1 && catalog[0].children) {
          this.catalogItems = catalog[0].children
        } else {
          this.catalogItems = catalog
        }
      },
      () => this.catalogFetchStatus = 'error',
    )
  }

}
