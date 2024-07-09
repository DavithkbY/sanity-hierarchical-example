import {InitialValueTemplateItemBuilder, ListItemBuilder, StructureResolver} from 'sanity/structure'
import {createDeskHierarchy} from '@sanity/hierarchical-document-list'
import {LinkIcon} from '@sanity/icons'
import { MdOutlineRoute } from "react-icons/md";
import { IoDocumentsSharp } from "react-icons/io5";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";
import {locales, type Locale, localeFlagIcons} from '../locales'
import { FaFlag } from "react-icons/fa";
import {InitialValueTemplateItem} from 'sanity'

const findFlagIcon = (localeId: string)=>{
  const flag = localeFlagIcons.find(flag => flag.id === localeId)?.flag;
  return flag ? flag : FaFlag;
}


export const structure:StructureResolver = async (S, context) =>{

  const allPagesItems: ListItemBuilder[] = [];
  const pageRoutingItems: ListItemBuilder[] = [];
  const navigationItems: ListItemBuilder[] = [];
  const externalLinkItems: ListItemBuilder[] = [];
  
  const pageCreateValues: InitialValueTemplateItemBuilder[] = locales.map(locale=> S.initialValueTemplateItem(`page-${locale.id}` ));
  
  locales.forEach((locale: Locale)=> {

    allPagesItems.push(
      S.listItem()
        .title(`${locale.title} (${locale.id.toUpperCase()})`)
        .icon(findFlagIcon(locale.id))
        .child(
          S.documentTypeList('page')
            .title(`${locale.title} Pages`)
            .filter(`_type == "page" && language == "${locale.id}"`)
            .canHandleIntent(intentName => intentName === 'create')
            .initialValueTemplates(pageCreateValues)
        )
    )
    
    pageRoutingItems.push(
      createDeskHierarchy(
        {
          S,
          context,
          title: `${locale.title} (${locale.id.toUpperCase()})`,
          icon: findFlagIcon(locale.id),

          // The hierarchy will be stored in this document ID 👇
          documentId: `pages-list-${locale.id}`,
          
          // Document types editors should be able to include in the hierarchy
          referenceTo: ['page'],

          // ❓ Optional: provide filters and/or parameters for narrowing which documents can be added
          referenceOptions: {
            filter: `language == "${locale.id}"`,
          }
        }
      ),
    )
    
    navigationItems.push(
      createDeskHierarchy(
        {
          S,
          context,
          title: `${locale.title} (${locale.id.toUpperCase()})`,
          icon: findFlagIcon(locale.id),

          // The hierarchy will be stored in this document ID 👇
          documentId: `main-navigation-${locale.id}`,

          // Document types editors should be able to include in the hierarchy
          referenceTo: ['page', 'externalLink'],

          // ❓ Optional: provide filters and/or parameters for narrowing which documents can be added
          referenceOptions: {
            filter: `language == "${locale.id}"`,
          }
        }
      )
    )
    
    externalLinkItems.push(
      S.listItem()
        .title(`${locale.title} (${locale.id.toUpperCase()})`)
        .icon(findFlagIcon(locale.id))
        .child(
          S.documentTypeList('externalLink')
            .filter(`_type == "externalLink" && language == "${locale.id}"`)
        ),
    )
    
  });
  

  return S.list()
    .title('Content')
    .items([
      S.divider(),
      S.listItem()
        .title('All Pages')
        .icon(IoDocumentsSharp)
        .child(
          S.list()
            .title('All Pages')
            .items(allPagesItems)
        ),
      S.divider(),
      S.listItem().title('Page Routing')
        .icon(MdOutlineRoute)
        .child(
        S.list()
          .title('Page Routing')
          .items(pageRoutingItems)
      ),
      S.divider(),
      S.listItem().title('Navigation').icon(TiThMenu).child(
        S.list()
          .title('Navigation')
          .items(navigationItems)
      ),
      S.divider(),
      S.listItem()
        .title('Miscellaneous')
        .icon(FaScrewdriverWrench)
        .child(
          S.list().title("Miscellaneous").items([
            S.listItem().title('External Links').icon(LinkIcon).child(
              S.list().title('Languages').items(externalLinkItems)
            )
          ])
        ),
      S.divider(),
    ])
}
