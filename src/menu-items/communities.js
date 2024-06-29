// assets
import { IconAffiliate } from '@tabler/icons';
// constant
const icons = {
  IconAffiliate
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const communities = {
  id: 'communties-page',
  title: 'Communities',
  type: 'group',
  children: [
    {
      id: 'communities',
      title: 'Communities',
      type: 'collapse',
      icon: icons.IconAffiliate,
      children: [
        {
          id: 'communities',
          title: 'Dashboard',
          type: 'item',
          url: '/communities/',
          breadcrumbs: false
        },
        {
          id: 'my-communities',
          title: 'My Communities',
          type: 'item',
          url: '/communities/my-communities',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default communities;
