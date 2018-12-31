import { curry } from 'ramda'
import { isObject, isString, isFunction } from 'ramda-adjunct'
import { flatArrayify } from '../utils/general'

const isDefinedStyle = toCheck => isString(toCheck) && toCheck.charAt(0) === '$'

export const css = (style, condition) => flatArrayify(style || []).reduce((acc, styleEntry) =>
  isDefinedStyle(styleEntry) ?
    { ...acc, css: [ ...acc.css, s[styleEntry.substr(1)] ] } :
  isString(styleEntry) ?
    { ...acc, className: `${acc.className} ${styleEntry}` } :
  isObject(styleEntry) ?
    { ...acc, css: [ ...acc.css, styleEntry ] } :

  // TODO: not working
  isFunction(styleEntry) && condition ?
    { ...acc, css: [ ...acc.css, styleEntry ] } :
  acc, { css: [], className: '' }
)

export const makeStyles = stylesObject =>
  (style, condition = false) => css(stylesObject[style])



// composed styles
export const s = {
  'no-underline': tw`no-underline shadow-none`,
  'border': tw`border-solid border-grey-300 border rounded`,
  'h-borders': tw`border-solid border-grey border-b border-t border-l-0 border-r-0`,
  'section-title': tw`mb-8 text-2xl leading-tight font-semibold text-black`,
  'info-box-container': tw`bg-grey-200 rounded-lg px-4 py-4`,
  'info-box-list-entry': tw`font-mont text-fu-purple md:text-sm`,
  'info-box-paragraph': tw`pb-3 font-mont text-fu-purple md:text-sm`,
}
