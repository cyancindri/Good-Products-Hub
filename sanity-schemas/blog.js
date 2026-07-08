export default {
  name: 'blog',
  title: 'Blog / Buying Guide',
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
      name: 'coverImage',
      title: 'Cover Image',
      type: 'object',
      fields: [
        {
          name: 'url',
          type: 'url',
          title: 'External Image URL',
          description: 'Enter a direct URL link to the cover image.',
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content Body (Markdown Format - Fallback)',
      description: 'Optional fallback. Only used if Blog Content Blocks below is empty.',
      type: 'text',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Publish Date (e.g. July 2, 2026)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'readTime',
      title: 'Reading Time (e.g. 5 min read)',
      type: 'string',
    },
    {
      name: 'relatedProducts',
      title: 'Related Products (Search & Select suggestions list)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    },
    {
      name: 'contentBlocks',
      title: 'Blog Content Blocks (Structured Article Builder)',
      description: 'Add and arrange paragraphs, section headings, and product card mentions in order.',
      type: 'array',
      of: [
        {
          name: 'textBlock',
          title: 'Text Paragraph',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Text Content',
              type: 'text',
              description: 'Supports markdown syntax for bold text (**bold**) and list items.',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'text',
            },
            prepare(selection) {
              const { title } = selection;
              return {
                title: 'Text Paragraph',
                subtitle: title ? title.slice(0, 70) + '...' : '',
              };
            },
          },
        },
        {
          name: 'headingBlock',
          title: 'Section Heading (for Table of Contents)',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Heading Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'level',
              title: 'Heading Level',
              type: 'string',
              options: {
                list: [
                  { title: 'Main Section Heading (H2)', value: 'h2' },
                  { title: 'Subsection Heading (H3)', value: 'h3' },
                ],
              },
              initialValue: 'h2',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'text',
              level: 'level',
            },
            prepare(selection) {
              const { title, level } = selection;
              return {
                title: `${level ? level.toUpperCase() : 'H2'}: ${title}`,
                subtitle: 'Section heading automatically linked in Table of Contents',
              };
            },
          },
        },
        {
          name: 'productMentionBlock',
          title: 'Featured Product Mention Card',
          type: 'object',
          fields: [
            {
              name: 'product',
              title: 'Select Product for Card layout',
              type: 'reference',
              to: [{ type: 'product' }],
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              productName: 'product.title',
            },
            prepare(selection) {
              const { productName } = selection;
              return {
                title: productName ? `Product Mention: ${productName}` : 'Product Mention',
                subtitle: 'Will automatically render product title, summary, and action card',
              };
            },
          },
        },
      ],
    },
    {
      name: 'faqs',
      title: 'Frequently Asked Questions (FAQs)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            { name: 'question', type: 'string', title: 'Question' },
            { name: 'answer', type: 'text', title: 'Answer' },
          ]
        }
      ]
    },
    {
      name: 'isApproved',
      title: 'Approve & Publish',
      description: 'Only approved blogs will be published and visible on the website.',
      type: 'boolean',
      initialValue: false,
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
