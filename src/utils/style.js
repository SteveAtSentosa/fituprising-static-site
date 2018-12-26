import { css } from '@emotion/core';
import { isObject, isString } from 'ramda-adjunct';
import { arrayify, flatArrayify } from '../utils/general';

// returns styling fxn based in style name
export const makeStyles = stylesObject => style =>
  flatArrayify(stylesObject[style]).reduce((acc, styleEntry) =>
    isString(styleEntry) ?
      { ...acc, className: `${acc.className} ${styleEntry}` } :
    isObject(styleEntry) ?
      { ...acc, css: [ ...acc.css, styleEntry ]} :
    acc, { css: [], className: '' }
  )

// composed styles
export const s = {
  'no-underline': tw`no-underline shadow-none`
}
