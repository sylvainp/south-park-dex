export type Theme = {
  id: number;
  primary: string;
  second: string;
  background: string;
  title: string;
  headerBackground: string;
  headerTitle: string;
};

//https://www.schemecolor.com/eric-cartman-south-park-cartoon-colors.php
export const cartman: Theme = {
  id: 1,
  primary: '#EE3253',
  second: '#844D38',
  background: '#FFEEC3',
  title: '#FFE11D',
  headerBackground: '#00B8C4',
  headerTitle: '#FFE11D',
};

//https://www.schemecolor.com/stan-marsh-south-park-cartoon-colors.php
export const stan: Theme = {
  id: 2,
  primary: '#A65E58',
  second: '#4D7DBD',
  background: '#F2CEAE',
  title: '#0D0D0D',
  headerBackground: '#566AA6',
  headerTitle: '#D92353',
};

//https://www.schemecolor.com/kyle-broflovski-south-park-cartoon-colors.php
export const kyle: Theme = {
  id: 3,
  primary: '#F24F13',
  second: '#1F8C2F',
  background: '#F2CEAE',
  title: '#1F8C2F',
  headerBackground: '#65BF24',
  headerTitle: '#1F8C2F',
};

//www.schemecolor.com/kenny-mccormick-south-park-cartoon-colors.php
export const kenny: Theme = {
  id: 4,
  primary: '#F26F03',
  second: '#733E32',
  background: '#F2CEAE',

  title: '#733E32',
  headerBackground: '#F24F13',
  headerTitle: '#8C2703',
};
