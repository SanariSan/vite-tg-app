import { myProfileService } from 'src/services/api/users/profile';
import { createRequestAtom } from 'src/store/create-atom';

export const [myProfileAtom, getMyProfileAtom] = createRequestAtom({
  service: myProfileService,
});
