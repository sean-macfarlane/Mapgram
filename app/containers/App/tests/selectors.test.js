import { fromJS } from 'immutable';

import { makeSelectLocation } from 'containers/App/selectors';

describe('makeSelectLocation', () => {
  it('should select the location', () => {
    const router = {
      location: { pathname: '/foo' },
    };
    const mockedState = fromJS({
      router,
    });
    expect(makeSelectLocation()(mockedState)).toEqual(router.location);
  });
});
