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

    // --- ADD THIS NEW FIELD ---
    defineField({
      name: 'slug',
      title: 'Page Link (Slug)',
      type: 'slug',
      description: 'This defines the secret link. e.g. "weddings" becomes .../investment/weddings',
      options: { source: 'title' },
      validation: Rule => Rule.required()
    }),
    // --------------------------
    
    // --- NEW VIDEO FIELD ---
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
  ]
})