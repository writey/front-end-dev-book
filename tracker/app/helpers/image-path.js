import { helper } from '@ember/component/helper';

export function imagePath(params/*, hash*/) {

  if(params)  {
    return params;
  }
  return '/assets/images/cryptids/blank_th.png';
}

export default helper(imagePath);
