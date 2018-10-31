import { bindable, customElement, inject, DOM, bindingMode } from 'aurelia-framework';
import { MDCTextField } from '@material/textfield/dist/mdc.textfield.min';
import { MDCNotchedOutline } from '@material/notched-outline/dist/mdc.notchedOutline.min';

@customElement('mdc-text-field')
@inject(Element)
export class MdcTextField {
	@bindable label;
	@bindable({defaultBindingMode:bindingMode.twoWay}) value;
	@bindable disabled = false;
	@bindable required = false;
	@bindable type = 'text';
	@bindable secondarylabel = null;
	@bindable modifier = null;
	@bindable step;
	@bindable min;
	@bindable max;

    constructor ( element) 
    {
		this.element = element;
		this.unique = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	}
	
	bind() {
		if(this.myMdcTextfield) {
			this.step ? this.stepChanged(this.step) : '';
			this.min ? this.minChanged(this.min) : '';
			this.max ? this.maxChanged(this.max) : '';

			this.myMdcTextfield.disabled = this.disabled;
			this.myMdcTextfield.required = this.required;
		}
	}

	attached() {
		this.myMdcTextfield = new MDCTextField(this.element.firstElementChild);
	}

	disabledChanged(newvalue) {
		this.myMdcTextfield.disabled = newvalue;
	}

	requiredChanged(newvalue) {
		this.myMdcTextfield.required = newvalue;
	}

	stepChanged(newvalue) {
		this.myMdcTextfield.input_.setAttribute("step", newvalue);
	}

	minChanged(newvalue) {
		if(this.type === 'number') {
			this.myMdcTextfield.input_.setAttribute("min", newvalue);
		} else {
			this.myMdcTextfield.input_.setAttribute("minlength", newvalue);
		}
	}

	maxChanged(newvalue) {
		if(this.type === 'number') {
			this.myMdcTextfield.input_.setAttribute("max", newvalue);
		} else {
			this.myMdcTextfield.input_.setAttribute("maxlength", newvalue);
		}
	}

    detached() 
    {
        this.myMdcTextfield.destroy();
    }
}
