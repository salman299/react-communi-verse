// assets
import { IconCalendarEvent } from '@tabler/icons';

// constant
const icons = {
  IconCalendarEvent
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const events = {
  id: 'events',
  title: 'Events',
  type: 'group',
  children: [
    {
      id: 'events',
      title: 'Events',
      type: 'collapse',
      icon: icons.IconCalendarEvent,
      children: [
        {
          id: 'events',
          title: 'Dashboard',
          type: 'item',
          url: '/events/',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default events;
