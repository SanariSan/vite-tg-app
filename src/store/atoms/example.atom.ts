import { exampleSendFieldService } from 'src/services/api/example.service';
import { createRequestAtom } from '../create-atom';

export const [exampleAtom, actionExampleAtom] = createRequestAtom({
  service: exampleSendFieldService,
});
