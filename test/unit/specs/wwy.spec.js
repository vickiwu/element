import { createTest, destroyVM } from '../util';
import Wwy from 'packages/wwy';

describe('Wwy', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Wwy, true);
    expect(vm.$el).to.exist;
  });
});

