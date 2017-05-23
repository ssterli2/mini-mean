import React from 'react';
import Validation from 'react-validation';

Object.assign(Validation.rules, {

    required: {
        rule: value => value.toString().trim(),
        hint: () => <span className="form-error is-visible">Required</span>
    },

    minlength_name: {
      rule: value => value.length > 1,
      hint: () => <span className="form-error is-visible">Names must be at least 2 characters</span>
    },

    email: {
        rule: value => /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/.test(value),
        hint: value => <span className="form-error is-visible">{value} is not an Email.</span>
    },

    alpha: {
        rule: value => /^[a-zA-Z]+$/.test(value),
        hint: () => <span className="form-error is-visible">Names should contain only letters (a-zA-Z)</span>
    },

    password: {
      rule: value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(value) && value.length > 7 && value.length < 33,
      hint: () => <span className="form-error is-visible">Password failed validation, you must have at least 1 number, uppercase and special character.</span>
    },

    passwords_equal: {
        rule: (value, components) => {
            const password = components.password.state;
            const confirm_pass = components.confirm_pass.state;
            const isBothUsed = password
                && confirm_pass
                && password.isUsed
                && confirm_pass.isUsed;
            const isBothChanged = isBothUsed && password.isChanged && confirm_pass.isChanged;

            if (!isBothUsed || !isBothChanged) {
                return true;
            }

            return password.value === confirm_pass.value;
        },
        hint: () => <span className="form-error is-visible">Passwords should be equal.</span>
    }
});
