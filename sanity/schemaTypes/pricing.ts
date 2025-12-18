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

    defineField({
      name: 'slug',
      title: 'Page Link (Slug)',
      type: 'slug',
      description: 'This defines the secret link. e.g. "weddings" becomes .../investment/weddings',
      options: { source: 'title' },
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'heroVideo',
      title: 'Hero Background Video',
      type: 'file',
      options: { accept: 'video/*' },
      description: 'Upload the background video here (mp4). If empty, it will use the default.'
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

    // FAQ SECTION WITH CATEGORIES
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      description: 'Add common questions and answers for this specific investment guide.',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'category', 
              title: 'Category', 
              type: 'string',
              options: {
                list: [
                  { title: 'Experience & Philosophy', value: 'Experience & Philosophy' },
                  { title: 'Travel & Logistics', value: 'Travel & Logistics' },
                  { title: 'Creative & Delivery', value: 'Creative & Delivery' },
                  { title: 'Booking & Investment', value: 'Booking & Investment' },
                ],
              },
              validation: Rule => Rule.required()
            },
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text' }
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'category'
            }
          }
        }
      ]
    }),
  ]
})