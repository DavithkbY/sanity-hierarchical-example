import {defineType} from '@sanity/types'
import {defineField} from 'sanity'
import {isUniqueOtherThanLanguage} from '../lib/utils'
import {DocumentIcon} from '@sanity/icons'
export const page = defineType({
  name: 'page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      // should match 'languageField' plugin configuration setting, if customized
      name: 'language',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        isUnique: isUniqueOtherThanLanguage,
        source: 'title'
      },
    }),
  ]
}) 