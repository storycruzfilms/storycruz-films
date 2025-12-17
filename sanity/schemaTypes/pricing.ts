import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pricing',
  title: 'Hidden Pricing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Investment Guide 2025'
    }),
    // VIDEO PACKAGES
    defineField({
      name: 'videoPackages',
      title: 'Video Packages',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string', title: 'Package Name' },
          { name: 'price', type: 'string', title: 'Price' },
          { name: 'description', type: 'text', title: 'Short Description' },
          { name: 'features', type: 'array', title: 'Features List', of: [{ type: 'string' }] }
        ]
      }]
    }),
    // PHOTO PACKAGES
    defineField({
      name: 'photoPackages',
      title: 'Photography Packages',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string', title: 'Package Name' },
          { name: 'price', type: 'string', title: 'Price' },
          { name: 'description', type: 'text', title: 'Short Description' },
          { name: 'features', type: 'array', title: 'Features List', of: [{ type: 'string' }] }
        ]
      }]
    }),
  ]
})