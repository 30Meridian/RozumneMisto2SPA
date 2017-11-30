import React from 'react';

import { Select } from '../../form-components';
import Input from '../../form-components/input';

import form from '../../common-components/form.scss';


const PackageElement = (props) => (
  <div className={form.multiFields}>
    <Select label="Пакет" value={props.item.get('package')} items={props.packages} valueKey="name"
      onChange={(value) => props.onPackageChange(value, props.id)} />
    <Select label="Стан" value={props.item.get('state')} blankOption={true} items={props.states} valueKey="label"
      onChange={(value) => props.onStateChange(value, props.id)} />
    <Select label="Перехід" value={props.item.get('transition')} blankOption={true} items={props.transitions}
      onChange={(value) => props.onTransitionChange(value, props.id)} />
    <Input label="Налаштування" value={props.item.get('config')}
      onChange={(event) => props.onConfigChange(event.target.value, props.id)} />
    <hr />
  </div>
);

export default PackageElement;
