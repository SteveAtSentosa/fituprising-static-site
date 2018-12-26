import { flatten, pipe } from 'ramda';
import { isArray } from 'ramda-adjunct'

export const arrayify = me => isArray(me) ? me : [ me ];
export const flatArrayify = pipe(arrayify, flatten);
