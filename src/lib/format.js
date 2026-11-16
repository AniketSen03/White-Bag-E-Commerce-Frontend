export const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');

export const CATEGORIES = [
  { id: 'men', label: 'Men', image: '/assets/img/men/8.webp' },
  { id: 'women', label: 'Women', image: '/assets/img/women/5.webp' },
  { id: 'kids', label: 'Kids', image: '/assets/img/kid/2.webp' },
  { id: 'electronics', label: 'Electronics', image: '/assets/img/electronics/12.webp' },
  { id: 'furniture', label: 'Furniture', image: '/assets/img/furniture/3.webp' },
];

export const CLOTHING = ['men', 'women', 'kids'];

export const COLOR_HEX = {
  red: '#D13F3F', blue: '#2F42CC', green: '#2E8B57', black: '#101828', white: '#FFFFFF', yellow: '#F5C518',
  pink: '#F28BB0', brown: '#8B5A3C', grey: '#98A2B3', cream: '#F1E7D0', orange: '#E8742B',
};

export const TYPES = {
  men: ['shirt', 'kurta'],
  women: ['ethnic', 'kurti', 'jeans', 'top'],
  kids: ['set', 'shirt'],
  electronics: ['phone', 'laptop', 'camera', 'tv', 'appliance'],
  furniture: ['sofa'],
};

export const titleCase = (s) => s.charAt(0).toUpperCase() + s.slice(1);
export const dateFmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
