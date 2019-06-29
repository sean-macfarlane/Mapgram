const baseColors = {
  primary: '#6BB6D6',
  primaryHighlight: '#05ABF2',
  success: '#0497D6',
  warning: '#F08521',
  danger: '#D11D1D',
  font: 'rgba(255, 255, 255, .7)',
  lightGray: '#b7b7b7',
  black: '#000',
  white: '#fff',
};

const theme = new (function theme() {
  this.GlobalHeader = {
    background: '#fff',
    borderBottom: '1px solid rgba(0, 0, 0, .135)',
    height: '64px',
    MenuIcon: {
      hover: 'rgba(0, 0, 0, 0.85)',
    },
  };

  this.Link = {
    hoverColor: baseColors.primary,
    props: {
      active: {
        color: baseColors.primaryHighlight,
      },
    },
  };
})();

export default theme;
