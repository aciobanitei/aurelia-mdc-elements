﻿import { bindable, customElement, inject, DOM, bindingMode } from 'aurelia-framework';
import { MDCSelect } from '@material/select/dist/mdc.select.min';

@customElement('mdc-select')
@inject(Element)
export class MdcSelect {
	@bindable label;
	@bindable data;
	@bindable value;
	@bindable key;
	@bindable({ defaultBindingMode: bindingMode.twoWay }) selected;
	@bindable disabled;
	@bindable required;
	@bindable selectLabel;
	@bindable secondarylabel;
	@bindable modifier = null;
	@bindable leading;

	constructor(element) {
		this.element = element;
	}

	bind() {
		if(this.myMdcSelect) {
			this.refreshOptions();
		}
	}

	attached() {
		this.myMdcSelect = new MDCSelect(this.element);

		this.myMdcSelect.listen('change', () => {
			this.selected = this.myMdcSelect.value;

			//Set invalid class after first change
			if(!this.myMdcSelect.value && this.required) {
				this.requiredChanged(true);
			} else {
				this.requiredChanged(false);
			}
		});

		this.refreshOptions();
	}

	refreshOptions() {
		this.myMdcSelect.disabled = this.disabled;
		this.myMdcSelect.value = this.value;
	}

	unbind() {
		this.myMdcSelect.destroy();
	}

	disabledChanged(newvalue) {
		this.myMdcSelect.disabled = newvalue;
	}

	requiredChanged(newvalue) {
		if(newvalue) {
			this.element.classList.add('mdc-select--invalid');
		}
		else {
			this.element.classList.remove('mdc-select--invalid');
		}
	}
}
