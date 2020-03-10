import { watchGetStatus } from './getStatus';
import { watchWsOpen } from './wsOpen';

export default [
  watchGetStatus(),
  watchWsOpen(),
];