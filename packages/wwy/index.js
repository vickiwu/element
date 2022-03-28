import Wwy from './src/main';

/* istanbul ignore next */
Wwy.install = function(Vue) {
  Vue.component(Wwy.name, Wwy);
};

export default Wwy;
