export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'customImage',
          title: 'Product Image',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'External Image URL',
              description: 'Enter a direct URL link to the image (e.g. Unsplash link).',
            },
            {
              name: 'asset',
              type: 'image',
              title: 'Upload Image File',
              description: 'Or upload an image file from your system.',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'alt',
              type: 'string',
              title: 'SEO Alt Text',
              description: 'Describe the image contents for search engines (SEO) and screen readers.',
              validation: (Rule) => Rule.required().error('SEO Alt text is required for image optimization.'),
            },
          ],
        }
      ],
      validation: (Rule) => Rule.min(1).error('At least one image is required.'),
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
    },
    {
      name: 'price',
      title: 'Price (in INR)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'affiliateLink',
      title: 'Affiliate Link',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'features',
      title: 'Key Features List',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'pros',
      title: 'Pros List',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'cons',
      title: 'Cons List',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isTrending',
      title: 'Is Trending Product',
      type: 'boolean',
    },
    {
      name: 'isNewArrival',
      title: 'Is New Arrival Product',
      type: 'boolean',
    },
    {
      name: 'isApproved',
      title: 'Approve & Publish',
      description: 'Only approved products will be published and visible on the website.',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'reviewScreenshots',
      title: 'Verified Reviews list',
      description: 'Add written customer review comments.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'reviewComment',
          title: 'Written Review Comment',
          fields: [
            { name: 'reviewer', type: 'string', title: 'Reviewer Name', validation: (Rule) => Rule.required() },
            { name: 'rating', type: 'number', title: 'Rating Stars (1-5)', validation: (Rule) => Rule.required().min(1).max(5) },
            { name: 'date', type: 'string', title: 'Review Date (e.g. July 2, 2026)', validation: (Rule) => Rule.required() },
            { name: 'comment', type: 'text', title: 'Comment Content', validation: (Rule) => Rule.required() },
            { name: 'verified', type: 'boolean', title: 'Verified Purchase', initialValue: true },
          ],
          preview: {
            select: {
              reviewer: 'reviewer',
              comment: 'comment',
            },
            prepare(selection) {
              const { reviewer, comment } = selection;
              return {
                title: reviewer ? `Review by: ${reviewer}` : 'Written Review',
                subtitle: comment ? comment.slice(0, 70) + '...' : '',
              };
            },
          },
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Meta Title' },
        { name: 'description', type: 'text', title: 'Meta Description' },
      ],
    },
  ],
};
