import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function momentFrom(params) {
  const time = window.moment(...params);
  const formatted = time.format('LL');
  return htmlSafe(
    `<span class="text-primary"> ${formatted} </span>`
  );
}

export default helper(momentFrom);
