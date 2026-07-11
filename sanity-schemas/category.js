import React from 'react';
import * as Icons from 'lucide-react';
import { LucideIconSelector } from './LucideIconSelector';

export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Used to sort categories on the website (lower numbers show first)',
      initialValue: 0,
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'icon',
      title: 'Category Icon Name',
      type: 'string',
      components: {
        input: LucideIconSelector,
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      iconName: 'icon',
    },
    prepare(selection) {
      const { title, subtitle, iconName } = selection;
      // Dynamically resolve lucide-react icon component for listing preview
      const LucideIcon = Icons[iconName] || Icons.BookOpen;
      return {
        title: title,
        subtitle: subtitle,
        media: () => React.createElement(LucideIcon, { style: { width: '1.2em', height: '1.2em', color: '#4E6B35' } }),
      };
    },
  },
};
